# TamperMonkeyScripts Template

> 油猴构建模板, 基于 vite 搭建

## 目录结构

```plain
.
├─build - 构建工具/配置目录, 如无必要不需要更改 
│          
├─config - 配置信息目录
│     BuildConfigs.ts - 构建配置项 (提供一些打包时的特殊配置)
│     GlobalScriptsConfigs.ts - 脚本信息配置项 (脚本头部的 ==UserScript== 信息, 在打包时会自动添加到文件顶部) 
│          
├─dist - 打包构建完成的文件目录
│      Demo.dev.js - 开发环境打包的文件 ( `.dev.js` 后缀)
│      Demo.user.js - 生产环境打包的文件 ( `.user.js` 后缀)
│              
└─src - 项目文件目录
        main.ts - 项目的入口文件, 从该文件开始编写您的项目
```
