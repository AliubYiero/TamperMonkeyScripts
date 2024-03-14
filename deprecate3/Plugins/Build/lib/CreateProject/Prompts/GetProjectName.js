import { input } from '@inquirer/prompts'
import { createInputConfig } from './utils/CreateInputConfig.js'

/**
 * 输入: [项目信息] 获取项目名
 * @return { Promise<string> }
 * */
function getProjectName() {
	return input(
		new createInputConfig( '项目名: ' ),
	);
}

export { getProjectName }
