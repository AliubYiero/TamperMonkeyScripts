import { join, resolve } from 'path'
import { Print } from '../../../../Console/lib/Print.js'
import { input } from '@inquirer/prompts'
import { createInputConfig } from './utils/CreateInputConfig.js'

/**
 * 输入: [项目信息] 获取项目地址
 * @param { string } projectName
 * @param { 'ts' | 'js' } projectLanguage
 * @return { Promise<string> }
 * */
function getProjectDir( projectName, projectLanguage ) {
	/**
	 *
	 * @param {string} content
	 * @return {string}
	 * */
	function concatContent( content ) {
		return `\\${ content }${ content && '\\' }`
	}
	
	/*
	* 检查是否通过npm命令运行
	* 如果不使用npm命令, 会不在根目录下的src目录下创建项目.
	*  */
	if ( resolve( 'src' ).match( /Plugins\\Build\\command/ ) ) {
		console.error( Print.cyan( '请通过npm命令新建一个项目, 禁止直接运行指令文件. ' ) );
		throw new Error( 'Please use npm command to create a new project. ' );
	}
	
	return input(
		new createInputConfig( '项目的路径: ',
			'',
			( value ) => {
				const prefix = Print.red( resolve( 'src' ) );
				const suffix = Print.white( join( projectName, `index.${ projectLanguage }` ) );
				
				return `${ prefix }${ Print.cyan( concatContent( value ) ) }${ suffix }`
			} ),
	).then( ( res ) => {
		/* 为项目补全前缀, 变成绝对路径 */
		return `${ resolve( 'src' ) }${ concatContent( res ) }`;
	} );
}

export { getProjectDir }
