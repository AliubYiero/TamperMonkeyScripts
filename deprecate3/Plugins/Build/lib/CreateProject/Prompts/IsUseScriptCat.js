import { checkbox, select, Separator } from '@inquirer/prompts'
import { createJudgeBoxConfig } from './utils/CreateJudgeBoxConfig.js'
import { createSelectBoxConfig } from './utils/CreateSelectBoxConfig.js'
import { createCheckboxChoice } from './utils/CreateCheckboxChoice.js'

/**
 * 选项: [项目信息] 是否启用脚本猫配置
 * @return { Promise<false | Array<'useUserConfig' | 'useBackgroundScript' | 'useIntervalScript' | 'useCloudScript' | '' >> }
 * */
function isUseScriptCat() {
	return select(
		new createJudgeBoxConfig( '是否启用脚本猫: ', false )
	).then( res => {
		// 不启用脚本猫
		if ( !res ) {
			return false;
		}
		// 启用脚本猫
		return checkbox(
			new createSelectBoxConfig(
				'输入脚本猫配置: ', [
					new createCheckboxChoice( '使用用户配置', 'useUserConfig' ),
					new Separator( '    使用用户配置: 选择后, 同步声明 `GM_getValue` 函数.' ),
					
					new createCheckboxChoice( '启用后台脚本', 'useBackgroundScript' ),
					new createCheckboxChoice( '启用定时脚本', 'useIntervalScript' ),
					new createCheckboxChoice( '启用云端脚本', 'useCloudScript' ),
				]
			)
		)
	} ).then( res => {
		// 不启用脚本猫
		if ( !res ) {
			return false;
		}
		
		const config = {};
		if ( res.includes( 'useUserConfig' ) ) {
		
		}
		else if ( res.includes( 'useBackgroundScript' ) ) {
			config.background = '';
		}
		else if ( res.includes( 'useIntervalScript' ) ) {
		
		}
		else if ( res.includes( 'useCloudScript' ) ) {
			config.cloudCat = '';
		}
	} )
}

export { isUseScriptCat }
