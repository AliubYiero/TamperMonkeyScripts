/**
 * BuildFiles.js
 * created by 2023/8/8
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { exec } from 'child_process'

export {
	useCommand
}

/**
 * 使用node指令
 * @param {string} buildCommand node指令
 * @return { Promise<{outputString: string, outputErrorString: string}, string>} }
 * */
function useCommand( buildCommand ) {
	return new Promise( ( resolve, rejects ) => {
		exec( buildCommand, ( error, stdout, stderr ) => {
			// 返回错误信息
			if ( error ) {
				rejects( error );
			}
			
			// 未定义文本转化成空字符串
			const outputString = stdout || '';
			const outputErrorString = stderr || '';
			
			// 返回
			resolve( { outputString, outputErrorString } );
		} );
	} )
}
