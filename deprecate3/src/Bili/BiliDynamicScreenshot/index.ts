/* entry */
import { EntryBranch } from '../../../lib/Base/EntryBranch';
import { isMatchURL } from '../../../lib/Base/IsMatchURL'
import { elementWaiter } from '../../../lib/Listener/ElementAdd'
import { getEl, getEls } from '../../../lib/Shorten'
import { Info } from '../../../lib/Base/Info'
import { parseDynamicList } from './src/ParseDynamicList'
import { addDynamicSaveBtn } from './src/AddDynamicSaveBtn'

export {
	print
}
const print = new Info( 'BiliDynamicScreenshot' );
( async () => {
	new EntryBranch()
		.add(
			isMatchURL( '^https://t.bilibili.com/' ),
			async () => {
				await elementWaiter( '.bili-dyn-list__item', null, 0, 1 );
				
				
				// 为初始的动态添加保存图片按钮
				const dynamicNodeDataSet = parseDynamicList( getEls( '.bili-dyn-list__item' ) as NodeList );
				addDynamicSaveBtn( dynamicNodeDataSet );
				
				// 为新加载的动态添加保存图片按钮
				new MutationObserver( ( e ) => {
					e.forEach( record => {
						const dynamicNodeDataSet = parseDynamicList( record.addedNodes );
						addDynamicSaveBtn( dynamicNodeDataSet );
					} )
				} ).observe( <HTMLElement> getEl( '.bili-dyn-list__items' ), {
					childList: true
				} );
				// TODO FIX 保存的图片头像不全
				// TODO FIX 无法提取到包含视频分享的动态/视频动态
			}
		)
		.run();
} )();
