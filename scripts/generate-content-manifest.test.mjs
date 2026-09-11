import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, rm, symlink, unlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { generateContent, titleFrom } from "./generate-content-manifest.mjs";

test("fallback titles preserve full words and use editorial title case", () => {
  assert.equal(titleFrom("starting-the-portfolio.pdf"), "Starting the Portfolio");
  assert.equal(titleFrom("starting_the_portfolio.PDF"), "Starting the Portfolio");
  assert.equal(titleFrom("worksheet-03"), "Worksheet 03");
});

test("content discovery, metadata, stable ordering, encoded paths, and isolated cleanup", async () => {
  const tempParent = path.resolve(tmpdir());
  const root = await mkdtemp(path.join(tempParent, "ged0001-content-test-"));
  const write = async (relative, value) => {
    const filename = path.join(root, relative);
    await mkdir(path.dirname(filename), { recursive: true });
    await writeFile(filename, value);
  };
  try {
    await write("public/keep.txt", "unrelated public asset");
    await write("portfolio-content/featured-work/calculator/info.json", JSON.stringify({ title: "Calculator", url: "https://example.com/", order: 1, featured: true }));
    await write("portfolio-content/reading-process/worksheet-03/worksheet.PDF", "%PDF-1.4");
    await write("portfolio-content/reader-responses/nested/response-02/response #1.pdf", "%PDF-1.4 response");
    await write("portfolio-content/reader-responses/nested/response-02/preview.JPG", "image");
    await write("portfolio-content/reader-responses/nested/response-02/info.json", "\uFEFF" + JSON.stringify({ title: "First response", subtitle: "A text", date: "September 2026", description: "My response.", order: 0, score: 0, reflection: "My reflection", url: "javascript:alert(1)" }));
    await write("portfolio-content/icare/activity-01/score.png", "image");
    await write("portfolio-content/icare/activity-01/info.json", "{ broken json");
    await write("portfolio-content/reflections/reflection-10.jpeg", "image");
    await write("portfolio-content/reflections/reflection-02.webp", "image");
    await write("portfolio-content/reflections/.hidden/secret.pdf", "hidden");
    await write("portfolio-content/reflections/__MACOSX/ignored.pdf", "system");
    await write("portfolio-content/reflections/notes.txt", "unsupported");
    await write("portfolio-content/reflections/empty/info.json", JSON.stringify({ title: "No files yet" }));
    await write("portfolio-content/reflections/a b/a.pdf", "%PDF");
    await write("portfolio-content/reflections/a-b/a.pdf", "%PDF");

    const warnings = [];
    const first = await generateContent({ projectRoot: root, warn: (message) => warnings.push(message) });
    assert.equal(first.length, 8);
    assert.equal(first[0].title, "First response");
    assert.equal(first[1].title, "Calculator");
    assert.equal(first[0].url, null);
    assert.equal(first[0].score, 0);
    assert.equal(first[0].reflection, "My reflection");
    assert.equal(first[0].subtitle, "A text");
    assert.equal(first[0].date, "September 2026");
    assert.equal(first[1].featured, true);
    assert.equal(first.find(work => work.category === "reading-process").title, "Worksheet 03");
    assert.equal(new Set(first.map(work => work.id)).size, first.length);
    assert.equal(new Set(first.map(work => `${work.category}/${work.slug}`)).size, first.length);
    assert.ok(first.findIndex(work => work.title === "Reflection 02") < first.findIndex(work => work.title === "Reflection 10"));
    assert.equal(warnings.length, 2);
    assert.ok(first[0].files.some(file => file.url.includes("response%20%231.pdf")));
    for (const work of first) {
      for (const file of work.files) {
        assert.ok(!file.url.includes("\\"));
        const copied = path.join(root, "public", decodeURIComponent(file.url));
        const source = path.join(root, "portfolio-content", decodeURIComponent(file.url).replace("/generated-content/", ""));
        assert.deepEqual(await readFile(copied), await readFile(source));
      }
    }
    assert.deepEqual(await generateContent({ projectRoot: root, warn: () => {} }), first);

    await unlink(path.join(root, "portfolio-content/reading-process/worksheet-03/worksheet.PDF"));
    const afterRemoval = await generateContent({ projectRoot: root, warn: () => {} });
    assert.equal(afterRemoval.length, 7);
    await assert.rejects(readFile(path.join(root, "public/generated-content/reading-process/worksheet-03/worksheet.PDF")), { code: "ENOENT" });
    assert.equal(await readFile(path.join(root, "public/keep.txt"), "utf8"), "unrelated public asset");
    const parsed = JSON.parse(await readFile(path.join(root, "src/generated/content-manifest.json"), "utf8"));
    assert.deepEqual(parsed, afterRemoval);

    // A generated-directory junction must never redirect the cleanup outside public.
    const generated = path.resolve(root, "public/generated-content");
    assert.equal(path.relative(root, generated), path.join("public", "generated-content"));
    await rm(generated, { recursive: true });
    const external = path.join(root, "untouched");
    await mkdir(external);
    await writeFile(path.join(external, "keep.txt"), "keep");
    await symlink(external, generated, process.platform === "win32" ? "junction" : "dir");
    await assert.rejects(generateContent({ projectRoot: root }), /symbolic link or junction/);
    assert.equal(await readFile(path.join(external, "keep.txt"), "utf8"), "keep");
  } finally {
    const relative = path.relative(tempParent, root);
    assert.ok(relative.startsWith("ged0001-content-test-") && !relative.includes(path.sep));
    await rm(root, { recursive: true, force: true });
  }
});
