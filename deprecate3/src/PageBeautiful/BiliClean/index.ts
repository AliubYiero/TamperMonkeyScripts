import { Info } from '../../../lib/Base/Info'
import { EntryBranch } from '../../../lib/Base/EntryBranch'
import { addNewStyle } from './src/addNewStyle'
import { isMatchURL } from '../../../lib/Base/IsMatchURL'
import { changeTypeTitle } from './src/changeTypeTitle'
import { changeSearchBarPlaceholder } from './src/changeSearchBarPlaceholder'

export {
	print
}
const print = new Info( 'BiliClean' );

/* entry */
( async () => {
	const entryBranch = new EntryBranch();
	// 添加分支, 捕获直播页面
	entryBranch
		.add(
			() => isMatchURL( /^https:\/\/live.bilibili.com\/(blanc\/)?\d+/ ),
			async () => {
				addNewStyle( 'live' );
				// 改变搜索栏文本
				await changeSearchBarPlaceholder( '搜索' );
			}
		)
		// 添加分支, 捕获动态页面
		.add(
			() => isMatchURL( 'https://t.bilibili.com/' ),
			async () => {
				addNewStyle( 'dynamic' );
				
				await changeTypeTitle();
			}
		)
		// 添加分支, 捕获视频页面
		.add(
			() => isMatchURL( /^https:\/\/www.bilibili.com\/video\/(av)|(BV)/ ),
			() => {
				addNewStyle( 'video' );
			}
		)
		// 添加分支, 捕获UP主页动态页面
		.add(
			() => isMatchURL( /^https:\/\/space.bilibili.com\/\d+\/dynamic/ ),
			() => {
				addNewStyle( 'dynamic' );
			}
		)
		// 添加分支, 顶部导航栏的直播栏的下拉iframe
		.add(
			() => isMatchURL( 'https://live.bilibili.com/blackboard/dropdown-menu.html' ),
			() => {
				addNewStyle( 'liveNavIframe' )
			}
		)
	
	// 运行分支选择器
	entryBranch.run();
} )();
