import { input } from '@inquirer/prompts'
import { createInputConfig } from './utils/CreateInputConfig.js'

/**
 * 输入: [脚本配置项信息] 获取项目的命名空间
 * @param { string } namespace
 * @return { Promise<string> }
 * */
function getUserinfoNamespace( namespace ) {
	return input(
		new createInputConfig( '命名空间(@namespace): ', namespace )
	)
}

export { getUserinfoNamespace }
