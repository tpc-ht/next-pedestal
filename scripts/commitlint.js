#!/usr/bin/env node
import yParser from 'yargs-parser';
import chalk from 'chalk';
import fs from 'fs';
const { bgRed, red, green, cyan } = chalk;
// 截取命令行参数
const args = yParser(process.argv.slice(2));
const option = args._[0];
const judeCommitResult = () => {
  // 提取commit信息
  const msgPath = process.env.GIT_PARAMS || process.env.HUSKY_GIT_PARAMS;
  const msg = fs.readFileSync(msgPath, 'utf-8').trim();
  const commitRE =
    /^(((\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]) )?(revert: )?(feat|fix|docs|UI|refactor|⚡perf|workflow|build|CI|typos|chore|tests|types|wip|release|dep|locale)(\(.+\))?: .{1,50}/;
  if (!commitRE.test(msg)) {
    throw `  ${bgRed.white(' ERROR ')} ${red(`提交日志不符合规范`)}\n\n${red(`  合法的提交日志格式如下(emoji 和 模块可选填)：\n`)}
  ${green(`💥 feat(模块): 添加了个很棒的功能`)}
  ${green(`🐛 fix(模块): 修复了一些 bug`)}
  ${green(`📝 docs(模块): 更新了一下文档`)}
  ${green(`🌷 UI(模块): 修改/优化了一下样式`)}
  ${green(`🔨 refactor(模块): 代码重构`)}
  ${green(`🏰 chore(模块): 对脚手架做了些更改`)}`;
  }
};

switch (option) {
  case 'verify-commit':
    judeCommitResult();
    break;
}
