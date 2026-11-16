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
  assert.ok(!html.includes("\u2014"), `${route}: em dashes are not allowed`);
  assert.ok(
    !html.includes("orbital-hero.webp") &&
      !html.includes("/media/photography/"),
    `${route}: retired generated imagery must not render`,
  );
}
assert.deepEqual(
  failures,
  [],
  "Internal links, anchors, and assets must resolve",
);
const photos = JSON.parse(
  fs.readFileSync("src/data/future-media.json", "utf8"),
);
for (const photo of Object.values(photos)) {
  assert.ok(
    fs.existsSync(path.join(root, photo.src)),
    `Photo exists: ${photo.src}`,
  );
  assert.ok(
    fs.existsSync(path.join(root, photo.src.replace(".webp", "-small.webp"))),
    `Mobile photo exists: ${photo.src}`,
  );
  assert.ok(
    photo.author && photo.source && photo.license,
    "Each photograph has attribution",
  );
}
assert.ok(fs.existsSync(path.join(root, "media/social.jpg")));
for (const asset of [
  "earth-orbit.mp4",
  "earth-poster.jpg",
  "earth.jpg",
  "mercury.jpg",
  "venus.jpg",
  "jupiter.jpg",
  "saturn.jpg",
  "uranus.jpg",
  "neptune.jpg",
  "mars.jpg",
  "sun.jpg",
  "clouds.jpg",
  "CREDITS.md",
]) {
  assert.ok(
    fs.existsSync(path.join(root, "media/motion", asset)),
    `Motion asset exists: ${asset}`,
  );
}
assert.ok(
  fs.statSync(path.join(root, "media/motion/earth-orbit.mp4")).size <
    6 * 1024 * 1024,
  "Hero video stays within its download budget",
);
for (const logo of ["icon.svg", "tera-symbol.svg", "tera-industries-logo.svg"])
  assert.ok(fs.existsSync(path.join(root, logo)), `Logo exists: ${logo}`);
for (const name of ["binary.mp4", "binary-poster.jpg"])
  assert.ok(
    fs.statSync(path.join(root, "media/cosmos", name)).size > 0,
    `Cosmic motion asset: ${name}`,
  );
console.log(
  `PASS: ${pages.length} routes; ${links} internal links; ${assets} asset references; headings, metadata, canonicals, and disclosures.`,
);
