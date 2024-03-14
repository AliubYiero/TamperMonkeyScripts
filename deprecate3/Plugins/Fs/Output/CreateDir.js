/**
 * CreateDir.js
 * created by 2023/8/8
 * @file 创建目录
 * @author  Yiero
 * @version beta1.0.0
 * */

import fsExtra from 'fs-extra'

export {
	checkDirExist,
	createDir
}

/**
 * 检查目录是否存在
 * @param {string} dirPath 需要检查的目录路径
 * @return { Promise<boolean> } true-文件存在 | false-文件不存在
 * */
async function checkDirExist( dirPath ) {
	return !( await fsExtra.ensureDir( dirPath ) );
}

/**
 * 创建目录
 * @param {string} dirPath 需要创建的目录路径
 * */
function createDir( dirPath ) {
	fsExtra.ensureDir( dirPath );
}
