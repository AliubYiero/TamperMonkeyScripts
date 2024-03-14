import { config } from '../config/config.ts'

/**
 * Returns the default content for a specific page.
 * The default content includes a list of tags and the current page's title and URL.
 * @returns {string} The default content.
 */
export function getDefaultContent(): string {
	let defaultValue: string = '';
	
	// Add tags to the default value
	defaultValue += config.tagList
		.reduce( ( prev, current ) => `${ prev }#${ current } `, '' ) + '\n';
	
	// Add current page title and URL to the default value
	defaultValue += `[${ document.title }](${ document.URL })\n`;
	
	return defaultValue;
}
