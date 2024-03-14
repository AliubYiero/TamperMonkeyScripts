import { OptionListStorage, OptionObserver } from '../utils';

/** 更换选项Dom
 *  当单选/多选切换时，会更换成另外的容器进行答题，需要重新绑定容器
 * */
export function getOptionContainer(): void {
	let optionList = document.querySelectorAll( '.options-w > .option' );
	try {
		new OptionObserver( <HTMLElement> document.querySelector( '.top-hd' ), () => {
			// console.log( e );
			new OptionObserver( <HTMLElement> document.querySelector( '.options-w' ), () => {
				console.info( 'Fresh Options: ' );
				// console.log( e );
				optionList = document.querySelectorAll( '.options-w > .option' );
			} );
		} );
	}
	catch ( e ) {
		// 获取不到题目卡片时刷新页面重新加载
		// location.reload();
	}
	OptionListStorage.set( optionList );
}
