/**
 * EntityInfo.js
 * created by 2023/8/20
 * @file 用户输入: 项目信息
 * @author  Yiero
 * */
import { getProjectName } from './Prompts/GetProjectName.js'
import { getProjectLanguage } from './Prompts/GetProjectLanguage.js'
import { getProjectDir } from './Prompts/GetProjectDir.js'
import { isCreateReadmeFile } from './Prompts/IsCreateReadmeFile.js'
import { isUseScriptCat } from './Prompts/IsUseScriptCat.js'

export {
	inputEntityInfo
}

/**
 * 让用户输入项目信息, 这些信息用于用于初始化构建一个项目
 * @return { Entity }
 * */
async function inputEntityInfo() {
	/**
	 * @typedef { {} } Entity
	 * @type { Entity }
	 * @property { string } projectName 项目名称
	 * @property { 'ts' | 'js' } projectLanguage 项目使用的语言
	 * @property { string } projectDir 项目的地址
	 * @property { boolean } isCreateREADMEFile 是否生成md文件
	 * @property { false | Array<'useUserConfig' | 'useBackgroundScript' | 'useIntervalScript' | 'useCloudScript' | '' > } isUseScriptCat 是否使用脚本猫
	 * */
	/**
	 * 用户输入的项目实体信息, 用于初始化构建一个项目
	 * @type { Entity }
	 * */
	const entity = {};
	
	// 项目名
	entity.projectName = await getProjectName();
	// 脚本使用的语言
	entity.projectLanguage = await getProjectLanguage();
	// 项目地址
	entity.projectDir = await getProjectDir( entity.projectName, entity.projectLanguage );
	// 生成md文件
	entity.isCreateREADMEFile = await isCreateReadmeFile();
	// 使用脚本猫配置
	entity.isUseScriptCat = await isUseScriptCat();
	
	return entity;
}
