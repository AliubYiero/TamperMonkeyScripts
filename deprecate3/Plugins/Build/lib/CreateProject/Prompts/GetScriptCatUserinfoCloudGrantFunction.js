import { checkbox, Separator } from '@inquirer/prompts'
import { createSelectBoxConfig } from './utils/CreateSelectBoxConfig.js'
import { createCheckboxChoice } from './utils/CreateCheckboxChoice.js'

/**
 * 选项: [脚本猫脚本配置项信息] 获取项目的脚本猫函数声明(云端脚本专用)
 * @return { Promise<string[]> }
 * */
function getScriptCatUserinfoCloudGrantFunction() {
	return checkbox(
		new createSelectBoxConfig( '选择使用的脚本猫函数声明(@grant): ', [
			new createCheckboxChoice( 'GM_getValue' ),
			new Separator(),
			
			new createCheckboxChoice( 'GM_xmlhttpRequest' ),
			new Separator(),
			
			new createCheckboxChoice( 'GM_notification' ),
			new createCheckboxChoice( 'GM_log' ),
			new Separator(),
			
			new createCheckboxChoice( 'CAT_userConfig' ),
			new createCheckboxChoice( 'CAT_fileStorage' ),
			new Separator(),
		] )
	).then( ( ( res ) => {
		/* 如果选择`CAT_userConfig`, 同步添加GM_getValue声明 */
		if ( res.includes( 'CAT_userConfig' && !res.includes( 'GM_getValue' ) ) ) {
			res.push( 'GM_getValue' );
		}
		
		return res;
	} ) )
}

export { getScriptCatUserinfoCloudGrantFunction }
