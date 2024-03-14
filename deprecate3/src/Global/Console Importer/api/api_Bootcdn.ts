/**
 * api_Bootcdn.ts
 * created by 2023/9/18
 * @file Bootcdn 获取库信息API
 * @author  Yiero
 * */

import {
	GMHttpRequest
} from '../../../../lib/GM_Lib/Ajax/GMHttpRequest.ts'
import { print } from '../index.ts'

/**
 * Retrieves the link for a library from the bootcdn API.
 *
 * @param {string} searchLibrary - The library to search for.
 * @return {Promise<string>} - The link for the library.
 */
export const api_getBootcdnLib = async ( searchLibrary: string ): Promise<string> => {
	// API domain for bootcdn library details
	const bootcdnApiDetailDomain = 'https://api.bootcdn.cn/libraries/';
	// API domain for bootcdn library files
	const bootcdnApiDomain = 'https://cdn.bootcdn.net/ajax/libs/';
	
	// Make a request to the bootcdn API to get library details
	const res = await GMHttpRequest( bootcdnApiDetailDomain + searchLibrary );
	
	if ( res.origin.status !== 200 ) {
		// If library not found, reject the promise
		return Promise.reject( 'Can not find library from bootcdn...' );
	}
	else {
		// Extract the filename and version of the library
		const { filename, version } = res.parse[ 0 ];
		// Generate the link for the library
		const link = `${ bootcdnApiDomain }/${ searchLibrary }/${ version }/${ filename }`;
		print.log( 'Found library from bootcdn: ', link );
		// Resolve the promise with the link
		return Promise.resolve( link );
	}
};
