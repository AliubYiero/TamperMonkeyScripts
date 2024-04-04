## 时序图

### 页面加载

> ```mermaid
> sequenceDiagram
> 
> actor 用户
> 	用户 ->> 主页:进入页面
> 	主页 ->> 服务器: 请求视频列表资源
> 	服务器 -->> 主页: 返回视频列表资源数据
> 	主页 ->> 主页: 将数据渲染到页面上
> 	Note over 主页:  每一条视频数据渲染为一个视频卡片
> 	
> 	alt 用户操作
> 		用户 ->> 主页: 点击视频卡片
> 		主页 ->> 视频页面: 跳转到对应视频界面
> 	else
> 		用户 ->> 主页: 滚动页面
> 		
> 		loop 滚动条即将到底
> 			主页 ->> 服务器: 请求视频列表资源
> 			服务器 -->> 主页: 返回视频列表资源数据
> 			主页 ->> 主页: 将数据渲染到页面上
> 			Note over 主页: 添加DOM节点, 不删除/替换之前的节点
> 		end
> 	end
> ```

### 脚本逻辑

> ```mermaid
> sequenceDiagram
> box 初始化
> participant 用户
> participant 主页
> end
> box 脚本工作
> participant 脚本
> participant 本地存储
> end
> actor 用户
> 	%% 初始化
> 	用户 ->> 主页: 进入页面 
> 	主页 ->> 主页: 视频卡片渲染
> 	note over 主页: 省略B站主页向B站服务器请求的时序(见上文 时序图-页面加载 )
> 
> 	%% 脚本开始工作
>  loop 每次加载视频容器 (包括初始化加载和滚动加载)
>      %% 读取信息
>      脚本 ->> 主页: 读取已经载入的视频信息
>      主页 -->> 脚本: 返回读取到的视频信息
>      note over 主页,脚本: currentVideoNodeList
>      par 屏蔽视频
>          %% 读取数据库
>          脚本 ->> 本地存储: 读取已观看的列表
>          Note over 脚本, 本地存储: BandVideoSet
>          本地存储 -->> 脚本: 返回 BandVideoSet
> 
> 			%% 屏蔽视频
>          脚本 ->> 主页: 遍历 currentVideoNodeList , 屏蔽存在于 BandVideoSet 中的元素
>          主页 ->> 主页: 显示屏蔽后的主页
>      and 数据库存储
>          %% 储存数据库
>          脚本 ->> 本地存储: 存储读取到的视频信息 (bv号) 
>          Note over 脚本,本地存储: 储存到 BandVideoSet: Set<hasReadInterface>
>      end
>  end
> ```
>
> 



## ER图

### 屏蔽视频列表

> ```mermaid
> flowchart TB
> 	1("BandReadInterface") --> 
> 		a(("type: string\n屏蔽类型\n('UP' | 'Title' | 'Video_ID')")) & b(("content: string\n屏蔽内容"))
> ```

### 视频信息

> ```mermaid
> flowchart TB
> 	1(VideoInfo) --> a((target: Node\n目标视频容器节点\n)) & b((bv: string\n视频BV号)) & c((title: string\n视频标题)) & d((up: string\nUP主名))
> ```
>
> 
