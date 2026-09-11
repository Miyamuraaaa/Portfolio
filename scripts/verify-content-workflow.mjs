import assert from "node:assert/strict";
import { mkdtemp, writeFile, readFile, unlink, rmdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateContent } from "./generate-content-manifest.mjs";

const base = process.argv[2] || "http://127.0.0.1:3000";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseline = await generateContent({ projectRoot: root });
const responseFragment = (html) => html.split('id="responses"')[1]?.split("</section>")[0];
const getPage = async () => {
  const response = await fetch(base, { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200);
  return response.text();
};
const initialHTML = await getPage();
for (const [category, id] of [["reading-process", "worksheets"], ["reader-responses", "responses"], ["icare", "icare"], ["reflections", "reflection"]]) {
  if (!baseline.some(work => work.category === category)) {
    assert.ok(initialHTML.split('id="' + id + '"')[1]?.split("</section>")[0].includes("To be collected"));
  }
}
const category = path.join(root, "portfolio-content", "reader-responses");
const fixture = await mkdtemp(path.join(category, "verification-response-"));
const created = [];
const title = "Verification Response " + path.basename(fixture);
let generatedURL;
try {
  const files = {
    "response #1.pdf": "%PDF-1.4\n% Temporary content workflow verification\n%%EOF",
    "preview.png": Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jC9sAAAAASUVORK5CYII=", "base64"),
    "info.json": JSON.stringify({ title, subtitle: "Temporary verification", description: "Verifying automatic discovery.", date: "September 2026", score: "18/20", reflection: "Verification reflection.", order: 1 })
  };
  for (const [name, value] of Object.entries(files)) {
    const filename = path.join(fixture, name);
    await writeFile(filename, value);
    created.push(filename);
  }
  const manifest = await generateContent({ projectRoot: root });
  const work = manifest.find(item => item.title === title);
  assert.ok(work);
  assert.equal(work.files.length, 2);
  const section = responseFragment(await getPage());
  const count = baseline.filter(work => work.category === "reader-responses").length + 1;
  assert.ok(section?.includes(title));
  assert.ok(section.includes(count + (count === 1 ? " work" : " works")));
  assert.ok(section.includes("18/20") && section.includes("Verification reflection."));
  assert.ok(section.includes("View Work"));
  assert.ok(section.includes('target="_blank" rel="noopener noreferrer"'));
  for (const file of work.files) {
    const asset = await fetch(base + file.url);
    assert.equal(asset.status, 200, file.url);
    assert.deepEqual(Buffer.from(await asset.arrayBuffer()), await readFile(path.join(fixture, file.name)));
    if (file.type === "image") {
      const optimized = await fetch(base + "/_next/image?url=" + encodeURIComponent(file.url) + "&w=640&q=75");
      assert.equal(optimized.status, 200, "Lazy thumbnail can be optimized by Next.js");
      assert.ok(optimized.headers.get("content-type")?.startsWith("image/"));
    }
    if (file.type === "pdf") generatedURL = file.url;
  }
  console.log("PASS: empty states, automatic populated category, dynamic count, metadata, safe links, and PDF/image URLs.");
} finally {
  // Remove only this check's uniquely created files and directory.
  const relative = path.relative(category, fixture);
  assert.ok(relative.startsWith("verification-response-") && !relative.includes(path.sep));
  for (const filename of created) await unlink(filename);
  await rmdir(fixture);
  await generateContent({ projectRoot: root });
}
const finalHTML = await getPage();
assert.ok(!finalHTML.includes(title));
assert.equal((await fetch(base + generatedURL)).status, 404);
const finalManifest = JSON.parse(await readFile(path.join(root, "src/generated/content-manifest.json"), "utf8"));
assert.deepEqual(finalManifest, baseline);
if (!baseline.some(work => work.category === "reader-responses")) assert.ok(responseFragment(finalHTML).includes("To be collected"));
const calculator = finalManifest.find(work => work.category === "featured-work" && work.slug === "engineering-calculator");
assert.ok(calculator && finalHTML.includes(calculator.title) && finalHTML.includes(calculator.url));
console.log("PASS: removal restores the original manifest and category state, stale URL returns 404, calculator remains.");
