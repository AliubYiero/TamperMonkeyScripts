import { Prompt } from '../../../../lib/UI/SweetAlert2'
import { config } from '../config/config.ts'

/**
 * Prompts the user to input a list of default tags and updates the config accordingly.
 */
export async function inputPrevTags(): Promise<void> {
	// Prompt the user to input the default tags
	const result = await Prompt.input( '输入默认标签\n(多个标签通过半角逗号分割)', config.tagList.join( ', ' ) );
	
	// Split the input by commas and trim the tags
	let tagList: string[] = [];
	if ( result ) {
		tagList = result.split( ',' ).map( ( tag: string ) => tag.trim() );
		config.tagList = tagList;
	}
} 
