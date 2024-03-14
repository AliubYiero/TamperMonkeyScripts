import { select } from '@inquirer/prompts'
import { createJudgeBoxConfig } from './utils/CreateJudgeBoxConfig.js'

/**
 * 选项: [项目信息] 是否生成readme.md文件
 * @return { Promise<boolean> }
 * */
function isCreateReadmeFile() {
	return select(
		new createJudgeBoxConfig( '是否生成README.md文件' )
	);
}

export { isCreateReadmeFile }
