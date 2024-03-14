import { checkbox, Separator } from '@inquirer/prompts'
import { createSelectBoxConfig } from './utils/CreateSelectBoxConfig.js'
import { createCheckboxChoice } from './utils/CreateCheckboxChoice.js'

/**
 * 选项: [脚本猫脚本配置项信息] 获取项目的脚本猫函数声明
 * @return { Promise<string[]> }
 * */
function getScriptCatUserinfoGrantFunction() {
	return checkbox(
		new createSelectBoxConfig( '选择使用的脚本猫函数声明(@grant): ', [
			new createCheckboxChoice( 'GM_addElement' ),
			new createCheckboxChoice( 'GM_addStyle' ),
			new createCheckboxChoice( 'GM_getResourceText' ),
			new createCheckboxChoice( 'GM_getResourceURL' ),
			new Separator(),
			
			new createCheckboxChoice( 'GM_registerMenuCommand' ),
			new createCheckboxChoice( 'GM_unregisterMenuCommand' ),
			new Separator(),
			
			new createCheckboxChoice( 'GM_info' ),
			new createCheckboxChoice( 'GM_log' ),
			new createCheckboxChoice( 'GM_notification' ),
			new createCheckboxChoice( 'GM_closeNotification' ),
			new createCheckboxChoice( 'GM_updateNotification' ),
			new Separator(),
			
			new createCheckboxChoice( 'GM_setClipboard' ),
			new Separator(),
			
			new createCheckboxChoice( 'GM_getTab' ),
			new createCheckboxChoice( 'GM_saveTab' ),
			new createCheckboxChoice( 'GM_getTabs' ),
			new Separator(),
			
			new createCheckboxChoice( 'GM_setValue' ),
			new createCheckboxChoice( 'GM_getValue' ),
			new createCheckboxChoice( 'GM_deleteValue' ),
			new createCheckboxChoice( 'GM_listValues' ),
			new Separator(),
			
			new createCheckboxChoice( 'GM_addValueChangeListener' ),
			new createCheckboxChoice( 'GM_removeValueChangeListener' ),
			new Separator(),
			
			new createCheckboxChoice( 'GM_openInTab' ),
			new createCheckboxChoice( 'GM_download' ),
			new createCheckboxChoice( 'GM_xmlhttpRequest' ),
			new Separator(),
			
			new createCheckboxChoice( 'GM_cookie' ),
			new Separator(),
			
			new createCheckboxChoice( 'CAT_userConfig' ),
			new Separator( '选择后会同步声明 `GM_getValue`. ' ),
			new Separator(),
			
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

export { getScriptCatUserinfoGrantFunction }
