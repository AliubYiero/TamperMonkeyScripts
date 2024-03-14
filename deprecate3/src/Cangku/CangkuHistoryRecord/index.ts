import { addReadStyle } from './src/AddReadStyle';
import { EntryBranch } from '../../../lib/Base/EntryBranch'
import { isMatchURL } from '../../../lib/Base/IsMatchURL'
import { freshListenerPushState } from '../../../lib/Listener/Page/FreshListener'
import { Info } from '../../../lib/Base/Info'
import { HomePageEntry } from './src/Entry/HomePageEntry'
import { ReadHistory } from './src/implements/ReadHistory'
import { categoryPageEntry } from './src/Entry/CategoryPageEntry'
import { CSSRule } from '../../PageBeautiful/CssStyleClass/CSSRule'
import { rankPageEntry } from './src/Entry/RankPageEntry'
import { achievePageEntry } from './src/Entry/AchievePageEntry'
import { historyBackup } from './src/HistoryBackup'
import { pushNewReadAchieve } from './src/PushNewReadAchieve'
import { SaveBtn } from './src/implements/SaveBtn'
import { addFreshBtn } from './src/AddFreshBtn'
import { getElement } from '../../../lib/Listener/ElementAdd'

export {
	print,
	readHistory
}
const print = new Info( 'postCardList' );
// 读取indexDB库

const cssRule = new CSSRule();
const readHistory = new ReadHistory();

/* entry */
( async () => {
	/* 添加观看标记样式 */
	addReadStyle( cssRule );
	
	/* 备份历史记录 */
	await historyBackup();
	
	const entryBranch = new EntryBranch();
	// 分支 - 主页(首页)
	entryBranch
		.add(
			() => isMatchURL( '^https://cangku.moe/$' ),
			HomePageEntry
		)
		// 分支 - 主页(续页(2,3,4,5,...页))
		.add(
			() => isMatchURL( '^https://cangku.moe/\\?page' ),
			async () => {
				await HomePageEntry();
				
				// 写入新样式, 第二页去除提示框
				cssRule
					.pushHide( '.global-announce' )
					.submit();
			},
		)
		// 分支 - 帖子
		.add(
			() => isMatchURL( /https:\/\/cangku.moe\/archives\/\d+/ ),
			async () => {
				await achievePageEntry();
				
				// 发送新的帖子阅读事件
				await pushNewReadAchieve();
			},
		)
		// 分支 - 分类
		.add(
			() => isMatchURL( /https:\/\/cangku.moe\/category\/\d+/ ),
			categoryPageEntry,
		)
		// 分支 - 排行
		.add(
			() => isMatchURL( 'https://cangku.moe/rank' ),
			rankPageEntry,
		)
		// 分支 - 个人资料
		.add(
			() => isMatchURL( 'https://cangku.moe/account/' ),
			async () => {
				await getElement( document.body, '.menu-group-list', 0, 0.5 );
				const saveBtn = new SaveBtn();
				/* 添加保存历史记录按钮 */
				saveBtn.download();
				/* 添加导入历史记录按钮 */
				saveBtn.import();
			},
		)
		// 初始化, 运行分支
		.run();
	
	
	// 页面热更新, 运行分支
	freshListenerPushState( () => {
		entryBranch.run();
	} );
	
	
	/* 添加刷新按钮 */
	await addFreshBtn( entryBranch );
	
} )();
