import fs from "node:fs";
import { join } from "node:path";
import { build } from "./index.mjs";

const dir = process.cwd();
const pkg = JSON.parse(fs.readFileSync(join(dir, "package.json"), "utf-8"));
pkg.dir = dir;

build(pkg);
