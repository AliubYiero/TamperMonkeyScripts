import {
	OptionListStorage,
	SubmitAnswerStatusChange,
	urlJudge,
} from '../utils';

/** 绑定键盘事件，让键盘点击可以选择选项，跳转题目 */
export function bindKeyboardEvent() {
	const optionList = OptionListStorage.get();
	try {
		/* 绑定键盘按键 */
		window.addEventListener( 'keydown', e => {
			// console.log( e );
			const chosenOptionNumber = parseInt( e.key ) - 1;
			// 选择选项
			// console.log( 'chosenOptionNumber' + chosenOptionNumber );
			// console.log( 'optionLength' + optionList.length );
			if ( chosenOptionNumber >= 0 && chosenOptionNumber < optionList.length ) {
				console.info( 'Enter Option Chosen' );
				( <any> optionList[ chosenOptionNumber ] )?.click();
				return;
			}
			
			/* 跳转题目 */
			const submitAnswer = document.querySelectorAll( '.topic [style="clear: both;"]' );
			if ( submitAnswer.length === 2 && !SubmitAnswerStatusChange.isSubmit && [ 'Enter' ].indexOf( e.key ) !== -1 ) {
				// 提交多选答案
				SubmitAnswerStatusChange.submit();
				( <any> submitAnswer[ 0 ].querySelector( 'button' ) ).click();
				return;
			}
			
			SubmitAnswerStatusChange.fresh();
			// 切换上一题
			if ( [ 'ArrowLeft' ].indexOf( e.key ) !== -1 || [ 'NumpadSubtract' ].indexOf( e.code ) !== -1 ) {
				( <HTMLElement> document.querySelector( '.next-preve > button:nth-of-type(1)' ) ).click();
				
				// 切换下一题
			}
			else if ( [ 'Enter', '+', 'ArrowRight' ].indexOf( e.key ) !== -1 ) {
				const rightBtn = <HTMLButtonElement> document.querySelector( '.next-preve > button:nth-of-type(2)' );
				
				/* 模拟考试界面最后一题交卷
				* 判断1: `下一题`按钮被禁用时，说明最后一题
				* 判断2: 处于模拟考试界面时，进行提交
				* */
				if ( rightBtn.disabled && urlJudge( 'https://www.zaixiankaoshi.com/mnks/simulation/' ) ) {
					let submitBtn = <HTMLButtonElement> document.querySelector( '.submit-btn' );
					submitBtn.click();
					return;
				}
				
				// 切换下一题
				rightBtn.click();
			}
		} );
	}
	catch ( e ) {
		console.error( e );
		
		/* 绑定失败时，添加提示框重新刷新页面 */
		const isReloadPage = confirm( `
KeyBoard binding got an error, should fresh this page to reload?
按键绑定失败。是否需要重新刷新页面重新载入脚本？
		` );
		if ( isReloadPage ) {
			location.reload();
		}
	}
}
