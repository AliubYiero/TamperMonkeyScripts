/**
 * checkScriptCatEnvironment.ts
 * created by 2024/3/13
 * @file 检查当前环境是否是 ScriptCat 环境
 * @author  Yiero
 * */

/**
 * 检查当前的环境是否是脚本猫环境
 * */
export const checkScriptCatEnvironment = () => {
	return GM_info.scriptHandler === 'Tampermonkey';
};
