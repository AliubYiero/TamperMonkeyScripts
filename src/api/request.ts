/**
 * request.ts
 * created by 2024/3/11
 * @file 一次封装, 通过 GM_xmlhttpRequest 进行网络请求
 * @author  Yiero
 * */

import { requestConfig } from './config/requestConfig.ts';

/*
* 重载1: GET请求
* */
function request(
	url: `http://${ string }` | `https://${ string }` | `/${ string }`,
	method: 'GET',
	param?: { [ propName: string ]: any },
	GMXmlHttpRequestConfig?: Partial<Tampermonkey.Request<any>>,
): Promise<any>;

/*
* 重载2: POST请求
* */
function request(
	url: `http://${ string }` | `https://${ string }` | `/${ string }`,
	method: 'POST',
	data?: { [ propName: string ]: any },
	GMXmlHttpRequestConfig?: Partial<Tampermonkey.Request<any>>,
): Promise<any>;

/**
 * 使用可选参数和配置生成对指定URL的请求。
 *
 * @param {string} url - 将请求发送到的URL。
 * @param {string} [method='GET'] - 请求的HTTP方法默认为“GET”。
 * @param {object} [paramOrData] - 随请求一起发送的可选参数或数据。
 * @param {Partial<Tampermonkey.Request<any>>} [GMXmlHttpRequestConfig={}] - 请求的附加配置。
 * @return {Promise<any>} 用响应数据解析或用错误拒绝的Promise。
 */
function request(
	url: `http://${ string }` | `https://${ string }` | `/${ string }`,
	method: 'GET' | 'POST' = 'GET',
	paramOrData?: { [ propName: string ]: any },
	GMXmlHttpRequestConfig: Partial<Tampermonkey.Request<any>> = {},
): Promise<any> {
	/*
	* 判断传入的URL是否为完整URL, 若不是则添加上基础URL
	* */
	if ( !url.startsWith( 'http' ) ) {
		url = requestConfig.baseURL + url;
	}
	
	/*
	* 如果携带参数, 并且请求方式是 GET 请求, 将参数写入 URL 参数
	* */
	if ( paramOrData && method === 'GET' ) {
		url += '?' + new URLSearchParams( paramOrData ).toString();
	}
	/*
	* 如果携带参数, 并且请求方式是 POST 请求, 将参数写入请求体中
	* */
	else if ( paramOrData && method === 'POST' ) {
		GMXmlHttpRequestConfig.data = JSON.stringify( paramOrData );
	}
	
	return new Promise( ( resolve, reject ) => {
		const newGMXmlHttpRequestConfig: Tampermonkey.Request<any> = {
			// 默认20s的超时等待
			timeout: 20_000,
			
			// 用户自定义的油猴配置项
			...GMXmlHttpRequestConfig,
			
			// 请求地址, 请求方法和请求返回，权重最高
			url,
			method,
			onload( response: any ) {
				resolve( JSON.parse( response.responseText ) );
			},
			onerror( error: any ) {
				reject( error );
			},
			ontimeout() {
				reject( new Error( 'Request timed out' ) );
			},
		};
		
		GM_xmlhttpRequest( newGMXmlHttpRequestConfig );
	} );
}

export {
	request,
};
