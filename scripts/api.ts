import fs from "fs";
import cp from "child_process";
import fg from "fast-glob";

const root = "packages/fastboard-core/";
if ((await fg(root + "src/**")).some(f => mtime(f) > mtime(root + "dist/index.d.ts"))) {
  console.log("Building packages...");
  await spawn("pnpm build:ci");
}

console.log("Extracting API...");
await spawn("pnpm -F fastboard-core exec typedoc --plugin typedoc-plugin-markdown --out docs src/index.ts");

console.log("Done!");

function mtime(file: string) {
  return fs.statSync(file).mtime;
}

function spawn(command: string) {
  let ret: () => void;
  process.stdout.write("\x1b[s");
  const p = new Promise<void>(resolve => {
    ret = resolve;
  });
  const child = cp.spawn(command, { shell: true, stdio: "pipe" });
  child.stdout.setEncoding("utf8").on("data", data => {
    process.stdout.write("\x1b[u\x1b[0J");
    process.stdout.write(data);
  });
  child.on("close", code => {
    process.stdout.write("\x1b[u\x1b[0J");
    if (!code) {
      ret();
    } else {
      throw new Error(`'${command}' exited with code ${code}`);
    }
  });
  return p;
}
