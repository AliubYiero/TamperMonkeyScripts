/**
 * SelectorList.config.ts
 * created by 2023/8/27
 * @file
 * @author  Yiero
 * */

export {
	hideSelectorList,
	prefSelectorList
}

/* 隐藏元素selector集合 */
const hideSelectorList = {
	main: {
		/* 主体 */
		main: [
			// 背景广告
			'.ad-ct',
			// 最下角的我的消息
			'#webChat',
			// 左侧的导航跳转条
			'#js-side-nav',
			// 右侧的永劫大厅广告
			'.index-module_container_1pK9d',
			// 滚动条
			'::-webkit-scrollbar',
		],
		/* 顶部导航栏(导航栏只留下搜索和头像) */
		headerNav: [
			// 顶部导航栏左侧的所有元素
			'.menu-location',
			// 顶部导航栏右侧的关注, 历史, 下载, 开播
			'#my-follow, #my-record, #download, #menu-be-anchor',
			// 屏蔽头像的信息提示红点
			'#guard-head-avatar-red-dot-msg, .red-dot',
		],
		/* 弹幕栏 */
		danmuBar: [
			// 弹幕栏上方的贵宾栏
			'#room-tabs',
			// 弹幕栏上方的礼物横幅
			'#gift-banner',
			'.gift-simp-banner',
			// 弹幕栏上方的直播公告
			'.room-boardcast',
			// 弹幕栏中的活动提示
			'.activity-notify',
			// 弹幕栏中的礼物
			'.gift_item',
			// 弹幕栏下面一直弹出的进入直播间提示 ( 弹幕栏中欢迎进入直播间的弹幕需开启CC自带的屏蔽 )
			'.chat-msg-folder',
			// 财富等级勋章
			'.js-nobility-log-hover',
			// 等级勋章
			'.js-msg-yjwj-vip-label',
		],
		/* 直播标题栏 */
		liveTitle: [
			// 直播标题栏的守护之心, 永劫无间, 守护, 粉钻, 朋友
			'#achievement, .live-type, .live-guard, .live-fans-badge-diamond, .anchor-friends',
			// 右侧的[举报] [手机看] [分享]
			".right-tools",
		],
		/* 直播区 */
		live: [
			// 直播下面的动态和推荐
			'#recommend-module',
			// 直播视频左下角的 永劫大厅 / 水果达人等浮窗
			'#live_left_bottom_box_wrap',
			// 直播视频右上角的CC直播水印
			'.video-watermark',
			// 直播视频弹幕中一直滚动的横幅(banner), 包括活动, 会员用户进入
			'#new-player-banner, #player-banner, #new-player-banner, #mounts_player, #mounts_banner',
		],
		gift: [
			// 屏蔽除了水果达人和弹幕风暴以外的所有活动
			'#plugins2374, #plugins9970, #plugins9670, #plugins9977, ' +
			'#plugins9412, #plugins9997, #plugins9089, #plugins6666, ' +
			'#plugins9217, #plugins2511, #plugins1609, #plugins9913, ' +
			'#plugins1016, #plugins14, #plugins5985, #plugins1353, ' +
			'#plugins1, #plugins9321 ',
			// 宽屏下的礼物栏
			'.gameH5Theater .user-tool-bar',
		]
	},
	anchor_end_countdown: {
		/* 直播区的iframe */
		live: [
			// 直播左上角的下播倒计时
			'.ui-wrap',
		]
	}
	
	
};

/* 界面优化元素集合 */
const prefSelectorList = {
	/* 主体 */
	main: {
		/* 取消顶部的留空 */
		'.room-main-container': { 'margin-top': '20px' }
	},
	/* 顶部导航栏 */
	headerNav: {
		// 优化顶部导航栏布局, 搜索栏居中
		'.user-do': {
			'margin-right': '50%',
			transform: 'translateX(50%)'
		}
	},
	/* 视频区 */
	live: {
		// 拉伸直播区至满宽度
		'.page-right-container': { width: '100%' },
		// 拉伸宽屏状态的直播区至满高度
		'#live_player': { height: '100%' },
	},
	danmuBar: {
		/* 填充侧边弹幕栏 */
		'.chat-list-short': { height: 'calc(100% - 110px)' },
		/* 填充侧边弹幕栏 */
		'#chat-list-con': { height: '100%' },
	},
};
