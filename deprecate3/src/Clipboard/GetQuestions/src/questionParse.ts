import { configs } from '../configs/configs.ts'
import { ConfigType } from '../interfaces/configType.ts'
import { getQuestionList } from './getQuestionList.ts'
import { website } from '../interfaces/website.ts'

export function questionParse( website: website ) {
	const config = configs.find( ( param ) => param.website === website ) as ConfigType;
	
	const questionStringList: string[] = [];
	// 单选题
	for ( let type in config.params ) {
		questionStringList.push( ...getQuestionList( config.params[ type ].selector, config.params[ type ].replaceRule ) );
	}
	// const radioQuestionStringList: string[] = getQuestionList( config.params.radio.selector, config.params.radio.replaceRule );
	// const checkboxQuestionStringList: string[] = getQuestionList( config.params.checkbox.selector, config.params.checkbox.replaceRule );
	// const judgeQuestionStringList: string[] = getQuestionList( config.params.judge.selector, config.params.judge.replaceRule );
	// const QAQuestionStringList: string[] = getQuestionList( config.params.QA.selector, config.params.QA.replaceRule );
	
	// 合并题目
	// const questionStringList: string[] = [
	// 	...radioQuestionStringList,
	// 	...checkboxQuestionStringList,
	// 	...judgeQuestionStringList,
	// 	...QAQuestionStringList,
	// ];
	
	// 将题目转换成字符串
	const questionString = questionStringList.join( '\n' );
	
	console.log( questionString );
	GM_setClipboard( questionString );
}
