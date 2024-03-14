import { getElement } from '../../../../lib/Listener/ElementAdd'
import { getEls } from '../../../../lib/Shorten'


export {
	selectOriginBanSetting
}

/* 选择CC原生的屏蔽 */
async function selectOriginBanSetting() {
	// 等待1s防止元素没有加载进来
	await getElement( void 0, '.ban-effect-list', 0, 1 );
	
	// 获取屏蔽列表
	const banList = getEls( '.ban-effect-list > li:not(.selected)' ) as NodeList;
	// 点击屏蔽
	banList.forEach( ( banItem ) => {
		( <HTMLElement> banItem ).click();
	} )
}
