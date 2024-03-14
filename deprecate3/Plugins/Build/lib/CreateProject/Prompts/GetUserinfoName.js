import { input } from '@inquirer/prompts'
import { createInputConfig } from './utils/CreateInputConfig.js'

/**
 * 输入: [脚本配置项信息] 获取项目的脚本名
 * @param { string } projectName
 * @return { Promise<string> }
 * */
function getUserinfoName( projectName ) {
	return input(
		new createInputConfig( '脚本的名称(@name): ', projectName )
	)
}

export { getUserinfoName }
