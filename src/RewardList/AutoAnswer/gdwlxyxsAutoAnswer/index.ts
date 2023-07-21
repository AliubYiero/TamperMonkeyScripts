/* entry */

import { matchContentsWithoutLetter, matchContentsWithoutSign } from './src/matchContents'
import questionList from './src/getQuestionList'
import { Sleep } from '../../../../lib/Base/Sleep'
import { getElement } from '../../../../lib/Listener/ElementAdd'
import { addElementToDocument, createElement } from '../../../../lib/GM_Lib'


( async () => {
	/** 获取页面元素 */
	await getElement( document.body, '.question-option' );
	await Sleep.time( 1 );
	
	/**
	 * 从页面中获取问题文本
	 * */
	function getQuestionContent() {
		const questionDom = document.querySelector( '.question-stem' ) as HTMLDivElement;
		
		// 因为当前平台的题库会出现后缀分数，所有需要去除
		// 当前平台会出现html换行字符，需去除
		return questionDom.innerText.replace( /<.*?>/, '' ).trim();
	}
	
	/**
	 * 从页面中获取问题选项Dom
	 * */
	function getQuestionOptionsDom() {
		return document.querySelectorAll( '.question-option label' ) as NodeList;
	}
	
	/** 获取子问题Dom数组 */
	function getChildQuestionsDom() {
		return document.querySelectorAll( '.question-option .question-item' ) as NodeList;
	}
	
	/** 获取子问题问题文本 */
	function getChildQuestionContent( childQuestionsDom: HTMLElement ) {
		const questionDom = childQuestionsDom.querySelector( '.item-title span' ) as HTMLElement;
		
		return questionDom.innerText.replace( /<.*?>/, '' ).trim();
	}
	
	/** 获取子问题选项Dom */
	function getChildQuestionOptionsDom( childQuestionsDom: HTMLElement ) {
		return childQuestionsDom.querySelectorAll( 'label' ) as NodeList;
	}
	
	/**
	 * 从页面中获取问题选项
	 * */
	function getQuestionOptions( optionDomList: NodeList ) {
		const options: string[] = [];
		optionDomList.forEach( ( option ) => {
			options.push( ( <HTMLElement> option ).innerText.replace( '\n', '' ).replace( /^[ABCDEFG][、.．]/, '' ) );
		} )
		return options;
	}
	
	function getQuestionFromLibrary( questionContent: string ) {
		for ( let i = 0; i < questionList.length; i++ ) {
			const { question } = questionList[ i ];
			
			// 去除空格带来的影响，获取题目空格前的文本和空格后的文本
			if ( matchContentsWithoutSign( questionContent, question ) ) {
				console.info( '[GetQuestion]', `获取到问题: ${ questionContent }` );
				return questionList[ i ];
			}
		}
	}
	
	
	/** 匹配答案选项 */
	function getAnswer( localQuestion: { question: string, answers: string[] }, questionOptions: string[] ) {
		let { answers } = localQuestion;
		
		function formatAnswer() {
			answers.filter( content => {
				return content.trim();
			} )
		}
		
		// 格式化答案
		formatAnswer();
		
		let correctAnswer: string[] = [];
		const optionNumberList = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ];
		for ( let j = 0; j < questionOptions.length; j++ ) {
			const option = questionOptions[ j ].trim();
			console.log( '正在确定正确选项', option );
			console.log( answers, option );
			
			answers = answers.filter( content => {
				if ( !content ) {
					console.log( '没有答案' );
					correctAnswer.push( '' )
				} else if ( matchContentsWithoutLetter( content, option ) ) {
					let answerInfo = optionNumberList[ j ];
					correctAnswer.push( answerInfo );
				}
				return content;
			} )
		}
		
		if ( correctAnswer.length < 1 ) {
			correctAnswer = answers;
		}
		return correctAnswer;
	}
	
	/**
	 * 填入问题答案
	 * */
	async function clickAnswer( optionDomList: NodeList, correctAnswer: string[] ) {
		function answerLetterToNumber( answerLetter: string ) {
			let answerNumber: number = 0;
			switch ( answerLetter ) {
				case 'A':
					answerNumber = 0;
					break;
				case 'B':
					answerNumber = 1;
					break;
				case 'C':
					answerNumber = 2;
					break;
				case 'D':
					answerNumber = 3;
					break;
				case 'E':
					answerNumber = 4;
					break;
				case 'F':
					answerNumber = 5;
					break;
				case 'G':
					answerNumber = 6;
					break;
			}
			return answerNumber;
		}
		
		const inputDom = document.querySelector( '.question-option textarea' ) as HTMLInputElement ||
			document.querySelector( '.question-option input' ) as HTMLInputElement;
		inputDom.value = '';
		
		function submitValue( aimDom: HTMLElement ) {
			aimDom.dispatchEvent( new Event( 'focus' ) );
			aimDom.dispatchEvent( new Event( 'input' ) );
			aimDom.dispatchEvent( new Event( 'change' ) );
			aimDom.dispatchEvent( new Event( 'blur' ) );
		}
		
		for ( const answerLetter of correctAnswer ) {
			// 问答
			if ( !answerLetter.match( /^[ABCDEFG]$/ ) ) {
				inputDom.value += answerLetter;
				await Sleep.time( 0.2 );
				submitValue( inputDom );
			}
			
			// 选项
			let answerNumber = answerLetterToNumber( answerLetter );
			// console.log( answerNumber, optionDomList[ answerNumber ] );
			const optionDom = optionDomList[ answerNumber ] as HTMLElement;
			
			if ( optionDom?.classList?.contains( 'is-checked' ) ) {
				continue;
			}
			
			optionDom?.click();
			await Sleep.time( 0.3 );
		}
	}
	
	/** 获取下一题按钮 */
	function getNextQuestionBtn() {
		const nextBtn = document.querySelector( '.question-footer > button:last-of-type' ) as HTMLElement;
		if ( nextBtn.innerText === '下一题' ) {
			return nextBtn;
		}
	}
	
	/** 进入下一题 */
	// @ts-ignore
	function nextQuestion( nextBtn: HTMLElement ) {
		console.info( '进入下一题' );
		nextBtn.click();
	}
	
	/** 观察页面更新 */
		// @ts-ignore
	let pageObserver: MutationObserver;
	
	const addPageObserver = ( function () {
		const typeDom = document.querySelector( '.question-page' ) as HTMLElement;
		pageObserver = new MutationObserver( () => {
			console.log( '页面更新' );
			getQuestionLoop();
			
		} );
		
		return function () {
			pageObserver.observe( typeDom, {
				subtree: true,
				childList: true
			} )
		}
	} )();
	
	async function getQuestionLoop() {
		const domList = {
			nextBtn: getNextQuestionBtn(),
		}
		
		const childQuestionsDomList = getChildQuestionsDom();
		// 多问题
		if ( childQuestionsDomList[ 0 ] ) {
			childQuestionsDomList.forEach( ( async ( childQuestionsDom ) => {
				const questionContent = getChildQuestionContent( ( <HTMLElement> childQuestionsDom ) );
				const optionDomList = getChildQuestionOptionsDom( ( <HTMLElement> childQuestionsDom ) );
				const questionOptions = getQuestionOptions( optionDomList );
				const localQuestion = getQuestionFromLibrary( questionContent );
				
				console.log( '获取问题文本：', questionContent );
				console.log( '获取选项：', questionOptions );
				console.log( '获取当前问题题库：', localQuestion );
				
				if ( localQuestion ) {
					// @ts-ignore
					const answer = getAnswer( localQuestion, questionOptions );
					console.log( '获取当前问题的答案：', answer );
					
					if ( answer[ 0 ] ) {
						await clickAnswer( optionDomList, answer );
					}
				}
			} ) )
		}
		// 单问题 
		else {
			const questionContent = getQuestionContent();
			const optionDomList = getQuestionOptionsDom();
			const questionOptions = getQuestionOptions( optionDomList );
			const localQuestion = getQuestionFromLibrary( questionContent );
			
			console.log( '获取问题文本：', questionContent );
			console.log( '获取选项：', questionOptions );
			console.log( '获取当前问题题库：', localQuestion );
			
			if ( localQuestion ) {
				// @ts-ignore
				const answer = getAnswer( localQuestion, questionOptions );
				console.log( '获取当前问题的答案：', answer );
				
				if ( answer[ 0 ] ) {
					await clickAnswer( optionDomList, answer );
				}
			}
		}
		
		await Sleep.time( 1 );
		
		if ( domList.nextBtn ) {
			nextQuestion( domList.nextBtn );
			console.log( '切换下一题' );
		}
	}
	
	function addStopBtn() {
		const titleDom = document.querySelector( '.question-title' ) as HTMLElement;
		const stopBtn = createElement( {
			tagName: 'button',
			innerText: 'Stop'
		} )
		stopBtn.onclick = ( e ) => {
			e.preventDefault();
			pageObserver.disconnect();
		}
		
		addElementToDocument( stopBtn, '', titleDom );
	}
	
	
	await getQuestionLoop();
	addPageObserver();
	addStopBtn()
} )();
