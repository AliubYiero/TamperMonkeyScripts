# Bilibili Auto Add Favorites - Bilibili自动添加收藏

## 功能描述

进入视频页面之后, 自动将当前视频收藏到 *指定收藏夹\** 中

> 指定收藏夹标题由菜单按钮 [设置收藏夹标题] 设置, 设置之后将会按照以下逻辑收藏视频: 指定收藏夹标题默认为 `fun` , 可以进行修改.
>
> 1. 判断是否存在名为 `fun1` 的收藏夹;
> 2. 如果不存在, 则创建名为 `fun1` 的收藏夹, 将视频添加到收藏夹 `fun1`
>   中;
> 3. 如果存在, 则判断 `fun1` 是否已满 (最多收藏 1000 个视频);
>    1. 如果 `fun1` 已满, 创建收藏夹 `fun2`, 将视频添加收藏到 `fun2` 中;
>       然后将 `fun1` 收藏夹排序到收藏夹的最后. 
>    2. 如果 `fun1` 未满, 将视频添加到收藏夹 `fun1` 中;
>
>


> `fun1` 是代指最新编号的指定收藏夹, 如果最新编号的指定收藏夹是 `fun10`, 那么上述中的 [`fun1` = `fun10`], [`fun2` = `fun11`], 以此类推.

## 菜单按钮

| 按钮名     | 描述                                                                                                                                                | 默认值     |
|---------|---------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| 输入您的uid | 脚本需要使用到您的uid用于**添加收藏**. <br />在**默认情况**下, 页面载入之后就能从页面中获取到您的uid. <br />如果您想要脚本拥有更快的响应的话, 可以设置本值. <br />打开按钮后无需您自行输入uid, 会自动获取页面中您的uid, 点击**确认**即可. | <您的uid> |
| 设置收藏夹标题 | 脚本会根据收藏夹标题**添加收藏**/**创建收藏夹**<br />收藏夹标题不能为空, 默认为 'fun'.                                                                                           | 'fun'   |
