import { OptionObserver, SubmitAnswerStatusChange } from '../utils';

/** 更换题目时重新初始化提交状态 */
export function initOption() {
	const questionBox = document.querySelector( '.qusetion-box' ) as HTMLElement;
	new OptionObserver( questionBox, () => {
		console.info( 'Change question' );
		SubmitAnswerStatusChange.fresh();
	} );
}
