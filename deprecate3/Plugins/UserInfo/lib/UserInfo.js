/**
 * UserInfo.js
 * created by 2023/8/19
 * @file 解析userinfo
 * @author  Yiero
 * @version beta1.0.0
 * */

import { GlobalConfig } from '../../../Config/config.global.js'

export {
	parse
}

/** 默认配置项 */

/**
 * 解析userinfo配置对象, 变成可识别字符串
 * @param { {[propName: string]: any} } userinfo
 * @return { string }
 * */
function parse( userinfo ) {
	let result = new Set();
	for ( let userinfoTitle in userinfo ) {
		let userinfoValue = userinfo[userinfoTitle];
		
		/* 如果是空值直接继续下一个循环 */
		if ( isEmpty( userinfoValue ) ) {
			continue;
		}
		
		/* 将简写字符串展开 */
		if (
			[ 'run-at' ].includes( userinfoTitle )
			&& typeof userinfoValue === 'string'
		) {
			console.log( userinfoValue );
			userinfoValue = shortenUnfold( userinfoValue, GlobalConfig.userinfo.shorten[userinfoTitle] );
		}
		else if (
			[ 'grant', 'require', 'resource' ].includes( userinfoTitle )
			&& Array.isArray( userinfoValue )
		) {
			userinfoValue = userinfoValue.map(
				content => shortenUnfold( content, GlobalConfig.userinfo.shorten[userinfoTitle] )
			).flat();
		}
		
		/* 解析userinfo的值, 变成可识别的油猴注释字符串或者油猴注释字符串数组 */
		const userinfoString = parseObjectValue( userinfoTitle, userinfoValue );
		
		// 数组值
		if ( Array.isArray( userinfoString ) ) {
			userinfoString.forEach( content => {
				result.add( content );
			} )
		}
		// 字符串值
		else {
			result.add( parseObjectValue( userinfoTitle, userinfoValue ) );
		}
	}
	
	/* 最终解析, 添加配置项识别头和配置项识别尾 */
	result = Array.from( result );
	result.unshift( '// ==UserScript==' );
	result.push( '// ==/UserScript==' );
	return result.join( '\n' );
}

/**
 * 识别传入对象是否为空对象
 * @param { any } value
 * @return { boolean }
 * */
function isEmpty( value ) {
	/* 如果是基本类型 */
	if ( typeof value !== 'object' ) {
		return !value;
	}
	
	/* 如果不是基本类型 */
	const valueType = Object.prototype.toString.call( value );
	
	switch ( valueType ) {
		case '[object Array]':
			return !value[0];
		case '[object Object]':
			return !Object.keys( value ).length;
		case '[object Set]':
		case '[object Map]':
			return !value.size;
	}
	
	/* 没有判断到空值, 返回false */
	return false;
}

/**
 *
 * @param { string } shorten
 * @param { {[propName: string]: string} } shortenList
 * @return { string | string[] }
 * */
function shortenUnfold( shorten, shortenList ) {
	/* 忽略大小写 */
	const cacheShortenList = {};
	for ( let shortenListKey in shortenList ) {
		cacheShortenList[shortenListKey.toLowerCase()] = shortenList[shortenListKey];
	}
	shortenList = cacheShortenList;
	
	/* 判断到简写, 进行展开 */
	if ( shortenList[shorten.toLowerCase()] ) {
		return shortenList[shorten.toLowerCase()];
	}
	/* 直接返回原字符串 */
	else {
		return shorten;
	}
}

/**
 * 解析每一串userinfo对象的属性
 * @param { string } key
 * @param { string | { [propName: string]: string } | string[] } value
 * @return { string | string[] }
 * */
function parseObjectValue( key, value ) {
	/**
	 * @param { string } key
	 * @param { string } value
	 * @return { string }
	 * */
	function stringify( key, value ) {
		return `// @${ key }\t\t${ String( value ) }`;
	}
	
	/* 字符串配置项 */
	if ( typeof value !== 'object' ) {
		return stringify( key, value );
	}
	
	const valueType = Object.prototype.toString.call( value );
	
	/* 数组配置项 */
	if ( valueType === '[object Array]' ) {
		const array = [];
		value.forEach( content => {
			content &&
			array.push( stringify( key, content ) );
		} )
		return array;
	}
	
	/* 对象 */
	if ( valueType === '[object Object]' ) {
		const array = [];
		for ( let valueKey in value ) {
			const content = value[valueKey];
			
			if ( isEmpty( content ) ) {
				continue;
			}
			
			array.push( stringify( key, `${ valueKey } ${ content }` ) );
		}
		return array;
	}
}
