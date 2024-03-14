/**
 * requestBootcdn.ts
 * created by 2023/9/18
 * @file 请求bootCDN获取APi
 * @author  Yiero
 * */
import { api_getBootcdnLib } from '../api/api_Bootcdn.ts'
import { getLibrary } from './request/globalRequest.ts'

/**
 * Retrieves the library link from Bootcdn.
 *
 * @param searchLibrary - The library to search for.
 * @param isContainScriptTag - Whether the link should be wrapped in a script tag. (default: false)
 * @returns The library link.
 * @throws If the library link cannot be found from Bootcdn.
 */
export async function getBootcdnLibrary( searchLibrary: string, isContainScriptTag = false ): Promise<string> {
	// Call the getLibrary function with the appropriate parameters
	return await getLibrary( 'bootcdn', api_getBootcdnLib, searchLibrary, isContainScriptTag );
}
