import fs from "node:fs";
import path from "node:path";
// Next 16.4's Windows export writes nested segment payloads using directories,
// while the browser requests dot-separated names. Keep the originals and add
// portable aliases so static hosts need no platform-specific rewrite rules.
const root = path.resolve("out");
let aliases = 0;
function files(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory()
        ? files(path.join(dir, e.name))
        : [path.join(dir, e.name)],
    );
}
function visit(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const nested = path.join(dir, e.name);
    if (e.name.startsWith("__next.")) {
      for (const file of files(nested)) {
        const name = `${e.name}.${path.relative(nested, file).split(path.sep).join(".")}`;
        const target = path.join(dir, name);
        if (
          fs.existsSync(target) &&
          !fs.readFileSync(target).equals(fs.readFileSync(file))
        )
          throw Error(`Conflicting RSC alias: ${name}`);
        fs.copyFileSync(file, target);
        aliases++;
      }
    } else visit(nested);
  }
}
visit(root);
console.log(`Static export ready: ${aliases} portable RSC payload aliases.`);
