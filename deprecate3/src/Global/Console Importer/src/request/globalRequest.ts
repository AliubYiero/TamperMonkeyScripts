/**
 * globalRequest.ts
 * created by 2023/9/25
 * @file 通用request请求库函数
 * @author  Yiero
 * */

import { print } from '../../index.ts'
import { supportCdnLib } from '../changeRequestLib.ts'

/**
 * Retrieves the library link from Bootcdn.
 *
 * @param libName - The name of the library.
 * @param requestFunction - The function used to make the request to Bootcdn.
 * @param searchLibrary - The library to search for.
 * @param isContainScriptTag - Whether the link should be wrapped in a script tag. (Optional)
 * @returns The library link.
 * @throws If the library link cannot be found from Bootcdn.
 */
export async function getLibrary(
	libName: supportCdnLib,
	requestFunction: ( searchLibrary: string ) => Promise<string>,
	searchLibrary: string,
	isContainScriptTag?: boolean
): Promise<string> {
	// Convert the original input into 4 parameters and iterate until a link is found
	const reSearchLibrary = searchLibrary.endsWith( '.js' )
		? searchLibrary.replace( '.js', '' )
		: searchLibrary + '.js';
	
	// Build the list of search parameters
	const searchLibraryList = [
		// Original input
		searchLibrary,
		// Converted original input (remove .js if present, add .js if not present)
		reSearchLibrary,
		// Lowercase of original input
		searchLibrary.toLowerCase(),
		// Lowercase of converted original input
		reSearchLibrary.toLowerCase(),
	];
	
	// Iterate through the search parameters, exit the loop if a link is found
	for ( let i = 0; i < searchLibraryList.length; i++ ) {
		const searchLibrary = searchLibraryList[ i ];
		print.warn( `Trying to retrieve library from ${ libName }: `, searchLibrary );
		let link: string = '';
		try {
			// Try to retrieve the link
			link = await requestFunction( searchLibrary );
		} catch ( e ) {
			// Print error message
			print.error( 'Failed to retrieve library: ', searchLibrary );
		}
		
		// If the link needs to be wrapped in a script tag, replace the link with the script tag
		if ( isContainScriptTag ) {
			link = `<script src="${ link }"></script>`;
		}
		
		// If a link is found, return it
		if ( link.startsWith( 'http' ) ) {
			return link;
		}
	}
	
	// If no link is found after iterating through all parameters, throw an error
	print.error( `Could not find library from ${ libName }: `, searchLibrary );
	throw new Error( `Could not find library from ${ libName }: ${ searchLibrary }` );
}
