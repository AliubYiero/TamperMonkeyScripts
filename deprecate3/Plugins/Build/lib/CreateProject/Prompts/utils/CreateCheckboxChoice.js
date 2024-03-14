/**
 * 创建一个显示值和返回值一样的checkbox多选框选项
 * @class
 * @constructor
 * @param { string } name 显示给用户的文本
 * @param { any } [value] 返回的值, 如果没有输入默认和name一样
 * */
export function createCheckboxChoice( name, value ) {
	// value默认值处理, 无输入默认和name一样
	if ( value === undefined || value === null ) {
		value = name;
	}
	
	// 构造类
	this.name = name;
	this.value = value;
}
