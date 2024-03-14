/**
 * Retrieves data from an API endpoint.
 *
 * @param {string} url - The URL of the API endpoint.
 * @return {Promise<any>} A promise that resolves to the JSON data returned by the API.
 */
export const getApi = async ( url: string ): Promise<any> => {
	const r = await fetch( url );
	return await r.json();
}
