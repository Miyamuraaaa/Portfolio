import { copyFile, lstat, mkdir, readdir, readFile, realpath, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

export const categories = ["featured-work", "reading-process", "reader-responses", "icare", "reflections"];
const supported = new Map([[".pdf", "pdf"], [".png", "image"], [".jpg", "image"], [".jpeg", "image"], [".webp", "image"]]);
const compare = (a, b) => a.localeCompare(b, "en", { numeric: true, sensitivity: "base" }) || (a < b ? -1 : a > b ? 1 : 0);
const hidden = (name) => name.startsWith(".") || name.startsWith("~") || ["thumbs.db", "desktop.ini", "__macosx"].includes(name.toLowerCase());
export function titleFrom(name) {
  const words = name.replace(/\.(pdf|png|jpe?g|webp)$/i, "").replace(/[-_]+/g, " ").trim().split(/\s+/);
  const smallWords = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "in", "of", "on", "or", "the", "to", "with"]);
  return words.map((word, index) => {
    const lower = word.toLowerCase();
    if (index > 0 && index < words.length - 1 && smallWords.has(lower)) return lower;
    return lower.replace(/^\p{L}/u, (letter) => letter.toUpperCase());
  }).join(" ");
}
const slugFrom = (name) => name.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "work";

async function statIfExists(target) {
  try { return await lstat(target); } catch (error) { if (error.code === "ENOENT") return null; throw error; }
}

// Reject symlinks/junctions in managed paths before any write or cleanup.
async function assertManagedPath(root, target) {
  const relative = path.relative(root, target);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) throw new Error(`Unsafe generated path: ${target}`);
  let current = root;
  for (const part of relative.split(path.sep)) {
    current = path.join(current, part);
    const stat = await statIfExists(current);
    if (stat?.isSymbolicLink()) throw new Error(`Refusing symbolic link or junction: ${current}`);
  }
}

async function readMetadata(directory, entries, warn) {
  const info = entries.find((entry) => entry.isFile() && entry.name.toLowerCase() === "info.json");
  if (!info) return {};
  const filename = path.join(directory, info.name);
  let raw;
  try {
    raw = JSON.parse((await readFile(filename, "utf8")).replace(/^\uFEFF/, ""));
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("expected a JSON object");
  } catch (error) {
    warn(`${filename}: ${error.message}; using file/folder metadata instead.`);
    return {};
  }
  const metadata = {};
  for (const key of ["title", "subtitle", "description", "date", "reflection"]) {
    if (typeof raw[key] === "string" && raw[key].trim()) metadata[key] = raw[key].trim();
  }
  if (typeof raw.order === "number" && Number.isFinite(raw.order)) metadata.order = raw.order;
  if (typeof raw.score === "string" || (typeof raw.score === "number" && Number.isFinite(raw.score))) metadata.score = raw.score;
  if (typeof raw.featured === "boolean") metadata.featured = raw.featured;
  if (raw.url) {
    try {
      const url = new URL(raw.url);
      if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error("use an HTTP(S) URL without credentials");
      metadata.url = url.href;
    } catch { warn(`${filename}: ignored invalid external URL.`); }
  }
  return metadata;
}

export async function generateContent({ projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."), warn = console.warn } = {}) {
  const root = await realpath(projectRoot);
  const source = path.join(root, "portfolio-content");
  const output = path.join(root, "public", "generated-content");
  const manifestPath = path.join(root, "src", "generated", "content-manifest.json");
  await assertManagedPath(root, source);
  await assertManagedPath(root, output);
  await assertManagedPath(root, manifestPath);
  const items = [];
  const copies = [];

  async function addItem(category, directory, sourceFiles, metadata, looseFile) {
    const relativeDir = path.relative(path.join(source, category), directory).split(path.sep).filter(Boolean);
    const identity = [...relativeDir, ...(looseFile ? [looseFile] : [])].join("/");
    const name = looseFile ? path.parse(looseFile).name : relativeDir.at(-1);
    const baseSlug = [...relativeDir.map(slugFrom), ...(looseFile ? [slugFrom(path.parse(looseFile).name)] : [])].join("/");
    const hash = createHash("sha256").update(`${category}/${identity}`).digest("hex").slice(0, 10);
    // Preserve simple folder slugs; disambiguate filenames and normalized names deterministically.
    const slug = !looseFile && baseSlug === identity ? baseSlug : `${baseSlug}-${hash}`;
    const files = sourceFiles.sort((a, b) => compare(a.name, b.name)).map((entry) => {
      const segments = [category, ...relativeDir, entry.name];
      copies.push({ source: path.join(directory, entry.name), destination: path.join(output, ...segments) });
      return { name: entry.name, type: supported.get(path.extname(entry.name).toLowerCase()), url: "/generated-content/" + segments.map(encodeURIComponent).join("/") };
    });
    if (!files.length && !metadata.url) return;
    items.push({ id: `${category}-${slug.replaceAll("/", "-")}-${hash}`, category, slug, title: titleFrom(name || category), ...metadata, url: metadata.url ?? null, files });
  }

  async function scan(category, directory, atCategoryRoot = false) {
    const entries = (await readdir(directory, { withFileTypes: true })).filter((entry) => !hidden(entry.name) && !entry.isSymbolicLink()).sort((a, b) => compare(a.name, b.name));
    const files = entries.filter((entry) => entry.isFile() && supported.has(path.extname(entry.name).toLowerCase()));
    if (atCategoryRoot) {
      // Loose category files are independent works; activity folders group their direct files.
      for (const file of files) await addItem(category, directory, [file], {}, file.name);
    } else {
      await addItem(category, directory, files, await readMetadata(directory, entries, warn));
    }
    for (const entry of entries.filter((entry) => entry.isDirectory())) await scan(category, path.join(directory, entry.name));
  }

  for (const category of categories) {
    const directory = path.join(source, category);
    const stat = await statIfExists(directory);
    if (stat?.isDirectory() && !stat.isSymbolicLink()) await scan(category, directory, true);
  }
  items.sort((a, b) => (a.order ?? Number.MAX_VALUE) - (b.order ?? Number.MAX_VALUE) || compare(a.title, b.title) || compare(a.id, b.id));

  // Absolute output was checked above; this is the only directory recursively removed.
  if (output !== path.resolve(root, "public/generated-content")) throw new Error("Unexpected output directory");
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  for (const copy of copies) {
    await mkdir(path.dirname(copy.destination), { recursive: true });
    await copyFile(copy.source, copy.destination);
  }
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, JSON.stringify(items, null, 2) + "\n", "utf8");
  return items;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateContent().then((items) => console.log(`Generated ${items.length} portfolio work(s).`)).catch((error) => { console.error(error); process.exitCode = 1; });
}
