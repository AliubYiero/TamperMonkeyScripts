/**
 * 创建一个Select单选框
 * @class
 * @constructor
 * @param { string } message 显示给用户的文本
 * @param { { name: string, value: any, description?: string }[] } choices 默认值
 * */
export function createSelectBoxConfig( message, choices ) {
	// 验证message是否在结尾添加冒号, 如果没有则添加
	if ( !message.trim().match( /[:：]$/ ) ) {
		message = message.replace( /$/, ': ' );
	}
	
	// 构造类
	this.message = message;
	this.choices = choices;
}
