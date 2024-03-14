import { input } from '@inquirer/prompts'
import { createInputConfig } from './utils/CreateInputConfig.js'

/**
 * 输入: [脚本配置项信息] 获取项目的脚本描述
 * @return { Promise<string> }
 * */
function getUserinfoDescription( name ) {
	return input(
		new createInputConfig( '脚本的简介(@description): ', name || '请简单描述你的脚本' )
	)
}

export { getUserinfoDescription }
