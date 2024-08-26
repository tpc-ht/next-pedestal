# 依赖安装后执行 husky 初始化
echo "初始化husky"
npx husky install
npx husky set .husky/pre-commit 'npx --no-install lint-staged'
npx husky set .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
echo "husky初始化完成"

