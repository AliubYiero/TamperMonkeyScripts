import { douyinAddNewStyle } from './src/DouyinAddNewStyle'
import { isMatchURL } from '../../../lib/Base/IsMatchURL'
import { EntryBranch } from '../../../lib/Base/EntryBranch'

( () => {
	const entryBranch = new EntryBranch();
	entryBranch
		.add(
			() => isMatchURL( /^https:\/\/live.douyin.com\/\d+/ ),
			() => {
				// 添加屏蔽CSS样式表
				douyinAddNewStyle();
			}
		)
		.run();
} )();
