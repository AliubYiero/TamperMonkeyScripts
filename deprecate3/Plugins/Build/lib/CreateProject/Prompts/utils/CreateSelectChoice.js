/**
 * 创建一个Radio单选框选项
 * @class
 * @constructor
 * @param { string } name 显示给用户的文本
 * @param { any } [value] 返回的值, 如果没有输入默认和name一样
 * @param { string } [description = ''] 选项描述
 * */
export function createSelectChoice( name, value, description = '' ) {
	/* 只输入一个参数 */
	if ( arguments.length === 1 && ( value === undefined || value === null ) ) {
		// value默认值处理, 无输入默认和name一样
		value = name;
	}
	/* 输入两个参数, 且第二个参数为字符串, 默认全部为name = value, description 为第二个参数 */
	else if ( arguments.length === 2 && typeof value === 'string' ) {
		description = value;
		value = name;
	}
	
	// 构造类
	this.name = name;
	this.value = value;
	this.description = description;
}
