// 验证 fixIIFEPlugin 是否在生成的代码中生效

import fs from 'fs';
import path from 'path';

const fullMjsPath = path.join(process.cwd(), '../fastboard-core/dist/full.mjs');

if (!fs.existsSync(fullMjsPath)) {
  console.log('❌ full.mjs 文件不存在，请先构建包');
  console.log('   路径:', fullMjsPath);
  process.exit(1);
}

const code = fs.readFileSync(fullMjsPath, 'utf-8');

// 检查 require_decimal 是否包含修复
// 由于代码块很大，我们直接在整个文件中查找模式
// 修复后的代码应该在 define.amd 分支中，define(...) 之后有 module2.exports = Decimal;
const hasFix = /if\s*\(typeof\s+define\s*==\s*["']function["']\s*&&\s*define\.amd\)\s*\{[\s\S]*?define\s*\(function\s*\(\)\s*\{[\s\S]*?return\s+Decimal;[\s\S]*?\}\);[\s\S]*?module2\.exports\s*=\s*Decimal;[\s\S]*?\}\s*else\s*if/.test(code);

if (hasFix) {
  console.log('✅ require_decimal 包含修复');
  console.log('   在 define.amd 分支中设置了 module2.exports = Decimal;');
} else {
  console.log('❌ require_decimal 未包含修复');
  console.log('   在 define.amd 分支中未设置 module2.exports');
  
  // 显示相关代码片段
  const defineAmdMatch = requireDecimalCode.match(/if\s*\(typeof\s+define\s*==\s*["']function["']\s*&&\s*define\.amd\)\s*\{[\s\S]*?\}\s*else\s*if/);
  if (defineAmdMatch) {
    console.log('\n当前代码片段:');
    console.log(defineAmdMatch[0].substring(0, 200) + '...');
  }
}

// 检查其他模块
const checks = [
  { name: 'require_typed_function', pattern: /module2\.exports\s*=\s*factory2\(\)/ },
  { name: 'require_lodash', pattern: /module2\.exports\s*=\s*_4/ },
];

console.log('\n检查其他模块:');
for (const check of checks) {
  const hasFix = check.pattern.test(code);
  console.log(`${hasFix ? '✅' : '❌'} ${check.name}: ${hasFix ? '已修复' : '未修复'}`);
}

