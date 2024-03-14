/**
 * CSSRule.config.ts
 * created by 2023/8/27
 * @file
 * @author  Yiero
 * */

import { PrefSelectorList } from '../../CssStyleClass/interfaces/PrefSelectorList'
import { HideSelectorList } from '../../CssStyleClass/interfaces/HideSelectorList'

export {
	hideSelectorList,
	prefSelectorList
}

const hideSelectorList: {
	live: HideSelectorList,
	dynamic: HideSelectorList,
	video: HideSelectorList,
	space: HideSelectorList,
	liveNavIframe: HideSelectorList,
} = {
	/* 直播 */
	live: {
		/* 侧边直播栏 */
		danmuBar: [
			// 等级勋章
			'.wealth-medal-ctnr.fans-medal-item-target',
			
			
			'.play-together-panel',
			'.entry-web',
			'.gift-planet-entry',
			'.activity-entry',
			'.popular-and-hot-rank',
			// 小橙车
			'.shop-popover',
			
			'.gift-left-part',
			'.function-card',
			
			// 系统活动消息
			'.common-danmuku-msg',
			// 送礼弹幕消息
			'.gift-item',
			// 直播PK
			'.pk-bar-with-info',
			'.awesome-pk-vm',
			'#pk-vm',
		],
	},
	/* 动态 */
	dynamic: {
		main: [
			'.bili-dyn-version-control',
			'.reply-notice',
		],
		dynamicList: [
			// 番剧列表
			'.bili-dyn-list-tabs__list > .bili-dyn-list-tabs__item:nth-of-type(3)',
		],
		/* 评论区 */
		comment: [
			// 评论区直接@别人的傻逼
			'.comment-list > .list-item.reply-wrap:has(.text > a)'
		]
	},
	/* 视频 */
	video: {
		main: [
			'.float-nav__btn--fixed',
			// 广告
			'.reply-notice',
			
			// 笔记模式拓展, 反馈信息
			'body > div:nth-child(17) > div > div.splitpanes.splitpanes--vertical.default-theme > div.splitpanes__pane.p-3 > div > span'
		],
		video: [
			// 视频中贴牌广告
			'.bpx-player-skipcard',
		],
		/* 评论区 */
		comment: [
			// 评论区直接@别人的傻逼
			'.reply-list > .reply-item:has(.root-reply > .reply-content-container > .reply-content > .jump-link.user)'
		]
	},
	/* 个人空间 */
	space: {
		comment: [
			'.reply-notice'
		]
	},
	/* 顶部导航栏的直播下拉框 */
	liveNavIframe: {
		main: [
			/* 整个隐藏 */
			'.promotion-show-placeholder',
		]
	}
	
}

const prefSelectorList: {
	live: PrefSelectorList
	dynamic: PrefSelectorList
	video: PrefSelectorList
	space: PrefSelectorList
	liveNavIframe: PrefSelectorList
} = {
	live: {
		/* 直播标题栏 */
		liveTitle: {
			// 展开直播标题栏
			'.live-skin-normal-a-text': { overflow: 'visible' },
		}
	},
	dynamic: {
		main: {}
	},
	video: { main: {} },
	space: { main: {} },
	liveNavIframe: { main: {} },
}
