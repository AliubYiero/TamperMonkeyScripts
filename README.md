# bilibili Index Video Filter

> Bilibili 首页视频过滤器

# 功能

1. 屏蔽已经刷新过的视频, 防止重复推荐
2. 右键菜单快速屏蔽
3. <屏蔽UP主(uid)> <屏蔽标题关键字> <屏蔽视频BV号>
4. 根据up主的等级和粉丝数快速屏蔽营销号
5. 根据视频tag屏蔽


1. 获取到视频
2. 获取当前已经载入的视频的bv号
3. 比对数据库是否存在相同的bv号
    1. 如果相同则屏蔽当前视频
    2. 如果不同则将当前视频bv号添加到数据库中
4. 结束, 重新获取视频
