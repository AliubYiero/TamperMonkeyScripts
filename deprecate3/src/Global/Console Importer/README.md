# Console Importer

通过控制台引入 JS / CSS 库.

输入 `$i( url )` 下载 js / css 库

支持所有CDN网站的下载, 脚本默认支持以下CDN网站的授权:
(下载非授权的CDN网站会弹出授权允许页面, 选择\[总是允许此域名\]即可授权对应CDN网站,
或者可以联系我添加对应网站的默认授权):

- cdnjs
- bootcdn
- jsdelivr

## 示例

下载 JQuery 库

```js
$i( 'jquery' );
```

> 注意: 请不要随便下载JQuery或者其他一些比较常用的库, 因为下载的库会污染网页全局环境,
> 可能会导致原本的网页出问题

> 默认使用 [bootcdn](https://www.bootcdn.cn/) 中的库进行下载, 安装最新版本的库
> 比如上面的 jQuery
>
就会下载 \[https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.min.js\]

---

通过链接, 下载特定版本的JQuery@2.2.4

```js
$i( 'https://cdn.bootcdn.net/ajax/libs/jquery/2.2.4/jquery.min.js' );
```

---

卸载已经安装到页面中的JQuery

```js
$ui( 'jquery' );
$ui( 'https://cdn.bootcdn.net/ajax/libs/jquery/2.2.4/jquery.min.js' );
```

---

查看最新版本的JQuery cdn链接 (不加载到页面中)

```js
$o( 'jquery' );
```

## 更新日志

**v1.2.1**

feat: 为 `$o` 添加了一个配置项, 现在第二个参数可以填入一个布尔值,
如果是 `true` 那么会输出带有 `script` 标签的字符串.

---

**v1.2.0**

feat: 支持默认库获取, 比如输入 `$i( 'jquery' )` 搜索对应库获取.

> 目前默认使用 bootcdn 且只能搜索 [bootcdn](https://www.bootcdn.cn/)
> 中的库.

---

**v1.1.2**

feat: 为输出信息添加了分组显示功能, 现在可以将输出信息折叠了

---

**v1.1.1**

feat: 添加了一个功能, `$o()` 用于向默认库中搜索对应库的链接

> 单纯搜索, 不加载到页面中

---

**v1.1.0**
feat: 添加了删除已载入页面的库的功能 `$ui()`

---

**v1.0.1**
fix: 修复了JS库 / CSS库载入判断相反的问题; 修复了下载信息提示缺失的问题.

---

**v1.0.0**
feat: 支持通过链接下载

## 更新计划

**v1.3.0**
支持默认库切换

**v1.4.0**
支持根据特定的版本号下载对应的库, 现在下载特定版本的库只能通过链接形式下载 
