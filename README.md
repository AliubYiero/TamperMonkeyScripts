# 显示网页的浏览时间

## 配置

打开用户配置为一个文本框, 文本框中的每一行表示一行配置, 每一行的结构如下, 每一个子项通过逗号分割: 
```html
<url>, <start_time>, <end_time>, <limit_way = 'limit'>
```

**参数**
- `url`: 需要进行匹配的网站地址, 可以为以下输入: 
  - 普通字符串: 
    - 完整网址: `'https://www.baidu.com/'`
    - 省略https前缀: `'www.baidu.com/'`
    - 使用 **普通字符串匹配** 请关注域名尾部的斜杠 `/` 是否是需要的, 脚本并不会自动添加斜杠. 即 `www.baidu.com` 是无法匹配到网址 `www.baidu.com/` 的. 
  - 正则字符串: 在开头和结尾添加上斜杠的字符串 ( `/<RegExp>/` )
    - `'/https:\/\/www\.baidu\.com\/.*/'`
- `start_time`: 进行限制的开始时间(`时:分:秒`). 支持以下形式的数字: 
  - `18`: 单独一组数字, 精确到小时, 表示 `18:00` , 即 **18 时 00 分** . 
  - `18:30`: 两组数字, 精确到分钟. 数字中间通过半角冒号 (`:`) 分隔, 表示 **18 时 30 分** .
  - `18:30:30`: 三组数字, 精确到秒. 数字中间通过半角冒号 (`:`) 分隔, 表示 **18 时 30 分 30 秒** .
- `end_time`: 进行限制的结束时间(`时:分:秒`). 规则同上 `start_time` .
- `limit_way`: *可选参数*. 表示当前网站的 **限制行为** , 可以有两个值: `open` (开放) 和 `limit` (限制) . 默认参数为 `limit` .
  - `limit`: 表示当前网站是 **有限时间限制访问** 状态. 即在 [`start_time`, `end_time`] 的时间内, 无法访问网站 `url` .
  - `open`: 表示当前网站是 **有限时间开放访问** 状态. 即只有在 [`start_time`, `end_time`] 的时间内, 才能访问网站 `url` .

## 示例
- 使用普通字符串匹配. 只有 [22:00, 24:00] 才能访问 bilibili 首页. 
- 使用正则规则字符串匹配. 无论什么时候都无法访问 csdn 的任何网页. 
```plain
https://www.bilibili.com/, 22, 24, open
/https:\/\/blog\.csdn\.net\/.*/, 0, 24, limit
```

## 代码逻辑

1. 在网站打开时, 判断是否为记录网站(正则判断)
2. 如果是, 则判断当前时间是否与限定时间相符
    1. 如果相符, 则关闭网站
    2. 如果不相符, 则可以继续浏览
