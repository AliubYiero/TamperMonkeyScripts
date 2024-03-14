/**
 * Test.js
 * created by 2023/8/8
 * @file 测试指令
 * @author  Yiero
 * */

import { useCommand } from '../lib/BuildFiles.js'
import { Print } from '../../Console/lib/Print.js'

/* 清空时间戳 */
let buildCommand = 'node ./ClearTimestamp.js';
useCommand( buildCommand ).then( ( res ) => {
	const ClearTimestampOutputString = res.outputString;
	const ClearTimestampOutputErrorString = res.outputErrorString;
	console.log( ClearTimestampOutputErrorString );
	console.log( ClearTimestampOutputString );
} ).catch(
	( error ) => {
		console.error( Print.red( error ) );
	}
)

/* 打包文件(Build) */
buildCommand = 'npm run Build';
useCommand( buildCommand ).then( ( res ) => {
	const BuildOutputString = res.outputString;
	const BuildOutputErrorString = res.outputErrorString;
	
	console.log( BuildOutputErrorString );
	console.log( BuildOutputString );
} ).catch(
	( error ) => {
		console.error( Print.cyan( error ) );
	}
)
