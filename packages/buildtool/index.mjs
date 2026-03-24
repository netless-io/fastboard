import fs from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as rollup from "rollup";
import * as esbuild from "esbuild";
import * as dts from "@hyrious/dts";
import { svelte } from "@hyrious/esbuild-plugin-svelte";
import { sass } from "@netless/esbuild-plugin-inline-sass";
// import rawPlugin from "../buildtool/rawLoader.mjs";
/**
 * 输出始终为 dist/index.{js|mjs|d.ts}。
 *
 * @param {{
 *   dir: string,
 *   name: string,
 *   version: string,
 *   main: string,
 *   svelte?: string,
 *   dependencies?: Record<string, string>,
 *   peerDependencies?: Record<string, string>,
 *   optionalDependencies?: Record<string, string>
 * }}
 */
export async function build({
  dir,
  name,
  main,
  svelte: svelteOutfile,
  version,
  dependencies,
  peerDependencies,
  optionalDependencies,
}) {
  // eslint-disable-next-line no-undef
  process.chdir(dir);
  fs.rmSync("dist", { recursive: true, force: true });
  const buildtoolDir = dirname(fileURLToPath(import.meta.url));
  const protobufjsInquireBrowserShim = resolve(buildtoolDir, "shims/protobufjs-inquire-browser.js");

  const localName = name.split("/").pop() || name;
  const standaloneMode = localName.endsWith("-lite")
    ? "lite"
    : localName.endsWith("-full")
      ? "full"
      : null;
  const packageFamily = localName.replace(/-(lite|full)$/, "");
  const isCorePackage = packageFamily === "fastboard-core";
  const isUIPackage = packageFamily === "fastboard-ui";
  const shouldBuildModeDts = !standaloneMode && isUIPackage;
  const coreOptionalPlugins = [
    "@netless/appliance-plugin",
    "@netless/app-in-mainview-plugin",
  ];
  const isCoreOptionalPlugin = id =>
    coreOptionalPlugins.some(pkg => id === pkg || id.startsWith(`${pkg}/`));
  const nodeBuiltins = [
    "fs",
    "path",
    "url",
    "crypto",
    "stream",
    "util",
    "events",
    "buffer",
    "process",
    "os",
    "net",
    "tls",
    "http",
    "https",
    "dns",
    "zlib",
    "querystring",
    "readline",
    "child_process",
    "cluster",
    "dgram",
    "punycode",
    "string_decoder",
    "sys",
    "timers",
    "tty",
    "vm",
    "worker_threads",
  ];
  const runtimeModePackage = (pkg, mode) =>
    standaloneMode
      ? pkg === "fastboard-core"
        ? `@netless/${pkg}-${mode}`
        : `@netless/${pkg}`
      : `@netless/${pkg}/${mode}`;
  const typeModePackage = (pkg, mode) =>
    standaloneMode
      ? pkg === "fastboard-core"
        ? `@netless/${pkg}-${mode}`
        : `@netless/${pkg}/${mode}`
      : `@netless/${pkg}/${mode}`;
  const getRuntimeAlias = mode => {
    const alias = {};
    const coreTarget = runtimeModePackage("fastboard-core", mode);
    const uiTarget = runtimeModePackage("fastboard-ui", mode);
    if (coreTarget !== "@netless/fastboard-core") {
      alias["@netless/fastboard-core"] = coreTarget;
    }
    if (uiTarget !== "@netless/fastboard-ui") {
      alias["@netless/fastboard-ui"] = uiTarget;
    }
    return alias;
  };
  const getFullBuildAlias = mode => ({
    ...(mode ? getRuntimeAlias(mode) : {}),
    ...(isCorePackage ? { "@protobufjs/inquire": protobufjsInquireBrowserShim } : {}),
  });
  const replaceModeImports = (code, mode) =>
    code
      .replace(/@netless\/fastboard-core(?![/-])/g, typeModePackage("fastboard-core", mode))
      .replace(/@netless\/fastboard-ui(?![/-])/g, typeModePackage("fastboard-ui", mode));

  const esbuildPlugin = (external, alias = {}) => ({
    name: "esbuild",
    async load(id) {
      const { outputFiles } = await esbuild.build({
        entryPoints: [id],
        bundle: true,
        format: "esm",
        // 这里的文件名并不重要，因为
        // rollup 会合并 sourcemap 并获取原始输入文件名。
        outfile: id.replace(/\.tsx?$/, ".js"),
        sourcemap: true,
        write: false,
        target: ["es2017"],
        plugins: [svelte(), sass()],
        loader: {
          ".svg": "dataurl",
        },
        define: {
          __NAME__: JSON.stringify(name),
          __VERSION__: JSON.stringify(version),
        },
        alias,
        external: Object.keys({
          ...dependencies,
          ...peerDependencies,
          ...optionalDependencies,
          ...(external && external.reduce((acc, cur) => ((acc[cur] = true), acc), {})),
        }),
      });
      let code, map;
      for (const { path, text } of outputFiles) {
        if (path.endsWith(".map")) map = text;
        else code = text;
      }
      return { code, map };
    },
  });

  const buildBundle = async ({ input, output, alias = {}, full = false, extraExternal = [] }) => {
    const bundle = await rollup.rollup({
      input,
      plugins: [
        full ? esbuildFullPlugin(extraExternal, alias) : esbuildPlugin(extraExternal, alias),
        ...(full ? [fixIIFEPlugin()] : []),
      ],
      external: full && isCorePackage
        ? id => {
            if (isCoreOptionalPlugin(id)) {
              return true;
            }
            if (id.startsWith("node:") || (!id.includes("/") && !id.includes("\\"))) {
              return nodeBuiltins.includes(id);
            }
            return false;
          }
        : [/^[@a-z]/],
    });

    const esm = bundle.write({
      file: `dist/${output}.mjs`,
      format: "es",
      sourcemap: true,
    });

    const cjs = bundle.write({
      file: `dist/${output}.js`,
      format: "cjs",
      sourcemap: true,
      interop: "auto",
    });

    await esm;
    await cjs;
    await bundle.close();
  };

  let start = Date.now();
  if (standaloneMode === "lite") {
    await buildBundle({
      input: main,
      output: "index",
      alias: getRuntimeAlias("lite"),
    });
  } else if (standaloneMode === "full") {
    await buildBundle({
      input: main,
      output: "index",
      alias: getFullBuildAlias("full"),
      full: true,
    });
  } else {
    await buildBundle({
      input: main,
      output: "index",
    });
  }
  console.log("Built dist/index.{js|mjs} in", Date.now() - start + "ms");

  // 为 UI 包生成 dist/index.svelte.mjs，
  // 这也有助于避免在 fastboard/fastboard-react 测试中依赖 svelte。
  if (isUIPackage) {
    start = Date.now();
    const bundle = await rollup.rollup({
      input: main,
      plugins: [
        esbuildPlugin(["svelte"], standaloneMode ? getRuntimeAlias(standaloneMode) : {}),
      ],
      external: [/^[@a-z]/],
    });
    await bundle.write({
      file: svelteOutfile,
      format: "es",
      sourcemap: true,
    });
    await bundle.close();
    console.log("Built dist/index.svelte.mjs in", Date.now() - start + "ms");
  }

  start = Date.now();
  if (standaloneMode === "lite" && isCorePackage) {
    await dts.build(main, "dist/index.d.ts", {
      exclude: ["svelte", "svelte/internal", ...coreOptionalPlugins],
    });
  } else if (standaloneMode === "full" && isCorePackage) {
    await dts.build(main, "dist/index.d.ts", { exclude: ["svelte", "svelte/internal", ...coreOptionalPlugins] });
  } else {
    await dts.build(main, "dist/index.d.ts", { exclude: ["svelte", "svelte/internal", "./lite", "./full"] });
    if (standaloneMode) {
      const code = replaceModeImports(fs.readFileSync("dist/index.d.ts", "utf-8"), standaloneMode);
      fs.writeFileSync("dist/index.d.ts", code);
    }
  }
  console.log("Built dist/index.d.ts in", Date.now() - start + "ms");

  if (shouldBuildModeDts) {
    start = Date.now();
    fs.writeFileSync("dist/lite.d.ts", replaceModeImports(fs.readFileSync("dist/index.d.ts", "utf-8"), "lite"));
    console.log("Built dist/lite.d.ts in", Date.now() - start + "ms");
  }

  // 构建 dist/full.js
  function esbuildFullPlugin(external, alias = {}) {
    return {
      name: "esbuild",
      async load(id) {
        const { outputFiles } = await esbuild.build({
          entryPoints: [id],
          bundle: true,
          format: "esm",
          // 这里的文件名并不重要，因为
          // rollup 会合并 sourcemap 并获取原始输入文件名。
          outfile: id.replace(/\.tsx?$/, ".js"),
          sourcemap: true,
          write: false,
          target: ["es2017"],
          plugins: [svelte(), sass()],
          loader: {
            ".svg": "dataurl",
          },
          define: {
            __NAME__: JSON.stringify(name),
            __VERSION__: JSON.stringify(version),
          },
          alias,
          // 对于完整构建，打包除 core 可选插件之外的所有内容
          // 这适用于完整构建的 -core 和非 -core 包
          // 原始逻辑：-core 包打包所有内容，非 -core 排除 dependencies/peerDependencies
          // 但对于完整构建，我们希望所有包都打包所有内容
          external: isCorePackage
            ? Object.keys({
                ...(external && external.reduce((acc, cur) => ((acc[cur] = true), acc), {})),
              }).concat(coreOptionalPlugins)
            : Object.keys({
                ...dependencies,
                ...peerDependencies,
                ...optionalDependencies,
                ...(external && external.reduce((acc, cur) => ((acc[cur] = true), acc), {})),
              }),
        });
        let code, map;
        for (const { path, text } of outputFiles) {
          if (path.endsWith(".map")) map = text;
          else code = text;
        }
        return { code, map };
      },
    };
  }

  // 修复被 __commonJS 包装后无法正确导出的 IIFE 库的插件
  // 问题：这些 IIFE 首先检查 define.amd，如果存在，它们不会设置 module2.exports
  // 这导致 require_xxx() 在带有 AMD 加载器的浏览器环境中返回空对象
  // 解决方案：在 define.amd 分支中添加 module2.exports = value; 以确保它始终被设置
  function fixIIFEPlugin() {
    return {
      name: "fix-iife",
      renderChunk(code, chunk, options) {
      let modified = false;
      let fixCount = 0;
      const originalCode = code;

      // 通用模式 1：if (typeof define == "function" && define.amd) { define(function() { return X; }); } else if ...
      // 提取返回值并设置 module2.exports = X;
      // 支持 == 和 ===
      // 使用更有针对性的方法：匹配 define 调用并找到下一个 } else if
      // 通过更精确的匹配，此模式在大型代码块中效果更好
      const pattern1 =
        /(if\s*\(typeof\s+define\s*(?:==|===)\s*["']function["']\s*&&\s*define\.amd\)\s*\{[\s\S]*?define\s*\(function\s*\(\)\s*\{\s*return\s+([^;]+);\s*\}\s*\)\s*;[\s\S]*?)(\n\s*\}\s*else\s*if)/g;
      code = code.replace(pattern1, (match, defineBlock, returnValue, elseIf) => {
        // 如果此块中已设置 module2.exports，则跳过
        if (defineBlock.includes("module2.exports") || defineBlock.includes("freeModule.exports")) {
          return match;
        }
        modified = true;
        fixCount++;
        // 从返回值中提取变量名（处理简单标识符）
        const varName = returnValue.trim().split(/[.\s[\]()]/)[0];
        // 在右大括号之前添加 module2.exports 赋值
        return (
          defineBlock +
          `\n        if (typeof module2 != "undefined" && module2.exports) {\n          module2.exports = ${varName};\n        }` +
          elseIf
        );
      });

      // 对 decimal.js 的特殊处理：代码块非常大，因此我们需要更具体的模式
      // 匹配出现在 else if 之前的模式，考虑可能的空白字符
      if (code.includes("require_decimal") && code.includes("decimal.js")) {
        // 更具体的模式：查找 define 调用，后跟右大括号和 else if
        const decimalPattern =
          /(if\s*\(typeof\s+define\s*==\s*["']function["']\s*&&\s*define\.amd\)\s*\{[\s\S]*?define\s*\(function\s*\(\)\s*\{\s*return\s+Decimal;\s*\}\s*\)\s*;[\s\S]*?)(\n\s*\}\s*else\s*if\s*\(typeof\s+module2)/g;
        const decimalMatch = decimalPattern.exec(code);
        if (decimalMatch && !decimalMatch[1].includes("module2.exports = Decimal")) {
          code = code.replace(decimalPattern, (match, defineBlock, elseIf) => {
            modified = true;
            fixCount++;
            return (
              defineBlock +
              `\n        if (typeof module2 != "undefined" && module2.exports) {\n          module2.exports = Decimal;\n        }` +
              elseIf
            );
          });
        }
      }

      // 通用模式 2：if (typeof define === "function" && define.amd) { define([], factory2); } else if ...
      // 调用 factory2() 并设置 module2.exports = factory2();
      // 支持 == 和 ===
      const pattern2 =
        /(if\s*\(typeof\s+define\s*(?:==|===)\s*["']function["']\s*&&\s*define\.amd\)\s*\{[^}]*?define\s*\(\s*\[\]\s*,\s*([^)]+)\)\s*;\s*)(\s*\}\s*else\s*if)/g;
      code = code.replace(pattern2, (match, defineBlock, factoryName, elseIf) => {
        // 如果此块中已设置 module2.exports，则跳过
        if (defineBlock.includes("module2.exports")) {
          return match;
        }
        modified = true;
        fixCount++;
        // 提取工厂函数名
        const factory = factoryName.trim();
        // 在右大括号之前添加 module2.exports 赋值
        return (
          defineBlock +
          `\n        if (typeof module2 != "undefined" && module2.exports) {\n          module2.exports = ${factory}();\n        }` +
          elseIf
        );
      });

      // 通用模式 3：if (typeof define == "function" && typeof define.amd == "object" && define.amd) { ... define(...); } else if ...
      // 这处理 lodash 和具有更复杂 define.amd 检查的类似库
      const pattern3 =
        /(if\s*\(typeof\s+define\s*==\s*["']function["']\s*&&\s*typeof\s+define\.amd\s*==\s*["']object["']\s*&&\s*define\.amd\)\s*\{[^}]*?define\s*\(function\s*\(\)\s*\{\s*return\s+([^;]+);\s*\}\s*\)\s*;\s*)(\s*\}\s*else\s*if)/g;
      code = code.replace(pattern3, (match, defineBlock, returnValue, elseIf) => {
        // 如果此块中已设置 module2.exports，则跳过
        if (defineBlock.includes("module2.exports") || defineBlock.includes("freeModule.exports")) {
          return match;
        }
        modified = true;
        fixCount++;
        // 从返回值中提取变量名
        const varName = returnValue.trim().split(/[.\s[\]()]/)[0];
        // 在右大括号之前添加 module2.exports 赋值
        return (
          defineBlock +
          `\n        if (typeof module2 != "undefined" && module2.exports) {\n          module2.exports = ${varName};\n        }` +
          elseIf
        );
      });

      if (modified) {
        console.log(`[fixIIFEPlugin] Fixed ${fixCount} IIFE module(s) in ${chunk.fileName || "chunk"}`);
      } else if (code.includes("require_decimal") && !code.includes("module2.exports = Decimal")) {
        // 调试：检查 require_decimal 是否存在但未修复
        console.log(
          `[fixIIFEPlugin] Warning: require_decimal found but not fixed in ${chunk.fileName || "chunk"}`
        );
      }

      return { code, map: null };
      },
    };
  }
  if (shouldBuildModeDts) {
    start = Date.now();
    fs.writeFileSync("dist/full.d.ts", replaceModeImports(fs.readFileSync("dist/index.d.ts", "utf-8"), "full"));
    console.log("Built dist/full.d.ts in", Date.now() - start + "ms");
  }
}
