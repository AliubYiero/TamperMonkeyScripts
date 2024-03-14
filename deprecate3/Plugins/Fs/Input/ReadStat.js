/**
 * ReadStat.js
 * created by 2023/7/15
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import fsExtra from 'fs-extra'
import { readFileInDir } from './Read.js'
import path from 'path'

export {
	getFileStat,
	getFileChangeTime,
	getCtimeInDir
}

/**
 * 获取文件完整Stat信息
 * @param {string} filePath 文件路径
 * @return {Stats}
 * */
const getFileStat = ( filePath ) => {
	return fsExtra.statSync( filePath );
}
/**
 * 获取文件修改时间信息
 * @param {string} filePath 文件路径
 * @return {number}
 * */
const getFileChangeTime = ( filePath ) => {
	return fsExtra.statSync( filePath ).ctimeMs;
}

/**
 * 获取指定目录下的所有文件的最后修改时间戳
 * @param {string} dirPath
 * @return { { [fileName: string]: number } } timestampList 时间戳列表
 * */
const getCtimeInDir = ( dirPath ) => {
	// 设置相对路径根
	const basePath = dirPath;
	// 读取所有文件
	const files = readFileInDir( dirPath );
	
	// 声明时间戳对象
	const timestampList = {};
	// 读取所有文件的时间戳，并写入对象
	files.forEach( file => {
		timestampList[path.relative( basePath, file )] = getFileChangeTime( file );
	} )
	return timestampList;
}
