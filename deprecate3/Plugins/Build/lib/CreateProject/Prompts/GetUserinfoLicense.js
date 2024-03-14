import { input } from '@inquirer/prompts'
import { createInputConfig } from './utils/CreateInputConfig.js'

/**
 * 输入: [脚本配置项信息] 获取项目的命名空间
 * @param { string } license
 * @return { Promise<string> }
 * */
function getUserinfoLicense( license ) {
	return input(
		new createInputConfig( '版权声明(@license): ', license )
	)
}

export { getUserinfoLicense }
