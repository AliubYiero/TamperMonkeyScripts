import {
	GlobalScriptsConfigInterface,
} from '../../config/interfaces/GlobalScriptsConfigInterface';
import {
	defaultScriptsConfigs,
} from '../config/defaultScriptsConfigs';
import { BuildConfigs } from '../../config/BuildConfigs';
import { resolve } from 'path';
import {
	ScriptInfoOptions,
} from '../../config/interfaces/ScriptInfoOptions';
import * as fs from 'fs';
import { warn } from '../utils/console';

export function parseScriptInfoOptions(
	globalScriptsConfigs: GlobalScriptsConfigInterface,
	isProduction: boolean,
): ScriptInfoOptions {
	/*
	* 过滤 globalScriptsConfigs 中的空元素
	* */
	Object.keys( globalScriptsConfigs ).forEach( key => {
		if (
			// 过滤空字符串
			globalScriptsConfigs[ key ] === ''
			// 过滤空数组
			|| ( Array.isArray( globalScriptsConfigs[ key ] ) && !globalScriptsConfigs[ key ].length )
		) {
			delete globalScriptsConfigs[ key ];
		}
	} );
	
	/*
	* 默认值赋予
	* */
	const scriptInfoOptions: ScriptInfoOptions = {
		outputFileName: 'index.dev.js',
		...defaultScriptsConfigs,
		...globalScriptsConfigs,
	};
	
	/*
	* 检查是否填入必填项 (脚本名, 脚本简介, 脚本作用域)
	* */
	if (
		!scriptInfoOptions.name
		|| !scriptInfoOptions.description
		|| ( scriptInfoOptions.match && !scriptInfoOptions.match.length )
	) {
		throw new TypeError(
			'脚本配置缺少必填项 (name, description or match).\n' +
			// 替换 '\\' 为 '/', 让终端能够识别本地文件地址
			`请在 [file:///${ resolve( __dirname, '../../config/GlobalScriptsConfigs.ts' ).replace( /\\/g, '/' ) } ] 中补充必要元素.`,
		);
	}
	
	/*
	* 检查 name 是否与 description 相同,
	* 如果相同则在 description 后面添加 `.`
	* */
	if ( scriptInfoOptions.name === scriptInfoOptions.description ) {
		scriptInfoOptions.description += '.';
	}
	
	/*
	* 查看是否具有项目名, 否则项目名默认使用脚本名
	* */
	scriptInfoOptions.projectName ||= scriptInfoOptions.name;
	
	/*
	* 查看输出的项目名
	* */
	scriptInfoOptions.outputFileName = isProduction
		? `${ scriptInfoOptions.projectName }.user.js`
		: `${ scriptInfoOptions.projectName }.dev.js`;
	
	/*
	* 检查生产环境中是否版本号冲突
	* */
	// 生产环境, 版本号冲突检测开启并且打包文件存在时, 检查版本号是否相同
	if (
		isProduction
		&& BuildConfigs.productionCheckVersion
		&& fs.existsSync( resolve( 'dist', scriptInfoOptions.outputFileName ) )
	) {
		const handleFileString = fs.readFileSync( resolve( 'dist', scriptInfoOptions.outputFileName ), {
			encoding: 'utf-8',
			flag: 'rs',
		} );
		
		// 截取文件, 因为只需要读取文件头的脚本配置信息
		const fileLineList = handleFileString.slice( 0, 1024 ).split( '\n' );
		
		// 找到版本对应的行
		const versionLine = fileLineList.find( item => item.startsWith( '// @version' ) ) as string;
		
		// 抓取版本号
		const matchVersionLine = versionLine.match( /\/\/\s+@version\s+(.*)/ );
		
		// 比较版本号是否与当前版本号相同, 如果相同则报错
		if ( matchVersionLine && matchVersionLine[ 1 ] === scriptInfoOptions.version ) {
			throw new TypeError( `版本号冲突: ${ matchVersionLine[ 1 ] }` );
		}
	}
	
	/*
	* 警告: BuildConfigs.productionCheckVersion 未开启
	* */
	if ( !BuildConfigs.productionCheckVersion && isProduction ) {
		warn( '警告: BuildConfigs.productionCheckVersion 已关闭.' );
	}
	
	/*
	* 添加默认icon
	* */
	// 获取 match 中的具体域名
	const url = scriptInfoOptions.match.find( item => {
		let url: URL;
		
		try {
			url = new URL( item );
		} catch ( e ) {
			return false;
		}
		
		return !( url.origin.endsWith( '%2A' ) || url.origin.endsWith( '*' ) );
	} );
	
	// 如果获取到具体域名, 则返回该域名的 favicon.ico
	if ( !scriptInfoOptions.icon && url ) {
		scriptInfoOptions.icon = new URL( url ).origin + '/favicon.ico';
	}
	// 如果没有获取到具体域名, 则返回默认的 favicon.ico (https://tampermonkey.net/favicon.ico)
	else if ( !scriptInfoOptions.icon && !url ) {
		scriptInfoOptions.icon = 'https://tampermonkey.net/favicon.ico';
	}
	
	/*
	* 查看是否需要添加后缀
	* */
	if ( BuildConfigs.devVersionSuffix && !isProduction ) {
		scriptInfoOptions.version += '-beta';
	}
	
	
	/*
	* 查看是否需要添加自我引用
	* */
	if ( BuildConfigs.devSelfLink && !isProduction ) {
		warn( '[BuildConfigs.devSelfLink] 自我引用已开启' );
		scriptInfoOptions.require ||= [];
		scriptInfoOptions.require.unshift( `file://${ resolve( 'dist', scriptInfoOptions.outputFileName ) }` );
	}
	
	/*
	* 返回修改后的脚本配置
	* */
	return scriptInfoOptions;
}
