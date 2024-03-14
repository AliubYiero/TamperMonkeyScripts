import { checkbox, Separator } from '@inquirer/prompts'
import { createSelectBoxConfig } from './utils/CreateSelectBoxConfig.js'
import { createCheckboxChoice } from './utils/CreateCheckboxChoice.js'

/**
 * 选项: [脚本配置项信息] 获取项目的油猴函数声明
 * @return { Promise<string[]> }
 * */
function getUserinfoGrantFunction() {
	return checkbox(
		new createSelectBoxConfig( '选择使用的油猴函数声明: ', [
			new createCheckboxChoice( 'GM_addStyle' ),
			new createCheckboxChoice( 'GM_addElement' ),
			new createCheckboxChoice( 'GM_getResourceText' ),
			new createCheckboxChoice( 'GM_getResourceURL' ),
			new Separator(),
			
			new createCheckboxChoice( 'GM_registerMenuCommand' ),
			new createCheckboxChoice( 'GM_unregisterMenuCommand' ),
			new Separator(),
			
			new createCheckboxChoice( 'GM_info' ),
			new createCheckboxChoice( 'GM_log' ),
			new createCheckboxChoice( 'GM_notification' ),
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
			new createCheckboxChoice( 'GM_webRequest' ),
			new Separator(),
			
			new createCheckboxChoice( 'GM_cookie' ),
			new Separator(),
			
			new createCheckboxChoice( 'window.onurlchange' ),
			new createCheckboxChoice( 'window.close' ),
			new createCheckboxChoice( 'window.focus' ),
			new Separator(),
		] )
	)
}

export { getUserinfoGrantFunction }
