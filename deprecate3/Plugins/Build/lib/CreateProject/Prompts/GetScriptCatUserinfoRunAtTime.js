import { select } from '@inquirer/prompts'
import { createSelectBoxConfig } from './utils/CreateSelectBoxConfig.js'
import { createSelectChoice } from './utils/CreateSelectChoice.js'

/**
 * 选项: [脚本猫脚本配置项信息] 获取项目的运行时机
 * @return { Promise< 'document-start' | 'document-body' | 'document-end' | 'document-idle' > }
 * */
function getScriptCatUserinfoRunAtTime() {
	return select(
		new createSelectBoxConfig( '选择项目的运行时机(@run-at): ', [
			new createSelectChoice( 'document-idle', void 0, '[默认运行时机] 在DOMContentLoaded事件完成之后注入脚本. ' ),
			new createSelectChoice( 'document-start', void 0, '以最快速度注入脚本. ' ),
			new createSelectChoice( 'document-body', void 0, '在body元素创建之后注入脚本' ),
			new createSelectChoice( 'document-end', void 0, '在DOMContentLoaded事件触发之后注入脚本. 可能在DOMContentLoaded事件进行时注入, 可以能DOMContentLoaded事件完成后注入. ' ),
		] )
	)
}

export { getScriptCatUserinfoRunAtTime }
