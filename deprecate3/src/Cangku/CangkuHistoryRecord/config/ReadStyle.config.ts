/**
 * ReadStyle.config.ts
 * created by 2023/8/27
 * @file
 * @author  Yiero
 * */

import { globalConfigStorage } from './global.config'
import { PrefSelectorList } from '../../../PageBeautiful/CssStyleClass/interfaces/PrefSelectorList.ts'

export {
	readStyle
}

const readStyle: PrefSelectorList = {
	readBtnSign: {
		// 设置动画
		'.is-read': {
			transition: 'opacity .25s ease-in-out',
			opacity: globalConfigStorage.opacity.get() as string | number,
		},
		'.is-read:hover': {
			opacity: 1,
		},
		
		// 设置父元素相对
		'.is-read, .is-not-read': {
			position: 'relative'
		},
		
		// 设置按钮
		'.is-read::before': {
			content: '"已看"',
			'background-color': 'hsla(0, 0%, 60%, .77)',
			'font-size': '13px',
			padding: '3px 8px',
			color: '#fff',
			'font-weight': 700,
			'border-radius': '4px',
			'z-index': 1,
			display: globalConfigStorage.displayBtn.get() ? 'block' : 'none',
		},
		'.is-not-read::before': {
			content: '"未看"',
			'background-color': 'rgba(3, 169, 244, .77)',
			'font-size': '13px',
			padding: '3px 8px',
			color: '#fff',
			'font-weight': 700,
			'border-radius': '4px',
			'z-index': 1,
			display: globalConfigStorage.displayBtn.get() ? 'block' : 'none',
		},
		
		// 设置按钮方向
		[
			`.post-list .is-read::before, .post-list .is-not-read::before,
			.category-post .is-read::before, .category-post .is-not-read::before,
			.rank-post .is-read::before, .rank-post .is-not-read::before `
			]: {
			position: 'absolute',
			top: '5px',
			left: 'calc(15px + 5px)',
		},
		'.related-post .is-read::before, .related-post .is-not-read::before': {
			position: 'absolute',
			top: '5px',
			left: 'calc(6px + 5px)',
		},
		'.card-body .is-read::before, .card-body .is-not-read::before': {
			position: 'absolute',
			top: '5px',
			right: '5px',
		},
	}
}
