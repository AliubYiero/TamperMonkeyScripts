/**
 * Read.js
 * created by 2023/7/15
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import fsExtra from 'fs-extra';
import { join, relative, resolve } from 'path'

export {
	readFileContent,
	readJson,
	readAllFromDir,
	readDirFromDir,
	readFileFromDir,
	readDirInDir,
	readFileInDir,
	readAllInDir
}

/**
 * 读取文件, 返回文件文本
 * @param {string} filePath 文件路径
 * @return {string} 文件文本
 * */
const readFileContent = ( filePath ) => {
	return fsExtra.readFileSync( filePath, { encoding: 'UTF-8' } )
}

/**
 * 读取Json文件, 返回对象
 * @param {string} jsonFilePath Json文件路径
 * @return {Object}
 * */
const readJson = ( jsonFilePath ) => {
	if ( !jsonFilePath.match( /json$/ ) ) {
		jsonFilePath += '.json';
	}
	return fsExtra.readJSONSync( jsonFilePath );
}
/**
 * 读取给定目录下的目录的绝对/相对路径
 * @param {string} dirPath 文件路径
 * @param {string | boolean} [relativePathBase] 相对路径根
 * @return {string[]} 包含目录绝对/相对路径的数组
 * */
const readDirFromDir = ( dirPath, relativePathBase ) => {
	const directions = [];
	
	// 读取目录下的所有文件和目录
	const files = fsExtra.readdirSync( dirPath );
	
	// 判断是否为目录
	files.forEach( file => {
		// 补充文件路径
		const filePath = join( dirPath, file );
		
		// 判断是否为目录
		if ( fsExtra.statSync( filePath ).isDirectory() ) {
			// 判断是否输出相对路径，否则输出绝对路径
			let filePath = resolve( dirPath, file );
			if ( relativePathBase === true ) {
				filePath = relative( dirPath, filePath );
			}
			else if ( typeof relativePathBase === 'string' ) {
				filePath = relative( relativePathBase, filePath );
			}
			directions.push( filePath );
		}
	} )
	return directions
}
// console.log( 'readDirFromDir', readDirFromDir( '../' ) );
// console.log( 'readDirFromDirRelative', readDirFromDir( '../', true ) );

// opendir测试
// fsExtra.opendir( 'D:\\Code\\tampermonkey-demo\\Plugins\\Fs' ).then(
// 	res => {
// 		console.log( res );
// 	}
// )

/**
 * 读取给定目录下的文件的绝对/相对路径
 * @param {string} dirPath 文件路径
 * @param {string | boolean} [relativePathBase] 相对路径根
 * @return {string[]} 包含文件绝对/相对路径的数组
 * */
const readFileFromDir = ( dirPath, relativePathBase ) => {
	const files = [];
	
	// 读取目录下的所有文件和目录
	const fileList = fsExtra.readdirSync( dirPath );
	
	// 判断是否为目录
	fileList.forEach( file => {
		// 补充文件路径
		const filePath = join( dirPath, file );
		
		// 判断是否为目录
		if ( fsExtra.statSync( filePath ).isFile() ) {
			// 判断是否输出相对路径，否则输出绝对路径
			let filePath = resolve( dirPath, file );
			if ( relativePathBase === true ) {
				filePath = relative( dirPath, filePath );
			}
			else if ( typeof relativePathBase === 'string' ) {
				filePath = relative( relativePathBase, filePath );
			}
			files.push( filePath );
		}
	} )
	return files
}
// console.log( 'readFileFromDir', readFileFromDir( 'D:\\Code\\TamperMoneyScripts-vite\\lib\\Self\\BilibiliShortLiveRecord' ) );
// console.log( 'readFileFromDirRelative', readFileFromDir( 'D:\\Code\\TamperMoneyScripts-vite\\lib\\Self\\BilibiliShortLiveRecord', true ) );

/**
 * 读取给定目录下的所有文件和目录的绝对路径
 * @param {string} dirPath 文件路径
 * @param {string | boolean} [relativePathBase] 相对路径根
 * @return {{dirs: string[], files: string[]}} 包含文件和目录绝对/相对路径的对象
 * */
const readAllFromDir = ( dirPath, relativePathBase ) => {
	const dirs = [ ...readDirFromDir( dirPath, relativePathBase ) ];
	const files = [ ...readFileFromDir( dirPath, relativePathBase ) ];
	return { dirs, files }
}
// console.log( 'readAllFromDir', readAllFromDir( '../' ) );
// console.log( 'readAllFromDirRelative', readAllFromDir( '../', true ) );

/**
 * 读取目录（包括子目录）下所有的文件的绝对/相对路径
 * @param {string} dirPath 文件路径
 * @param {string | boolean} [relativePathBase] 相对路径根
 * @return {string[]} 包含所有文件绝对/相对路径的数组
 * */
const readDirInDir = ( dirPath, relativePathBase ) => {
	// 读取到的目录表
	const dirs = [];
	// 等待读取的目录表
	const toReadDirs = [ dirPath ];
	
	// 读取目录表
	while ( toReadDirs[0] ) {
		// 获取当前遍历到的目录
		const dir = toReadDirs.shift();
		
		// 写入当前目录的子目录到等待读取目录表中
		toReadDirs.push( ...readDirFromDir( dir ) )
		
		// 判断是否输出相对路径
		let thisDirPath = dir;
		if ( relativePathBase === true ) {
			thisDirPath = relative( dirPath, dir );
		}
		else if ( typeof relativePathBase === 'string' ) {
			thisDirPath = relative( relativePathBase, dir );
		}
		
		// 判断是否为相对路径 `dirPath`
		if ( dir === dirPath ) {
			continue;
		}
		
		dirs.push( thisDirPath );
	}
	
	return dirs
}
// console.log( 'readDirInDir', readDirInDir( '../../' ) );
// console.log( 'readDirInDirRelative', readDirInDir( '../../', true ) );
// console.log( 'readDirInDirRelative', readDirInDir( '../../', '../../' ) );

/**
 * 读取目录（包括子目录）下所有的目录的绝对/相对路径
 * @param {string} dirPath 文件路径
 * @param {string | boolean} [relativePathBase] 相对路径根
 * @return {string[]} 包含所有目录绝对/相对路径的数组
 * */
const readFileInDir = ( dirPath, relativePathBase ) => {
	// 文件表
	const files = [];
	// 读取所有目录
	const dirs = [ dirPath, ...readDirInDir( dirPath ) ];
	
	// 从目录中读取文件
	while ( dirs[0] ) {
		// 抽取目录
		const dir = dirs.shift();
		
		// 写入数组
		if ( relativePathBase ) {
			files.push( ...readFileFromDir( dir, resolve( dirPath ) ) )
		}
		else {
			files.push( ...readFileFromDir( dir ) )
		}
		
	}
	
	return files;
}
// console.log( 'readFileInDir', readFileInDir( 'D:\\Code\\TamperMoneyScripts-vite\\lib\\Self\\BilibiliShortLiveRecord' ) );
// console.log( 'readFileInDirRelative', readFileInDir( 'D:\\Code\\TamperMoneyScripts-vite\\lib\\Self\\BilibiliShortLiveRecord', true ) );
// console.log( 'readFileInDirRelative', readFileInDir( 'D:\\Code\\TamperMoneyScripts-vite\\lib\\Self\\BilibiliShortLiveRecord', 'D:\\Code\\TamperMoneyScripts-vite\\lib\\Self\\BilibiliShortLiveRecord' ) );

/**
 * 读取目录（包括子目录）下所有的文件和目录的绝对路径
 * @param {string} dirPath 文件路径
 * @return {{dirs: string[], files: string[]}} 包含所有文件 / 目录绝对路径的数组
 * */
const readAllInDir = ( dirPath ) => {
	// 文件表
	const files = [];
	// 读取所有目录
	const dirs = readDirInDir( dirPath );
	const toReadDirs = Array.from( dirs );
	
	// 从目录中读取文件
	while ( toReadDirs[0] ) {
		const dir = toReadDirs.shift();
		files.push( ...readFileFromDir( dir ) )
	}
	
	return { dirs, files };
}
