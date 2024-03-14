import { select } from '@inquirer/prompts'
import { createSelectBoxConfig } from './utils/CreateSelectBoxConfig.js'
import { createSelectChoice } from './utils/CreateSelectChoice.js'

/**
 * 选项: [UserConfig配置项] 获取脚本猫使用的userConfig文件类型
 * @return { Promise<'yaml' | 'json'> }
 * */
function getUserConfigFileStyle() {
	return select(
		new createSelectBoxConfig( '项目使用 UserConfig 文件类型: ', [
			new createSelectChoice( 'yaml', 'yml', '使用 UserConfig.yml 储存用户脚本信息' ),
			new createSelectChoice( 'json', 'json', '使用 UserConfig.json 储存用户脚本信息' ),
		] )
	)
}

export { getUserConfigFileStyle }
