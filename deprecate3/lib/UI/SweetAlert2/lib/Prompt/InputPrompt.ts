/**
 * InputPrompt.ts
 * created by 2023/9/21
 * @file Input输入框
 * @author  Yiero
 * */
import { AlertCheckReturn } from './interfaces/AlertCheckReturn.ts'

/**
 * Prompts the user for input using a dialog box.
 * @param title - The title of the prompt dialog.
 * @param defaultValue - The default value for the input field.
 * @returns A promise that resolves to the user's input value, or undefined if the user cancels the prompt.
 */
export const inputPrompt = async ( title: string, defaultValue: string = '' ): Promise<string | undefined> => {
	// @ts-ignore
	// Show a prompt dialog using Swal.fire() function
	const result: AlertCheckReturn = await Swal.fire( {
		// Prompt title
		titleText: title,
		// Input fields
		input: 'text',
		// Default value
		inputValue: defaultValue,
		// Show close button
		showCloseButton: true,
		// Do not focus on confirm button
		focusConfirm: false,
		// Show cancel button
		showCancelButton: true,
	} );
	
	if ( result.dismiss === 'cancel' ) {
		return;
	}
	
	// Return the user's input value
	if ( result.value ) {
		return result.value as string;
	}
}
