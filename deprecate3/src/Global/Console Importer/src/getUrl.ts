import { currentCdnLibMap } from '../config/config.ts'
import { libStorage } from '../index.ts'


export async function getUrl( urlOrLibrary: string ): Promise<string> {
	
	
	/* 判断传入参数是库名称还是链接 */
	// 是链接
	let url: string;
	if ( urlOrLibrary.startsWith( 'https' ) ) {
		url = urlOrLibrary;
	}
	// 是库名称, 从CDN库中获取链接
	else {
		url = await currentCdnLibMap[ libStorage.get( 'bootcdn' ) as 'bootcdn' ]( urlOrLibrary );
	}
	
	return url;
}
