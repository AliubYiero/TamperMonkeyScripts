/**
 * Qustion.ts
 * created by 2023/7/13
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	getQuestionContent,
	getAnswerList
}

/** 获取题目文本 */
const getQuestionContent = () => {
	const content = ( <HTMLElement> document.querySelector( '[richtext]' ) ).innerText;
	console.log( `获取问题： ${ content }` );
	return content;
}


/** 获取问题选项 */
const getAnswerList = () => {
	const answerList: string[] = [];
	document.querySelectorAll( '.option.ng-star-inserted' ).forEach( ( element ) => {
		answerList.push( ( <HTMLElement> element ).innerText );
	} )
	console.log( '获取选项：', answerList );
	return answerList;
}
