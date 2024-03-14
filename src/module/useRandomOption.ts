import { urlJudge } from '../utils';

/** 使用题目乱序 */
export function useRandomOption() {
	// 排除没有选择乱序题目的情况
	if ( localStorage.getItem( 'openRandomOption' ) !== 'true' || !urlJudge( 'https://www.zaixiankaoshi.com/mnks/simulation/' ) ) {
		return;
	}
	
	// 获取随机容器
	console.info( 'Use Random Option.' );
	const optionContainer = document.querySelector( '.select-left' ) as HTMLDivElement;
	
	// 打乱选项
	const optionList = Array.from( optionContainer.querySelectorAll( '.option' ) );
	optionList.sort( () => {
		return Math.random() - 0.5;
	} );
	
	// 更换打乱后选项的编号
	const upperAlphaList = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];
	for ( let i = 0; i < optionList.length; i++ ) {
		const option = optionList[ i ] as HTMLDivElement;
		( <HTMLSpanElement> option.querySelector( '.before-icon' ) ).innerText = upperAlphaList[ i ];
	}
	
	// 放置随机容器
	optionList.forEach( option => {
		optionContainer.append( option );
	} );
}
