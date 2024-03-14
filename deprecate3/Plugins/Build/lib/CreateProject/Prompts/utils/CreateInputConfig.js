/**
 * 创建一个Input输入框
 * @class
 * @constructor
 * @param { string } message 显示给用户的文本
 * @param { string } [defaultValue] 默认值
 * @param { function(string, { isFinal: boolean }):string } [transformer] 格式化用户输入的值
 * @param { (function(string):boolean) | string | Promise<string | boolean> } [validate] 合法性验证
 * */
export function createInputConfig( message, defaultValue, transformer, validate ) {
	// 验证message是否在结尾添加冒号, 如果没有则添加
	if ( !message.trim().match( /[:：]$/ ) ) {
		message = message.replace( /$/, ': ' );
	}
	
	// 构造类
	this.message = message;
	if ( defaultValue ) {
		this.default = defaultValue;
	}
	if ( transformer ) {
		this.transformer = transformer;
	}
	if ( validate ) {
		this.validate = validate;
	}
}
