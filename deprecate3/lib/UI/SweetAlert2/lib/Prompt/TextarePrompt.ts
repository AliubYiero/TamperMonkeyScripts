/**
 * InputPrompt.ts
 * created by 2023/9/21
 * @file Textarea输入框
 * @author  Yiero
 * */

import { AlertCheckReturn } from './interfaces/AlertCheckReturn.ts'

export interface ExtraParma {
	handleOpen: ( textareaElement: HTMLTextAreaElement ) => void;
}

/**
 * Prompts the user for input with a custom title.
 * @param {string} title - The title of the prompt dialog.
 * @param defaultValue
 * @param extraParma
 * @returns {Promise<string>} - A promise that resolves to the user's input value if the user cancels the prompt.
 */
export const textareaPrompt = async (
	title: string,
	defaultValue: string = '',
	extraParma?: ExtraParma
): Promise<string | undefined> => {
	// @ts-ignore
	// Show a prompt dialog using Swal.fire() function
	const result: AlertCheckReturn = await Swal.fire( {
		// Prompt title
		titleText: title,
		// Textarea field
		input: 'textarea',
		// Default value
		inputValue: defaultValue,
		// disabled click outside to close prompt
		allowOutsideClick: false,
		// Show close button
		showCloseButton: true,
		// Do not focus on confirm button
		focusConfirm: false,
		// Show cancel button
		showCancelButton: true,
		
		// Width and height
		width: 800,
		
		/**
		 * Function to handle the "did open" event for a toast element.
		 * @param toast - The toast element.
		 */
		didOpen( toast: HTMLElement ) {
			// Find the textarea element inside the toast
			const textareaElement: HTMLTextAreaElement = toast.querySelector( '#swal2-textarea' ) as HTMLTextAreaElement;
			
			// Call the handleOpen function from extraParam, if it exists, and pass the textarea element as an argument
			if ( extraParma && extraParma.handleOpen ) {
				extraParma.handleOpen( textareaElement );
			}
		}
	} );
	
	if ( result.dismiss === 'cancel' ) {
		return;
	}
	
	// Return the user's input value
	if ( result.value ) {
		return result.value as string;
	}
}
