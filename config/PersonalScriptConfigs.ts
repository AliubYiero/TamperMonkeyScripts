/**
 * PersonalScriptConfigs.ts
 * created by 2024/3/6
 * @file 脚本的个人信息配置项
 * @author  Yiero
 * */
import { GlobalScriptsConfigInterface } from './interfaces';

/**
 * 用户脚本顶部的 ==UserScript== 配置项,
 * 放置脚本的个人信息 (如作者名, 许可证, 脚本命名空间等...)
 *
 * 优先级第二
 * */
export const PersonalScriptConfigs: Partial<GlobalScriptsConfigInterface> = {
	/* 作者名 */
	author: 'Yiero',
	/* 脚本的开源许可证 */
	license: 'GPL-3',
	/* 脚本的命名空间 */
	namespace: 'https://github.com/AliubYiero/TamperMonkeyScripts',
	/* 作者主页 */
	homepage: 'https://github.com/AliubYiero/TamperMonkeyScripts',
};
