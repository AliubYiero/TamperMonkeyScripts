/**
 * defaultScriptsConfigs.ts
 * created by 2024/3/5
 *
 * @file
 * 默认的脚本配置配置信息,
 * 如未填写 ScriptInfoConfigs 的配置项, 则默认使用本文件中的配置,
 * 本文件的配置的优先级是最低的, 修改配置直接改 ScriptInfoConfigs 的配置,
 * 不需要动本文件中的信息
 *
 * @author  Yiero
 * */
import {
	GlobalScriptsConfigInterface,
} from '../../config/interfaces/GlobalScriptsConfigInterface';

export const defaultScriptsConfigs: Partial<GlobalScriptsConfigInterface> = {
	/* 默认版本号 */
	version: '0.0.1',
	/* 默认许可证 */
	license: 'MIT',
	/* 默认命名空间 */
	namespace: 'https://www.tampermonkey.net',
	/* 默认脚本加载时机 */
	'run-at': 'document-idle',
};
