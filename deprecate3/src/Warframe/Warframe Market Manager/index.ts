import {
	freshListenerPushState
} from '../../../lib/Listener/Page/FreshListener.ts'
import { parseOrder } from './parseOrder.ts';
import { elementWaiter } from '../../../lib/Listener/ElementAdd'
import { addAlertNode } from './src/addAlertNode.ts'
import { EntryBranch } from '../../../lib/Base/EntryBranch.ts'


( async () => {
	const entryBranch = new EntryBranch();
	/* 刷新页面时, 重新载入 */
	freshListenerPushState( async () => {
		entryBranch.add(
			document.URL.startsWith( 'https://warframe.market/zh-hans/items/' ),
			ItemSearchFunction
		)
	} )
	
	/**
	 * 搜索 items 物品的功能
	 * */
	async function ItemSearchFunction() {
		console.log( 1123 );
		/**
		 * 闭包函数, 储存标准价按钮元素
		 * */
		const initPriceElement = ( () => {
			let priceElement: HTMLElement;
			let parseOrderList: string[];
			let parseOrderString: string;
			
			return async () => {
				parseOrderList = await parseOrder();
				parseOrderString = parseOrderList.join( '\n--------------------------------\n' )
				
				// 如果存在价格元素, 则先删除再添加
				if ( priceElement ) {
					priceElement.remove();
				}
				
				// 等待元素载入
				await elementWaiter( '[class^="wiki-desc--"]' );
				// 写入点击提示元素
				priceElement = addAlertNode( '[class^="wiki-desc--"]', parseOrderString );
				
				// 在控制台输出
				console.info( parseOrderString );
			}
		} )();
		
		await initPriceElement();
	}
	
} )();
