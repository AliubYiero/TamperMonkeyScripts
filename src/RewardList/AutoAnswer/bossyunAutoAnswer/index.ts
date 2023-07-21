/* entry */

/*
* 题库：计算机应用技术
* 59-英语
* 6-毛泽东
* 58-大学生
* 60-python
* 12-图形图像处理
* 题库：商务英语
* 74-综合英语
* 3-英语口语一
* 19-商务英语翻译
* 题库：工商企业管理
* 35-经济学基础
* 37-管理学基础
* 34-会计基础
* 题库：电子商务
* 17-跨境电子商务实务
* 77-Photoshop平面设计
* 题库：旅游管理
* 44-中国旅游地理
* 5-旅游管理概论
* 题库：国际经济与贸易
* */

import { matchContentsWithoutLetter, matchContentsWithoutSign } from '../gdwlxyxsAutoAnswer/src/matchContents'
import questionList from './assets/questions.json';
import { Sleep } from '../../../../lib/Base/Sleep'
import { getElement } from '../../../../lib/Listener/ElementAdd';

( async () => {
	await new Promise( resolve => {
		setInterval( () => {
			console.info( 'Load Exam Page' );
			if ( document.querySelector( '.page-examine .ant-breadcrumb' ) ) {
				resolve( resolve );
			}
		}, 1000 );
	} )
	
	await getElement( document.body, '.question-list-wrap' );
	await Sleep.time( 1 );
	
	let domList: { questionNodeList?: NodeList; questionList?: Question[] } = {};
	domList.questionNodeList = getAllQuestion() as NodeList;
	domList.questionList = parseQuestionNodeListToObject();
	
	function getAllQuestion() {
		return document.querySelectorAll( '.question-list' ) as NodeList;
	}
	
	function getQuestionContent( questionDom: HTMLElement ) {
		
		// 因为当前平台的题库会出现后缀分数，所有需要去除
		// 当前平台会出现html换行字符，需去除
		return questionDom.innerText.replace( /^[(（]题目\d*分[）)]/g, '' ).trim();
	}
	
	function getQuestionOptionsDom( questionContainerDom: HTMLElement ) {
		return questionContainerDom.querySelectorAll( 'label' ) as NodeList;
	}
	
	/** 将Node解析为Question对象 */
	function parseQuestionNodeListToObject() {
		
		/**
		 * 从页面中获取问题选项，返回选项文本数组
		 * */
		function getQuestionOptions( optionDomList: NodeList ) {
			const options: string[] = [];
			optionDomList.forEach( ( option ) => {
				options.push( ( <HTMLElement> option ).innerText.replace( '\n', '' ).replace( /^[ABCDEFG][、.．]/, '' ) );
			} )
			return options;
		}
		
		
		const list: Question[] = [];
		( <NodeList> domList.questionNodeList ).forEach( ( questionContainerNode ) => {
			let obj: Question;
			obj = { answers: [], question: '', options: [], optionsNode: undefined };
			const questionDom = ( <HTMLElement> questionContainerNode ).querySelector( '.list-top .title > div' ) as HTMLElement;
			obj.question = getQuestionContent( questionDom );
			obj.optionsNode = getQuestionOptionsDom( <HTMLElement> questionContainerNode );
			obj.options = getQuestionOptions( obj.optionsNode );
			
			list.push( obj );
		} )
		return list;
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
	function getAnswer( localQuestion: Question, questionOptions: string[] ) {
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
		
		// const inputDom = document.querySelector( '.question-option textarea' ) as HTMLInputElement ||
		// 	document.querySelector( '.question-option input' ) as HTMLInputElement;
		// inputDom.value = '';
		//
		// function submitValue( aimDom: HTMLElement ) {
		// 	aimDom.dispatchEvent( new Event( 'focus' ) );
		// 	aimDom.dispatchEvent( new Event( 'input' ) );
		// 	aimDom.dispatchEvent( new Event( 'change' ) );
		// 	aimDom.dispatchEvent( new Event( 'blur' ) );
		// }
		
		for ( const answerLetter of correctAnswer ) {
			// 问答
			// if ( !answerLetter.match( /^[ABCDEFG]$/ ) ) {
			// 	inputDom.value += answerLetter;
			// 	await Sleep.time( 0.2 );
			// 	submitValue( inputDom );
			// }
			
			// 选项
			let answerNumber = answerLetterToNumber( answerLetter );
			const optionDom = optionDomList[ answerNumber ] as HTMLElement;
			
			if ( optionDom?.classList?.contains( 'ant-checkbox-wrapper-checked' ) ) {
				continue;
			}
			
			optionDom?.click();
			await Sleep.time( 0.3 );
		}
	}
	
	
	for ( let i = 0; i < domList.questionList.length; i++ ) {
		const Question = domList.questionList[ i ];
		const localQuestion = getQuestionFromLibrary( Question.question );
		
		console.log( '获取当前问题题库：', localQuestion );
		
		if ( localQuestion ) {
			// @ts-ignore
			const answer = getAnswer( localQuestion, Question.options );
			console.log( '获取当前问题的答案：', answer );
			
			if ( answer[ 0 ] ) {
				await clickAnswer( ( <NodeList> Question.optionsNode ), answer );
			}
		}
	}
	console.log( domList );
} )();

type Question = { question: string; answers: string[]; options?: string[], optionsNode?: NodeList }
