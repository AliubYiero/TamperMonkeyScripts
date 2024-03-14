import { createSelectChoice } from './CreateSelectChoice.js'

/**
 * 创建一个Radio判断(yes / no)选项
 * @class
 * @constructor
 * @param { string } message 显示给用户的文本
 * @param { boolean } [defaultBoolean = true]
 * @param { string } [description = ''] 选项描述
 * */
export function createJudgeBoxConfig( message, defaultBoolean = true, description = '' ) {
	// 验证message是否在结尾添加冒号, 如果没有则添加
	if ( !message.trim().match( /[:：]$/ ) ) {
		message = message.replace( /$/, ': ' );
	}
	
	const choices = [
		new createSelectChoice( 'No', false, description ),
		new createSelectChoice( 'Yes', true, description ),
	]
	
	// 构造类
	this.message = message;
	this.choices = [
		choices[Number( defaultBoolean )],
		choices[Number( !defaultBoolean )],
	];
}
