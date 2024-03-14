/**
 * CreateProject.js
 * created by 2023/8/8
 * @file 创建一个TamperMonkey项目
 * @author  Yiero
 * */
import { Print } from '../../Console/lib/Print.js';
import { inputEntityInfo } from '../lib/CreateProject/EntityInfo.js'
import { inputUserinfo } from '../lib/CreateProject/UserInfo.js'
import { createProject } from '../lib/CreateProject/CreateProject.js'

import { createUserConfig } from '../lib/CreateProject/Prompts/CreateUserConfig.js'

/*-------------------------------------------------------------*/
/**
 * 输入脚本猫用户配置项
 * */
async function inputUserConfig() {
	return await createUserConfig();
}

/* 主函数 */
( async function main() {
	/* 提示开始构建 */
	console.clear();
	console.log( Print.cyan( '开始创建项目: ' ) );
	
	/** 获取用户输入 - 项目信息 */
	const entity = await inputEntityInfo();
	
	/* 清空终端, 输入项目的用户配置信息 */
	console.clear();
	
	/** 获取用户输入 - 用户配置 */
	console.log( Print.cyan( '输入脚本的基础配置信息: ' ) )
	
	const userinfo = await inputUserinfo( entity );
	
	/* 如果启用用户配置项 */
	const userConfig = entity.isUseScriptCat && entity.isUseScriptCat.includes( 'useUserConfig' )
		? await inputUserConfig()
		: void 0;
	
	/* 创建项目文件 */
	await createProject( entity, userinfo, userConfig );
	
	/* 提示文件创建成功 */
	console.clear();
	const projectDir = ( `file:///${ entity.projectDir }${ entity.projectName }/` )
		.replace( /\\/g, '/' );
	console.log( Print.cyan( `[Info] 项目文件创建成功: [ ${ projectDir } ]` ) );
} )();
