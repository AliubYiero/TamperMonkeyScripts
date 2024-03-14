import { elementWaiter } from '../../../../lib/Listener/ElementAdd'
import { DynamicLoad } from '../../lib/DynamicLoad/DynamicLoad.ts'
import { addQuinLiveBtn } from './addQuinLiveBtn.ts'

/** 绑定Quin动态, 添加跳转直播链接按钮 */
export async function handlerBindQuinLiveBtn(): Promise<void> {
	await elementWaiter( '.bili-dyn-list__item' );
	const dynamicLoad = new DynamicLoad();
	
	// 获取初始动态
	const dynamicList: Node[] = dynamicLoad.items;
	dynamicList.forEach( addQuinLiveBtn );
	
	// 监听动态更新事件, 获取新加载的动态
	window.addEventListener( 'dynamicUpdate', ( e ) => {
		const result = e as CustomEvent;
		
		const dynamicList: Node[] = result.detail;
		dynamicList.forEach( addQuinLiveBtn );
	} );
}
