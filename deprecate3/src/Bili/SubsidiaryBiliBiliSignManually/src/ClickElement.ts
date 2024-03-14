/**
 * 点击元素
 * */
/* 初始化点击 */
import { elementWaiter } from '../../../../lib/Listener/ElementAdd'
import { getEl } from '../../../../lib/Shorten'
import { print } from '../index.ts'

export {
	clickElement
}

/**
 * Clicks on an element identified by the given selector.
 *
 * @param {string} selector - The selector used to identify the element.
 * @param {string} [description] - Optional description to be logged before clicking the element.
 * @param {number} [timeoutPerSecond=20] - Optional timeout in seconds for waiting for the element.
 * @param {number} [delayPerSecond=1] - Optional delay in seconds before clicking the element.
 * @return {Promise<void>} - A promise that resolves after the element is clicked.
 */
async function clickElement( selector: string, description?: string, timeoutPerSecond: number = 20, delayPerSecond: number = 1 ): Promise<void> {
	await elementWaiter( selector, {
		timeoutPerSecond,
		delayPerSecond
	} );
	const element = getEl( selector );
	
	if ( element ) {
		description ? print.log( description ) : print.log( '点击元素', element );
		element.click();
	}
	else {
		print.log( '获取不到元素 / 获取元素超时', selector );
	}
}
