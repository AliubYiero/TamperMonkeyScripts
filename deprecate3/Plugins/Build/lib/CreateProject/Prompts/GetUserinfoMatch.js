import { input, select } from '@inquirer/prompts'
import { createInputConfig } from './utils/CreateInputConfig.js'
import { createJudgeBoxConfig } from './utils/CreateJudgeBoxConfig.js'
import { Print } from '../../../../Console/lib/Print.js'

/**
 * 输入: [脚本配置项信息] 获取项目的脚本作用域
 * @return { Promise<string[]> }
 * */
async function getUserinfoMatch() {
	const matchList = new Set();
	
	async function inputMatch() {
		matchList.add( await input(
			new createInputConfig( `作用网站#${ matchList.size + 1 }(@match): `, 'https://*/*' )
		).then( ( match ) => {
			/* 验证脚本作用是否存在http/https协议 */
			// 不存在则补全https协议
			if ( !match.match( /^https?:\/\// ) ) {
				return match.replace( '', 'https://' );
			}
			// 存在则返回原输入
			return match;
		} ) );
		
		// 输入是否继续填写
		( await select(
			new createJudgeBoxConfig(
				Print.yellow( '是否继续输入脚本作用网站(@match)' ),
				false
			)
		) )
		// 继续填写, 进行递归
		&& ( await inputMatch() );
		
	}
	
	await inputMatch();
	return Array.from( matchList );
}

export { getUserinfoMatch }
