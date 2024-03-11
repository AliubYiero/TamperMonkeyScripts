# Style Beautify

> 样式美化脚本

> template ToFix
> 1. vite.config.ts 的终端文件地址输出错误
> 2. \build\module\parseScriptInfoOptions\parseScriptInfoOptions.ts
     的终端文件地址输出错误
> 3. vite.config.ts 的 watch 监听配置, 需要监听 config 文件夹下的配置更改
     > 似乎没办法监听? 只能监听 src 目录下的配置更新, 但是不想 config
     配置干扰项目主体代码
> 4. 配置头标题 name 需要放在第一行

> GM Menu Controller ToFix
> 1. isShow 的更新不准确, isShow = false; 之后菜单才显示在页面上
> 2. 规范化输出的 .d.ts 文件
> 3. 提供一个可以根据 title 查找 menuList 的方式
