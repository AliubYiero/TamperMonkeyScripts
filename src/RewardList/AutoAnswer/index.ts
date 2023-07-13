/**
 * index.ts
 * created by 2023/7/13
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */


import questionList from './assets/Qustion.json';
import { getAnswerList, getQuestionContent } from './Qustion/Qustion'
import { addStyle } from '../../../lib/GM_Lib/AddStyle'
import { addInfo } from './Info/ShowInfo'


( () => {
	console.info( '开始答题' );
	
	addStyle( `
.answer-show {
width: 80%;position: fixed;
top: 50px;
left: 10%;background: #f8f8f8;
box-sizing: border-box;
border-radius: 20px;
display: flex;
flex-flow: column;
flex-basis: 100%;
justify-content: center;
}
.answer-show__display {
animation: slideIn 1s forwards;
}
.answer-show__hide {
animation: slideOut 1s forwards;
}
@keyframes slideIn {
0% {
transform: translateX(-100%);
}
50% {
transform: translateX(0%);
}
100% {
transform: translateX(0%);
}
}
@keyframes slideOut {
0% {
transform: translateX(0%);
}
50% {
transform: translateX(0%);
}
100% {
transform: translateX(150%);
}
}
.answer-show-content {
padding-left: 20px;
margin: 5px;
color: indianred;
}` )
	
	
	/** 去除符号比对文本 */
	function matchQuestionsEqualWithoutSign( questionContent1: string, questionContent2: string ): boolean {
		const signList = /[，。！？、；：「」“”《》（）\s]/g;
		questionContent1 = questionContent1.replace( signList, '' );
		questionContent2 = questionContent2.replace( signList, '' );
		
		console.log( 'EqualQuestion: ', questionContent1, questionContent2 );
		return questionContent1 === questionContent2;
	}
	
	const getAnswer = () => {
		// 问题文本
		const questionContent = getQuestionContent();
		// 问题选项
		const optionList = getAnswerList();
		
		// 获取分割后的文本
		// const splitQuestionContent = questionContent.replace( /[(（].*/, '' );
		// console.log( splitQuestionContent );
		
		// 从题库中获取当前题目
		let getQuestion = false;
		let localQuestion: { question: string, answer: string[] } = { question: '', answer: [] };
		for ( let i = 0; i < questionList.length; i++ ) {
			const { question } = questionList[ i ];
			
			// 去除空格带来的影响，获取题目空格前的文本和空格后的文本
			// const prevQuestionContent = question.replace( /[(（].*$/, '' );
			// const nextQuestionContent = question.replace( /^.*[）)]/, '' );
			// console.log( 'prev', prevQuestionContent );
			// console.log( 'next', nextQuestionContent );
			if ( matchQuestionsEqualWithoutSign( questionContent, question ) ) {
				console.info( `获取到问题: ${ questionContent }` );
				getQuestion = true;
				localQuestion = questionList[ i ];
				break;
			}
			
		}
		
		const optionNumberList = [ 'A', 'B', 'C', 'D' ];
		let correctAnswer = [];
		if ( getQuestion ) {
			let { answer } = localQuestion;
			answer.filter( content => {
				return content.trim();
			} )
			
			for ( let j = 0; j < optionList.length; j++ ) {
				const option = optionList[ j ].trim();
				console.log( '正在确定正确选项', option );
				console.log( answer, option );
				if ( answer.indexOf( option ) !== -1 ) {
					let answerInfo = `获取正确答案[${ optionNumberList[ j ] }]: ${ option }`;
					console.log( answerInfo );
					correctAnswer.push( answerInfo );
				}
			}
			
			if ( correctAnswer.length < 1 ) {
				correctAnswer = [ '搜索不到答案' ];
			}
		} else {
			correctAnswer = [ '搜索不到问题' ];
		}
		addInfo( correctAnswer );
	}
	
	const loadObserver = new MutationObserver( () => {
		if ( ( <HTMLElement> document.querySelector( '.item-progress > span.ng-star-inserted' ) )?.innerText.match( '已完成' ) ) {
			console.info( '进入问卷' );
			
			console.info( '获取问题答案' );
			getAnswer();
			
			// 开启试题切换监听
			nextQuestionObserver.observe( ( <HTMLElement> document.querySelector( '.main-cont' ) ), {
				subtree: true,
				childList: true,
				characterData: true,
			} )
			
			// 关闭加载监听
			loadObserver.disconnect();
		}
	} );
	
	loadObserver.observe( document, {
		subtree: true,
		characterData: true,
	} )
	
	const nextQuestionObserver = new MutationObserver( () => {
		console.info( '切换试题' );
		console.info( '获取问题答案' );
		getAnswer();
	} );
	
} )();
