import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const root = path.resolve("out");
function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
    );
}
const pages = walk(root).filter(
  (f) =>
    f.endsWith(".html") &&
    !f.includes(`${path.sep}_next${path.sep}`) &&
    !f.includes(`${path.sep}_not-found${path.sep}`) &&
    !f.includes(`${path.sep}404${path.sep}`) &&
    !f.endsWith(`${path.sep}404.html`),
);
assert.equal(pages.length, 36, "Expected all 36 content routes");
let links = 0,
  assets = 0;
const failures = [];
for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const route =
    "/" + path.relative(root, path.dirname(file)).split(path.sep).join("/");
  assert.ok(
    fs.readdirSync(path.dirname(file)).some((f) => f.endsWith(".__PAGE__.txt")),
    `${route}: portable navigation payload required`,
  );
  for (const [_, attr, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (
      value.startsWith("http") ||
      value.startsWith("data:") ||
      value.startsWith("mailto:") ||
      value.startsWith("tel:")
    )
      continue;
    if (value === "#") {
      failures.push(`${route}: empty link`);
      continue;
    }
    const url = new URL(value, `http://local${route}/`);
    let dest = path.join(root, decodeURIComponent(url.pathname));
    if (fs.existsSync(dest) && fs.statSync(dest).isDirectory())
      dest = path.join(dest, "index.html");
    if (!fs.existsSync(dest)) {
      failures.push(`${route}: missing ${value}`);
      continue;
    }
    if (attr === "href") links++;
    else assets++;
    if (url.hash && dest.endsWith(".html")) {
      const target = fs.readFileSync(dest, "utf8");
      const id = decodeURIComponent(url.hash.slice(1));
      if (!target.includes(`id="${id}"`))
        failures.push(`${route}: missing anchor ${value}`);
    }
  }
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    `${route}: exactly one h1`,
  );
  assert.ok(/<title>[^<]+<\/title>/.test(html), `${route}: title required`);
  assert.ok(/name="description"/.test(html), `${route}: description required`);
  assert.ok(/rel="canonical"/.test(html), `${route}: canonical required`);
  assert.ok(/fictional/i.test(html), `${route}: concept disclosure required`);
}
assert.deepEqual(
  failures,
  [],
  "Internal links, anchors, and assets must resolve",
);
assert.ok(fs.existsSync(path.join(root, "media/orbital-hero.webp")));
assert.ok(fs.existsSync(path.join(root, "media/social.jpg")));
console.log(
  `PASS: ${pages.length} routes; ${links} internal links; ${assets} asset references; headings, metadata, canonicals, and disclosures.`,
);
