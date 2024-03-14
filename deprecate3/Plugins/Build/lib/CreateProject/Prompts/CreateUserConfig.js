import { createInputConfig } from './utils/CreateInputConfig.js'
import { input, select } from '@inquirer/prompts'
import { getScriptCatUserConfigType } from './GetScriptCatUserConfigType.js'
import { createSelectBoxConfig } from './utils/CreateSelectBoxConfig.js'
import { createSelectChoice } from './utils/CreateSelectChoice.js'
import { Print } from '../../../../Console/lib/Print.js'

/**
 * 创建配置项描述(说明)
 * @return { Promise<string> }
 * */
async function getUserConfigDescription() {
	return input(
		new createInputConfig( '配置项描述', '' )
	);
}

/**
 * 创建配置项名
 * @return { Promise<string> }
 * */
async function getUserConfigName() {
	return input(
		new createInputConfig( '配置项名', '' )
	);
}

/**
 * 默认值
 * @return { Promise<any> }
 * */
async function getUserConfigDefault() {
	return input(
		new createInputConfig( '默认值', '' )
	);
}

/**
 * 下一个配置项选择
 * @return { Promise<'config' | 'group' | false> }
 * */
function nextConfig() {
	return select(
		new createSelectBoxConfig( Print.yellow( '是否继续创建' ), [
			new createSelectChoice( '创建配置', 'config', '' ),
			new createSelectChoice( '创建分组', 'group', '' ),
			new createSelectChoice( '取消', false, '' ),
		] )
	);
}

/**
 * 选项: [UserConfig配置项] 创建Config配置项
 * @return { Promise< {
 * title: string,
 * description: string,
 * type: string,
 * default: any
 * } > }
 * */
async function createSingleUserConfig() {
	const userConfig = {};
	
	// 配置项名
	userConfig.title = await getUserConfigName();
	
	// 配置项描述
	userConfig.description = await getUserConfigDescription();
	
	// 配置项类型
	userConfig.type = await getScriptCatUserConfigType();
	if ( userConfig.type === 'password' ) {
		userConfig.type = 'text';
		userConfig.password = true;
	}
	
	// 默认值
	userConfig.default = await getUserConfigDefault();
	
	return userConfig;
}

/**
 * 创建分组
 * @return { Promise<string> }
 * */
async function createUserConfigGroup() {
	return input(
		new createInputConfig( '分组名', '' )
	);
}

/**
 * 创建配置项
 * @return {}
 * */
async function createUserConfig() {
	const userConfig = {};
	
	// 创建分组
	let groupName = await createUserConfigGroup();
	let group = {};
	
	// 创建配置
	group[`config${ new Date().getTime() }`] = await createSingleUserConfig();
	
	// 进行递归
	async function _next() {
		const done = await nextConfig();
		// 创建配置
		if ( done && done === 'config' ) {
			group[`config${ new Date().getTime() }`] = await createSingleUserConfig();
			
			// 继续递归
			await _next();
		}
		// 创建分组
		else if ( done && done === 'group' ) {
			// 将当前分组写入总配置项
			userConfig[groupName] = group;
			
			// 新建分组
			groupName = await createUserConfigGroup();
			group = {};
			
			// 继续递归
			await _next();
		}
	}
	
	await _next();
	
	return userConfig;
}

export { createUserConfig }
