import { input } from '@inquirer/prompts'
import { createInputConfig } from './utils/CreateInputConfig.js'

/**
 * 输入: [脚本配置项信息] 获取项目的脚本图标
 * @param { string[] } match
 * @return { Promise<string> }
 * */
function getUserinfoIcon( match ) {
	return input(
		new createInputConfig(
			'图标(@icon) (默认输入的第一个match的图标): ',
			match[0] !== 'https://*/*'
				? match[0].replace( /^(https?:\/\/[^/]*).*/, '$1/favicon.ico' )
				: 'https://www.tampermonkey.net/favicon.ico'
		)
	)
}

export { getUserinfoIcon }
