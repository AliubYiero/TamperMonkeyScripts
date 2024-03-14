/**
 * GMHttpRequest.ts
 * created by 2023/9/18
 * @file 油猴网络请求函数
 * @author Yiero
 * */

export {
	GMHttpRequest
}

function GMHttpRequest(
	url: string,
	method?: 'GET',
	param?: { [ propName: string ]: any },
	GMXmlHttpRequestConfig?: { [ propName: string ]: any }
): Promise<{ [ propName: string ]: any }>;
function GMHttpRequest(
	url: string,
	method?: 'POST',
	data?: { [ propName: string ]: any },
	GMXmlHttpRequestConfig?: { [ propName: string ]: any }
): Promise<{ [ propName: string ]: any }>;


/**
 * @param { string } url
 * @param {'GET' | 'POST' | 'HEAD'} [method = 'GET']
 * @param { {[propName: string]: any} } [paramOrData]
 * @param { {[propName: string]: any} } [GMXmlHttpRequestConfig]
 */
function GMHttpRequest(
	url: string,
	method: 'GET' | 'POST' = 'GET',
	paramOrData?: { [ propName: string ]: any },
	GMXmlHttpRequestConfig: { [ propName: string ]: any } = {}
): Promise<{
	parse: { [ propName: string ]: any },
	origin: { [ propName: string ]: any }
}> {
	
	// 携带参数
	if ( paramOrData && method === 'GET' ) {
		const params: string[] = [];
		
		for ( const key in paramOrData ) {
			if ( Object.hasOwnProperty.call( paramOrData, key ) ) {
				const value = paramOrData[ key ];
				params.push( `${ key }=${ JSON.stringify( value ) }` );
			}
		}
		url += `?${ params.join( '?' ) }`;
	}
	else if ( paramOrData && method === 'POST' ) {
		GMXmlHttpRequestConfig.data = { ...paramOrData };
	}
	
	return new Promise( ( resolve, reject ) => {
		const newGMXmlHttpRequestConfig = {
			// 默认20s的超时等待
			timeout: 20_000,
			
			// 用户自定义的油猴配置项
			...GMXmlHttpRequestConfig,
			
			// 请求地址, 请求方法和请求返回，权重最高
			url,
			method,
			onload( response: { [ propName: string ]: any } ) {
				resolve( {
					parse: JSON.parse( response.responseText ),
					origin: response
				} );
			},
			onerror( error: { [ propName: string ]: any } ) {
				reject( error );
			}
		};
		
		GM_xmlhttpRequest( newGMXmlHttpRequestConfig );
		
	} )
	
}
