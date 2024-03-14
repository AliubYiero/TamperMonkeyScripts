/**
 * style.config.ts
 * created by 2023/9/2
 * @file
 * @author  Yiero
 * */
import { HideSelectorList } from '../../CssStyleClass/interfaces/HideSelectorList'
import { PrefSelectorList } from '../../CssStyleClass/interfaces/PrefSelectorList'

export const styleConfig: {
	hide: {
		main: HideSelectorList,
		course: HideSelectorList,
	},
	pref: PrefSelectorList,
} = {
	hide: {
		/* 首页 */
		main: {
			main: [
				'#first142707',
				'#first142708',
				'#first142710',
				'#first142711',
				'#first142713',
				'#first142715',
				'#myTeach',
				'#to_top'
			]
		},
		/* 课程页面 */
		course: {
			main: [
				'#myTeach'
			]
		}
	},
	pref: {}
}
