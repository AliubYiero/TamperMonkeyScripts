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
 * */
const writeJson = ( outputFilePath, outputObject = {} ) => {
	
	if ( !outputFilePath.match( /json$/ ) ) {
		outputFilePath += '.json';
	}
	fsExtra.outputJson( outputFilePath, outputObject )
	       .catch( err => {
		       console.error( err )
	       } )
}
