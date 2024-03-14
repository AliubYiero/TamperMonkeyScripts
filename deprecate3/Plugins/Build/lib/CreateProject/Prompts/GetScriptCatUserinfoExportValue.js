import { input } from '@inquirer/prompts'
import { createInputConfig } from './utils/CreateInputConfig.js'

/**
 * 输入: [云端脚本配置项信息] 获取项目要导出到云端的Value
 * @return { Promise<string> }
 * */
function getScriptCatUserinfoExportValue() {
	return input(
		new createInputConfig( '导出到云端的value(@exportValue): ' )
	).then(
		// 删除空格
		( content ) => content.split( ',' ).map( number => number.trim() ).join( ',' )
	)
}

export { getScriptCatUserinfoExportValue }
