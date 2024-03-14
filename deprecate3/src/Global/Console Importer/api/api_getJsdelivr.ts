/**
 * api_getJsdelivr.ts
 * created by 2023/9/25
 * @file JsDelivr 获取库信息API
 * @author  Yiero
 * */
import {
	GMHttpRequest
} from '../../../../lib/GM_Lib/Ajax/GMHttpRequest.ts'

export async function api_getProjectEntryPoints( searchLibrary: string ) {
	// APi域名
	const jsDelivrApiDetailDomain = 'https://data.jsdelivr.com/v1/packages/npm/';
	
	const res = await GMHttpRequest( jsDelivrApiDetailDomain + searchLibrary );
	// let link = '';
	if ( res.origin.status !== 200 ) {
		return Promise.reject( 'Can not find library from jsDelivr...' );
	}
	else {
		return Promise.resolve( res.parse.versions[ 0 ].links.self );
	}
}

export async function api_getJsDilivrLib( projectEntryPointLink: string ) {
	const jsdelivrApiDomain = 'https://cdn.jsdelivr.net/npm/';
	const res = await GMHttpRequest( projectEntryPointLink );
	const libLink = `${ jsdelivrApiDomain }${ res.parse.name }@${ res.parse.version }/${ res.parse.default }`;
	return Promise.resolve( libLink );
}

// export async function api_Bootcdn( searchLibrary: string ): Promise<string> {
// 	// APi域名
// 	const bootcdnApiDetailDomain = 'https://api.bootcdn.cn/libraries/';
// 	const bootcdnApiDomain = 'https://cdn.bootcdn.net/ajax/libs/';
//
// 	const res = await GMHttpRequest( bootcdnApiDetailDomain + searchLibrary );
// 	let link = '';
// 	if ( res.status !== 200 ) {
// 		return Promise.reject( 'Can not find library from bootcdn...' );
// 	}
// 	else {
// 		const response = JSON.parse( res.response );
// 		const { filename, version } = response[ 0 ];
// 		link = `${ bootcdnApiDomain }/${ searchLibrary }/${ version }/${ filename }`;
// 		print.log( '从 bootcdn 中查找到库: ', link );
// 		return Promise.resolve( link );
// 	}
// }
