/**
 * requestJsDelivr.ts
 * created by 2023/9/25
 * @file 请求JsDelivr获取库
 * @author  Yiero
 * */
import {
	api_getJsDilivrLib,
	api_getProjectEntryPoints
} from '../api/api_getJsdelivr.ts'
import { getLibrary } from './request/globalRequest.ts'


/**
 * Retrieves the JSDelivr library for the given search term.
 *
 * @param searchLibrary - The library to search for.
 * @returns A Promise that resolves to the retrieved library.
 */
async function getJsDelivrLib( searchLibrary: string ): Promise<string> {
	// Retrieve project entry points for the search library
	const projectEntryPointLink = await api_getProjectEntryPoints( searchLibrary );
	
	// Retrieve the JSDelivr library using the project entry point link
	const result = await api_getJsDilivrLib( projectEntryPointLink );
	
	// Return the retrieved library
	return Promise.resolve( result );
}

/**
 * Retrieves a library from the JsDelivr API.
 *
 * @param searchLibrary - The name of the library to search for.
 * @param isContainScriptTag - Whether or not to search for libraries that contain a script tag.
 * @returns - A Promise that resolves with the library URL.
 */
export async function getJsDelivrLibrary( searchLibrary: string, isContainScriptTag = false ): Promise<string> {
	// Call the getLibrary function with the appropriate parameters
	return await getLibrary( 'jsdilivr', getJsDelivrLib, searchLibrary, isContainScriptTag );
}
