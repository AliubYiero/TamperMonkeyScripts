/**
 * CreateFile.js
 * created by 2023/8/8
 * @file 创建文件
 * @author  Yiero
 * @version beta1.0.0
 * */

import fsExtra from 'fs-extra'

export {
	checkFileExist,
	createFile,
	createFileWithContent
}

/**
 * 检验文件是否存在
 * @param {string} filePath 需要检验的文件路径
 * @return {boolean} true-文件存在 | false-文件不存在
 * */
function checkFileExist( filePath ) {
	return !fsExtra.ensureFile( filePath );
}

/**
 * 创建文件
 * @param {string} filePath 需要创建的文件路径
 * */
function createFile( filePath ) {
	fsExtra.ensureFile( filePath );
}

/**
 * 创建有内容的文件
 * @param {string} filePath 需要创建的文件路径
 * @param {string} content 创建的文本内容
 * */
function createFileWithContent( filePath, content = '' ) {
	fsExtra.outputFile( filePath, content );
}
