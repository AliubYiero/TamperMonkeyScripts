import { select } from '@inquirer/prompts'
import { createSelectBoxConfig } from './utils/CreateSelectBoxConfig.js'
import { createSelectChoice } from './utils/CreateSelectChoice.js'

/**
 * 输入: [项目信息] 获取项目使用语言
 * @return { Promise<'ts' | 'js'> }
 * */
function getProjectLanguage() {
	return select(
		new createSelectBoxConfig( '语言: ', [
			new createSelectChoice( 'TypeScript', 'ts', '使用TypeScript作为项目的语言 (创建index.ts文件)' ),
			new createSelectChoice( 'JavaScript', 'js', '使用JavaScript作为项目的语言 (创建index.js文件)' ),
		] )
	);
}

export { getProjectLanguage }
