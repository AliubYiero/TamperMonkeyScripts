import { input } from '@inquirer/prompts'
import { createInputConfig } from './utils/CreateInputConfig.js'

/**
 * 输入: [脚本配置项信息] 获取项目的脚本作者名
 * @param { string } author
 * @return { Promise<string> }
 * */
function getUserinfoAuthor( author ) {
	return input(
		new createInputConfig( '作者(@author): ', author )
	)
}

export { getUserinfoAuthor }
