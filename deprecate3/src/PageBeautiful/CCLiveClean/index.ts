import { Info } from '../../../lib/Base/Info'
import { addCCNewStyle } from './src/AddCCNewStyle'
import { equalLiveId, live } from './src/JumpDisabled'
import { selectOriginBanSetting } from './src/SelectOriginBanSetting'
import { isMatchURL } from '../../../lib/Base/IsMatchURL'
import { EntryBranch } from '../../../lib/Base/EntryBranch'
import { disabledNotWhiteListUrl } from './src/DisabledNotWhiteListUrl'
import { registerConfigBtn } from './src/RegisterConfigBtn'

export {
	print
}
const print = new Info( 'CCLiveClean' );

/* 主页面入口函数 */
async function mainPageEntry() {
	/* 进入非白名单页面时, 关闭页面 */
	disabledNotWhiteListUrl( Number( live.id ) );
	
	/* 添加选项按钮 */
	registerConfigBtn( Number( live.id ) );
	
	/* 写入新规则 */
	addCCNewStyle( 'main' );
	
	/* 选中CC原生的屏蔽选项 */
	await selectOriginBanSetting();
	
	/* 页面热更新时关闭页面 */
	equalLiveId();
}


/* entry */
( async () => {
	// 添加分支选择器
	const entryBranch = new EntryBranch();
	// 添加分支, CC主页添加选项按钮
	entryBranch.add(
		() => isMatchURL( /^https?:\/\/cc.163.com\/$/ ),
		registerConfigBtn
	);
	
	// 添加分支, CC直播间美化
	entryBranch.add(
		() => isMatchURL( /^https?:\/\/cc.163.com\/(\d+)/ ),
		mainPageEntry
	);
	
	// 添加分支, CC直播间iframe 下播倒计时关闭
	entryBranch.add(
		() => isMatchURL( 'act/m/daily/anchor_end_countdown/index.html' ),
		() => {
			/* 写入新规则 */
			addCCNewStyle( 'anchor_end_countdown' );
		}
	);
	
	// 运行
	entryBranch.run();
} )();
