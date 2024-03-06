/**
 * scriptInfoStringify.ts
 * created by 2024/3/5
 * @file 格式化用户脚本信息
 * @author  Yiero
 * */
import {
	ScriptInfoOptions,
} from '../../../config/interfaces/ScriptInfoOptions';

/**
 * 将脚本信息转换成字符串
 *
 * @param scriptInfo 脚本信息
 *
 * @tutorial https://www.tampermonkey.net/documentation.php?ext=dhdg
 * */
export const scriptInfoStringify = ( scriptInfo: ScriptInfoOptions ) => {
	/*
	* 删除额外的脚本配置信息
	* */
	delete scriptInfo.projectName;
	delete scriptInfo.outputFileName;
	
	const scriptInfoStringList: string[] = [];
	
	/*
	* 遍历 ScriptInfo 数组, 获取脚本配置项的信息, 输出成文本数组
	* */
	for ( let scriptInfoKey in scriptInfo ) {
		const scriptInfoValue = scriptInfo[ scriptInfoKey ];
		
		/*
		* 当脚本配置项的值是字符串时,
		* 直接添加到配置项中
		* */
		if (
			typeof scriptInfoValue === 'string'
		) {
			scriptInfoStringList.push( `// @${ scriptInfoKey }\t${ scriptInfoValue }` );
			continue;
		}
		
		/*
		* 当脚本配置项是值是数组, 但是是空数组时,
		* 退出循环
		* */
		if (
			Array.isArray( scriptInfoValue )
			&& !scriptInfoValue.length
		) {
			continue;
		}
		
		/*
		* 当脚本配置项是值是数组, 并且是字符串数组时,
		* 遍历字符串数组并依次添加到配置项中
		*
		* 例如 `match`, `grant`, `require`等
		* */
		if (
			Array.isArray( scriptInfoValue )
			&& scriptInfoValue.every( item => typeof item === 'string' )
		) {
			scriptInfoValue.forEach( item => {
				scriptInfoStringList.push( `// @${ scriptInfoKey }\t${ item }` );
			} );
			continue;
		}
		
		/*
		* 当脚本配置项是值是数组, 并且是元组数组时,
		* 遍历数组, 将元组转换成字符串并依次添加到配置项中
		*
		* 例如 `resource`, `antifeature`等
		* */
		if (
			Array.isArray( scriptInfoValue )
			&& scriptInfoValue.every( item => Array.isArray( item ) )
		) {
			scriptInfoValue.forEach( item => {
				scriptInfoStringList.push( `// @${ scriptInfoKey }\t${ item.join( '\t' ) }` );
			} );
			continue;
		}
	}
	
	/*
	* 添加配置头和配置尾
	* */
	scriptInfoStringList.unshift( '// ==UserScript==' );
	scriptInfoStringList.push( '// ==/UserScript==' );
	
	/*
	* 返回配置项文本
	* */
	return scriptInfoStringList.join( '\n' );
};
