import { select } from '@inquirer/prompts'
import { createSelectBoxConfig } from './utils/CreateSelectBoxConfig.js'
import { createSelectChoice } from './utils/CreateSelectChoice.js'

/**
 * 选项: [项目信息] 获取项目使用的userinfo文件类型
 * @return { Promise<'yaml' | 'json'> }
 * */
function getUserinfoFileStyle() {
	return select(
		new createSelectBoxConfig( '项目使用的userinfo文件类型: ', [
			new createSelectChoice( 'yaml', 'yml', '使用userinfo.yml储存用户脚本信息' ),
			new createSelectChoice( 'json', 'json', '使用userinfo.json储存用户脚本信息' ),
		] )
	)
}

export { getUserinfoFileStyle }
