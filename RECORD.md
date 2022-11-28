# Smile-Admin

## 简介

smile-admin 是一个自己学习开发的中后台管理项目。使用了最新的 `vue3`+`vite3`+`TypeScript`+`Element-Plus` 等主流技术开发，开箱即用的中后台前端解决方案，也在不断的学习和完善。

## 配置依赖：

- **初始化**：
  - **typescript**：TypeScript 是一种用于应用规模 JavaScript 开发的语言
  - **vite**：本地 esm 支持的 web 开发构建工具
  - **vue-tsc**：Vue3 命令行类型检查工具基于 IDE 插件 Volar
  - **@vitejs/plugin-vue**
- **规范**：

  - **prettier**：prettier 是一个固执的代码格式化器
  - **eslint**：

    - **eslint**：ESLint 核心库
    - **eslint-config-prettier**：关掉所有和 Prettier 冲突的 ESLint 的配置
    - **eslint-plugin-prettier**：将 Prettier 的 rules 以插件的形式加入到 ESLint 里面
    - **eslint-plugin-vue**：为 Vue 使用 ESlint 的插件
    - **@typescript-eslint/eslint-plugin**：ESLint 插件，包含了各类定义好的检测 TypeScript 代码的规范
    - **@typescript-eslint/parser**：ESLint 的解析器，用于解析 TypeScript，从而检查和规范 TypeScript 代码

  - **stylelint**：

    - **stylelint**：stylelint 核心库
    - **stylelint-config-html**：Stylelint 的可共享 HTML（和类似 HTML）配置，捆绑 postcss-html 并对其进行配置
    - **stylelint-config-prettier**：关闭所有不必要的或可能与 Prettier 冲突的规则
    - **stylelint-config-recess-order**：属性的排序（插件包）
    - **stylelint-config-recommended-scss**：扩展 stylelint-config-recommended 共享配置，并为 SCSS 配置其规则
    - **stylelint-config-recommended-vue**：扩展 stylelint-config-recommended 共享配置，并为 Vue 配置其规则
    - **stylelint-config-standard**：打开额外的规则来执行在规范和一些 CSS 样式指南中发现的通用约定，包括：惯用 CSS 原则，谷歌的 CSS 样式指南，Airbnb 的样式指南，和 @mdo 的代码指南。
    - **stylelint-config-standard-scss**：扩展 stylelint-config-standard 共享配置，并为 SCSS 配置其规则
    - **postcss**：postcss-html 的依赖包
    - **postcss-html**：用于解析 HTML（和类似 HTML）的 PostCSS 语法

  - **git 流程规范**：
    - **husky**：操作 git 钩子的工具（在 git xx 之前执行某些命令）
    - **lint-staged**：在提交之前进行 eslint 校验，并使用 prettier 格式化本地暂存区的代码
    - **@commitlint/cli**：校验 git commit 信息是否符合规范，保证团队的一致性
    - **@commitlint/config-conventional**：Anglar 的提交规范
    - **commitizen**：基于 Node.js 的 git commit 命令行工具，生成标准化的 commit message
    - **cz-git**：一款工程性更强，轻量级，高度自定义，标准输出格式的 commitize 适配器

- **配置**：
  - **@vitejs/plugin-vue-jsx**：通过 HMR 提供 Vue 3 JSX 和 TSX 支持。
  - **rollup-plugin-visualizer**：生成包预览（分析依赖包大小，方便做优化处理）
  - **vite-plugin-compression**：gzip 压缩
- **生态系统**：

  - **element-plus**：Vue3 的一个组件库
  - **vue-router**
  - **pinia**
  - **pinia-plugin-persistedstate**：Pinia 存储的可配置持久性
  - **vue-i18n**：Vue.js 的国际化插件

- **类型**：
  - **@types/node**：Node.js 的 TypeScript 定义
- **组件**：
  - **sass**
  - **@element-plus/icons-vue**：Vue 组件的元素加上图标集合
- **工具**：
  - **nprogress**：简单细长的进度条
  - **axios**：浏览器和 node.js 的基于 Promise 的 HTTP 客户端
  - **qs**：一个支持嵌套和数组的查询字符串解析器，有深度限制

## 项目计划：

1. **整体框架 framework**：22.11.02 ~
1. **登陆模块**：

## 已完成任务：

## 待优化任务：

## 待完成任务：

## 遗留 bug：

## 其他：

## Git 贡献提交规范

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中

## error 记录
