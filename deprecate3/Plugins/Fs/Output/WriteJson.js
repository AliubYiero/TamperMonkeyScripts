/**
 * WriteJson.js
 * created by 2023/7/16
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import fsExtra from 'fs-extra'

export {
	writeJson
}

/**
 * @param {string} outputFilePath
 * @param {Object} outputObject 输出的Json数据
 * @param { { spaces: number | string } } config 配置文件
 * */
const writeJson = ( outputFilePath, outputObject = {}, config ) => {
	/* 如果不存在json后缀, 则添加json后缀 */
	if ( !outputFilePath.endsWith( 'json' ) ) {
		outputFilePath += '.json';
	}
	
	fsExtra.outputJsonSync( outputFilePath, outputObject, config );
}
