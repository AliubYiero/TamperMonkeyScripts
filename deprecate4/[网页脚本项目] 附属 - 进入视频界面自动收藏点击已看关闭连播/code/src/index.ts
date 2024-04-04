import { elementWaiter } from '../libs/ElementWaiter'

const selectors = [
	// 快速收藏
	'.quick-favorite.be-quick-favorite:not(.on)',
	// 未看按钮
	'.btnView.btnNotView',
]

async function clickElements() {
for ( const selector of selectors ) {
	await elementWaiter( selector, {
		timeoutPerSecond: 10,
	} );
	const element = document.querySelector( selector ) as HTMLElement ;
	console.log('获取元素:', 'element');
	element.click();
}
}
clickElements();
