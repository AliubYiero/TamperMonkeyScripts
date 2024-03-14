/**
 * 点击元素
 * */
/* 初始化点击 */
import { elementWaiter } from '../../../../lib/Listener/ElementAdd'
import { getEl } from '../../../../lib/Shorten'
import { print } from '../index.ts'

export async function clickInputElement( selector: string, description?: string ) {
	await elementWaiter( selector, {
		timeoutPerSecond: 20,
		delayPerSecond: 1,
	} );
	const element = getEl( selector ) as HTMLInputElement;
	
	// 成功回调
	if ( element && element.checked ) {
		description
			? print.log( description )
			: print.log( '点击元素', element );
		element.click();
	}
	else if ( element ) {
		print.log( '弹幕已关闭', selector );
	}
	// 失败回调
	else {
		print.log( '获取不到元素 / 获取元素超时', selector );
	}
}
