// prerelease a canary version.
import { createInterface } from "readline";
import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import semver from "semver";

const packages = (await readdir("./packages")).filter(e => e.startsWith("fastboard"));
const mainPkg = JSON.parse(await readFile(join("./packages", "fastboard/package.json"), "utf8"));

const version = mainPkg.version;
const preid = "canary";

const rl = createInterface({ input: process.stdin, output: process.stdout });
function prompt(msg: string) {
  return new Promise<string>(resolve => rl.question(msg, resolve));
}

process.on("SIGINT", () => {
  rl.close();
  process.exit(0);
});

console.log("Current version: " + version + "\nSelect next version:");
console.log(`   0. input manually`);
const choices = ["major", "minor", "patch", "premajor", "preminor", "prepatch", "prerelease"] as const;
choices.forEach((type, i) => {
  console.log(`   ${i + 1}. ${semver.inc(version, type, preid)}`);
});

const index = parseInt(await prompt("> "));
let nextVersion = version;
if (index === 0) {
  nextVersion = await prompt("Input next version\n> ");
} else if (1 <= index && index <= choices.length) {
  nextVersion = semver.inc(version, choices[index - 1], preid);
} else {
  console.log("Invalid input");
  process.exit(1);
}

if (!semver.valid(nextVersion)) {
  console.log("Invalid version");
  process.exit(1);
}

rl.close();

for (const folder of packages) {
  const file = join("./packages", folder, "package.json");
  const pkg = JSON.parse(await readFile(file, "utf8"));
  pkg.version = nextVersion;
  await writeFile(file, JSON.stringify(pkg, null, 2));
  console.log("Updated " + folder);
}
