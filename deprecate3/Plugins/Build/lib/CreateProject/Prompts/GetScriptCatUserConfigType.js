import { select } from '@inquirer/prompts'
import { createSelectBoxConfig } from './utils/CreateSelectBoxConfig.js'
import { createSelectChoice } from './utils/CreateSelectChoice.js'

/**
 * 选项: [UserConfig配置项] 获取config类型
 * @return { Promise<
 * 'text'
 * | 'password'
 * | 'textarea'
 * | 'checkbox'
 * | 'select'
 * | 'mult-select'
 * | 'number'
 * > }
 * */
export function getScriptCatUserConfigType() {
	return select(
		new createSelectBoxConfig( '配置项类型: ', [
			new createSelectChoice( 'text', '文本框' ),
			new createSelectChoice( 'password', '密码框' ),
			new createSelectChoice( 'textarea', '多行文本框' ),
			new createSelectChoice( 'checkbox', '确认框' ),
			new createSelectChoice( 'select', '下拉单选框' ),
			new createSelectChoice( 'mult-select', '下拉多选框' ),
			new createSelectChoice( 'number', '数字输入框' ),
		] )
	);
}
