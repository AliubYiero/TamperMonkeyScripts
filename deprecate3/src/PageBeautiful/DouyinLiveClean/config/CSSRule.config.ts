/**
 * CSSRule.config.ts
 * created by 2023/8/28
 * @file
 * @author  Yiero
 * */

export {
	hideSelectorList,
	prefSelectorList
}

const hideSelectorList = {
	main: [
		/* 下方的相关直播推荐 */
		'.OkoVu3vW',
		/* 右下角的意见反馈 */
		'.douyin-sidebar, .G0S7YWl4',
	],
	// 侧边栏
	aside: [
		// 左边侧边导航栏
		'.N_HNXA04',
	],
	/* 顶部搜索栏 */
	header: [
		// [客户端] [快捷访问]
		// '.NRiH5zYV, .JTui1eE0',
		// 投稿的红点
		'.CPQ46DEr',
		
		// 直播栏上方的分类栏, [热门直播] / [主机游戏] 等
		'.mNaEBJlG',
	],
	/* 直播标题栏 */
	liveTitle: [
		// 左侧 [小时栏], [下载], [更多]
		'.s49a85m9 > button:nth-of-type(n + 2)',
		// 右侧 [礼物展馆]
		'.AbLfr3ao',
		// 左侧 [加入粉丝团]
		'.s49a85m9',
	],
	/* 直播栏 */
	live: [
		// 左下角的礼物卡片
		'.f64hQYrh',
	],
	/* 网页全屏 */
	fullscreenLive: [
		/* 礼物栏 */
		'.is-theater .tgMCqIjJ',
	],
	/* 直播弹幕 */
	liveDanmu: [
		// 礼物弹幕
		'.VMJPFNGB',
	],
	/* 侧边弹幕栏 */
	danmuBar: [
		// 送礼名单
		'.nex5gRxd',
		// 观众入场和点赞
		'.webcast-chatroom___bottom-message',
		// 直播勋章卡片
		'.OAJeuZUg',
		// 礼物弹幕
		'.webcast-chatroom___item:has(.JJvNvDHA)',
		// 点赞消息
		'.webcast-chatroom___item:not(:has(.webcast-chatroom___content-with-emoji-text))',
		// 系统消息, 如[入场信息] [礼物冠名信息]
		'.webcast-chatroom__room-message',
		// 弹幕入场动画
		'.webcast-chatroom___enter-active'
	]
};

const prefSelectorList = {
	live: {
		// 拉伸到直播满高度
		'#_douyin_live_scroll_container_ > div, .UKFpY5tW, .SxCiQ8ip': { height: '100%' },
		// 拉伸直播到满宽度
		'.SxCiQ8ip': { padding: 0 },
	},
	fullscreenLive: {
		// 拉伸到直播满高度
		'.is-theater > .EDvjMGPs.FKQqfehj': { height: '100%' },
	}
}
