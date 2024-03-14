import { select } from '@inquirer/prompts'
import { createSelectBoxConfig } from './utils/CreateSelectBoxConfig.js'
import { createSelectChoice } from './utils/CreateSelectChoice.js'

/**
 * 选项: [脚本配置项信息] 获取项目的运行时机
 * @return { Promise< 'document-start' | 'document-body' | 'document-end' | 'document-idle' | 'context-menu' > }
 * */
function getUserinfoRunAtTime() {
	return select(
		new createSelectBoxConfig( '选择项目的运行时机(@run-at): ', [
			new createSelectChoice( 'document-idle', '[默认运行时机] 所有内容(DOM, 页面脚本, 图像等资源)加载完成后注入脚本. ' ),
			new createSelectChoice( 'document-start', '以最快速度注入脚本. ' ),
			new createSelectChoice( 'document-body', '在body元素创建之后注入脚本' ),
			new createSelectChoice( 'document-end', 'DOM加载完成后注入脚本, 此时页面脚本和图像等资源可能仍在加载. ' ),
			new createSelectChoice( 'context-menu', '点击上下文菜单(右键菜单)中的TamperMonkey中的选项时运行脚本, 只适用于chromium核心的浏览器. ' ),
		] )
	)
}

export { getUserinfoRunAtTime }
