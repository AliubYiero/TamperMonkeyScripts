import { GMStorageExtra } from '../lib/Storage/GMStorageExtra.ts';

/**
 * 限制方式枚举
 * */
export enum LimitWay {
	limit,
	open
}

/**
 * 限制信息接口
 * */
export interface LimitTime {
	url: RegExp;
	startTime: number;
	endTime: number;
	limitWay: LimitWay;
}

/**
 * 将 limitTimeString 转化成可识别的对象
 * */
const parseLimitTimeString = ( limitTimeString: string ): LimitTime[] => {
	const limitTimeLineList = limitTimeString.split( '\n' );
	
	/**
	 * 将魔法字符转义成普通字符
	 * */
	function _escapeRegExp( str: string ) {
		return str.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
		//$&表示整个被匹配的字符串
	}
	
	/**
	 * 将输入的 url 转化为 正则形式
	 * */
	const _parseUrl = ( url: string ): RegExp => {
		// 如果传入的是正则字符串, 将其转为正则
		if ( url.startsWith( '/' ) && url.match( /\/[gmyuisd]*$/ ) ) {
			const [ , matchRegexString, flag ] = url.match( /^\/(.*)\/([gmyuisd]*)$/ ) as string[];
			return new RegExp( matchRegexString, flag );
		}
		
		// 如果传入的是字符串, 进行转换
		if ( !url.startsWith( 'http' ) ) {
			return new RegExp( `^https?://${ _escapeRegExp(url) }$` );
		}
		return new RegExp( `^${_escapeRegExp(url)}$` );
	};
	
	/**
	 * 将时间参数归一化
	 * */
	const _parseTime = ( timeString: string ): `1970-1-1 ${ string }:${ string }:${ string }` => {
		let [ hour, min = '00', sec = '00' ] = timeString.split( /[:：∶]/ );
		return `1970-1-1 ${ hour }:${ min }:${ sec }`;
	};
	
	
	return limitTimeLineList.map<LimitTime>( ( item ) => {
		let [ urlString, startTimeString, endTimeString, limitWayKey = 'limit' ] = item.split( /[,，] ?/ );
		
		/*
		* 参数归一
		* */
		const url: RegExp = _parseUrl( urlString );
		const startTime = Date.parse( _parseTime( startTimeString ) );
		const endTime = Date.parse( _parseTime( endTimeString ) );
		const limitWay: LimitWay = LimitWay[ limitWayKey as keyof typeof LimitWay ];
		
		return {
			url,
			startTime,
			endTime,
			limitWay,
		};
	} );
};

/**
 * 判断当前是否为目标网页
 * */
export const findAimWeb = ( url: string ): undefined | LimitTime => {
	/**
	 * 获取储存
	 * @type {string} limitTimeString
	 *
	 * @example
	 * <url>, <start_time>, <end_time>, <limit_way = 'limit'>
	 *
	 * @example
	 * `https://www.example.com/*, 18, 20, open`  // -->  从 18:00-20:00 开放访问 https://www.example.com/*
	 *
	 * @example
	 * `https://www.example.com/*, 18:30, 20:30, limit`  // -->  从 18:30-20:30 限制访问 https://www.example.com/* , 其余时间开放访问
	 * */
	const limitTimeString: string = GMStorageExtra.getItem( 'limitTime', '' );
	
	// 将储存中的字符串转化为可识别的对象
	const limitTimeList: LimitTime[] = parseLimitTimeString( limitTimeString );
	
	console.log( 'limitTimeList', limitTimeList );
	
	// 判断输入的参数 url 是否是目标网页, 返回布尔值结果
	return limitTimeList.find( limitTime => url.match( limitTime.url ) );
};
