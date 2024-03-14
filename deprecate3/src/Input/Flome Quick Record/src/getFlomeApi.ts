import { Alert, Prompt } from '../../../../lib/UI/SweetAlert2'
import { config } from '../config/config.ts'

/**
 * Retrieves the Flome API from user input and updates the config.
 * @returns {Promise<void>} A promise that resolves once the API is updated.
 */
export async function getFlomeApi(): Promise<void> {
	// Prompt the user for the Flome API and use the current config value as the default input
	const result = await Prompt.input( 'Enter Flome API', config.api );
	
	// If the user provided an input, update the config with the new API value
	if ( result && result.startsWith( 'https://flomoapp.com/iwh' ) ) {
		config.api = result;
		return;
	}
	else if ( result ) {
		Alert.error( '输入错误API' );
		return;
	}
}
