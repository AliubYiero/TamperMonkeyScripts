/**
 * HistoryBackup.ts
 * created by 2023/8/27
 * @file
 * @author  Yiero
 * */

import { print, readHistory } from '../index'
import { GMStorage } from '../../../../lib/GM_Lib'

export {
	historyBackup
}

async function historyBackup() {
	/* 从数据库中, 获取历史记录 */
	const historyList = await readHistory.getAll();
	
	/* 从油猴储存中, 读取备份记录 */
	const GMHistory = new GMStorage( 'history' );
	// GMHistory.remove();
	const GMHistoryList = GMHistory.get( [] ) as { id: number, date: number }[];
	/* 备份记录大于本地记录, 将备份记录写入本地记录 */
	print.info( '正在比较备份记录条目: ', `脚本储存条目(${ GMHistoryList.length })`, `仓库本地储存条目(${ historyList.length })` );
	
	if ( GMHistoryList.length > historyList.length ) {
		print.info( `历史记录丢失, 正在将备份写入历史记录: `, GMHistoryList );
		await readHistory.setList( GMHistoryList );
	}
	/* 本地记录大于备份记录, 进行备份 */
	else if ( GMHistoryList.length < historyList.length ) {
		print.info( '正在备份历史记录到脚本储存中. ' );
		GMHistory.set( [ ...new Set( [ ...GMHistoryList, ...historyList ] ) ] );
	}
}
