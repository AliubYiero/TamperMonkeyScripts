import { input } from '@inquirer/prompts'
import { createInputConfig } from './utils/CreateInputConfig.js'

/**
 * 输入: [云端脚本配置项信息] 获取项目要导出到云端的cookie
 * @return { Promise<string> }
 * */
function getScriptCatUserinfoExportCookie() {
	return input(
		new createInputConfig( '导出到云端的cookie(@exportCookie): ' )
	)
}

export { getScriptCatUserinfoExportCookie }
