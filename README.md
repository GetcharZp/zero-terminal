# Zero Terminal

> zero terminal build by electron

## Electron 项目初始化

1. 确保安装了 npm 或 yarn
2. 初始化项目，`entry point` 应为 `main.js`
```shell
yarn init
```
3. 将 `Electron` 包安装到应用依赖中，如果失败了重新确定网络环境
```shell
yarn add --dev electron
```
4. 在 `package.json` 配置文件中新增如下 `scripts` 配置
```json
{
  "scripts": {
    "start": "electron ."
  }
}
```
5. 使用 `start` 命令能打开一个提示框，说明基础环境配置好了
```shell
yarn start
```
6. 针对打包功能，需要安装 `eletron-forge`
```shell
yarn add --dev @electron-forge/cli
npx electron-forge import
```

## Dev

使用 `start` 启动开发模式

```shell
yarn start
```

## Install

```shell
yarn install
```

## 打包

```shell
# 确保 Electron Forge 已安装
yarn make
```

## Show Image
