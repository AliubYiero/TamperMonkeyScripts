import { getEl } from '../../../../../lib/Shorten'
import { downloadFile } from '../../../../../lib/IO/Download/Download'
import { readHistory } from '../../index'
import { importJson } from '../../../../../lib/IO/Import/Import'

export {
	SaveBtn
}

class SaveBtn {
	domList: { [ propName: string ]: HTMLElement } = {
		ulList: getEl( '.menu-group-list' ) as HTMLElement,
	};
	
	
	/**
	 * 导出
	 * */
	download() {
		const downloadBtn = GM_addElement(
			this.domList.ulList,
			'li',
			{
				class: 'menu-list-item',
			} );
		
		downloadBtn.innerHTML = `
			<a class="router-link-exact-active download-btn" href="javascript:;">保存历史记录</a>
		`;
		
		// 导出历史记录
		downloadBtn.querySelector( '.download-btn' )?.addEventListener( 'click', async () => {
			downloadFile(
				new Blob( [ JSON.stringify( await readHistory.getAll() ) ], {
					type: 'application/json'
				} ),
				'ReadHistoryBackUp.json'
			);
		} )
	}
	
	/**
	 * 导入
	 * */
	import() {
		const downloadBtn = GM_addElement(
			this.domList.ulList,
			'li',
			{
				class: 'menu-list-item',
			} );
		
		downloadBtn.innerHTML = `
			<a class="router-link-exact-active import-btn" href="javascript:;">导入历史记录</a>
		`;
		
		// 导入历史记录
		downloadBtn.querySelector( '.import-btn' )?.addEventListener( 'click', async () => {
			// 读取历史记录文件
			const historyJsonString = await importJson();
			const historyArray: { id: number, date: number }[] = JSON.parse( historyJsonString );
			
			/* 验证Json文件是否为正确的历史记录文件 */
			if ( Array.isArray( historyArray ) ) {
				// 遍历一遍数组, 查看是否存在错误对象
				const isRightHistoryArray = !( historyArray.find( ( { id, date } ) => {
					return !( id && date );
				} ) );
				
				/* 对象正确, 写入到数据库中 */
				if ( isRightHistoryArray ) {
					await readHistory.setList( historyArray );
					alert( '导入历史记录成功. ' );
					return;
				}
			}
			else {
				alert( '导入Json文件为错误的历史记录文件. ' );
			}
		} )
		
		
	}
}
