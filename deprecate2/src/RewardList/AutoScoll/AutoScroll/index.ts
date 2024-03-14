import { Info } from '../../../../lib/Base/Info'
import { Prompt } from '../../../../Component'
import { config } from './src/Storage';
import { registerMenu, unregisterMenu } from '../../../../lib/GM_Lib'
import { autoScroll } from './src/AutoScroll'

export {
	print
}
const print = new Info( 'AutoScroll' );


/* entry */
( async () => {
	
	// 注册配置菜单
	const prompt = new Prompt( '输入滚动速度 (数字越大滚动速度越快) ', ( value: string ) => {
		if ( isNaN( +value ) ) {
			return;
		}
		config.scrollSpeed = +value;
	}, ( element: HTMLInputElement ) => {
		element.value = String( config.scrollSpeed );
	} )
	
	// 注册配置菜单按钮
	registerMenu( '定义滚动速度', () => {
		prompt.show();
	} )
	
	// 初始关闭滚动
	config.isScroll = false;
	openMenu();
	
	function openMenu() {
		const openMenuId = registerMenu( '[自动滚动] 开启', () => {
			autoScroll.open();
			unregisterMenu( openMenuId );
			const closeMenuId = registerMenu( '[自动滚动] 关闭', () => {
				autoScroll.close();
				unregisterMenu( closeMenuId );
				openMenu();
			} )
		} )
	}
	
} )();
