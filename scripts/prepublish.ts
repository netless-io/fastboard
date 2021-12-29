import { readFileSync, writeFileSync } from "fs";

const pkgPath = "package.json";
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
delete pkg.scripts;
delete pkg.devDependencies;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
