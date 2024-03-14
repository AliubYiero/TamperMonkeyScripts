/**
 * index.ts
 * created by 2023/9/20
 * @file SweetAlert2入口文件
 * @author  Yiero
 * */
import { alert } from './lib/Alert/Alert'
import { AlertPosition } from './lib/Alert/Interfaces/AlertPosition'
import { InfoType } from './lib/Alert/Interfaces/InfoType.ts'
import { HotkeyPrompt } from './lib/Prompt/HotkeyPrompt.ts'
import { inputPrompt } from './lib/Prompt/InputPrompt.ts'
import {
	ExtraParma,
	textareaPrompt
} from './lib/Prompt/TextarePrompt.ts'

/**
 * 提示框
 * */
export const Alert: {
	show: ( info: InfoType, title: string, text?: string, position?: AlertPosition, timeout?: number ) => void
	success: ( title: string, text?: string, position?: AlertPosition, timeout?: number ) => void
	info: ( title: string, text?: string, position?: AlertPosition, timeout?: number ) => void
	warning: ( title: string, text?: string, position?: AlertPosition, timeout?: number ) => void
	error: ( title: string, text?: string, position?: AlertPosition, timeout?: number ) => void
	question: ( title: string, text?: string, position?: AlertPosition, timeout?: number ) => void
} = {
	/**
	 * Display an alert with the specified information.
	 *
	 * @param { 'success' | 'error' | 'warning' | 'info' | 'question' } info - The type of the alert.
	 * @param { string } title - The title of the alert.
	 * @param { AlertPosition } position - The position of the alert.
	 * @param { number } [timeout=1500] - The timeout duration in milliseconds.
	 * @return { void }
	 */
	show: alert,
	
	/**
	 * Displays a success alert with the given title.
	 *
	 * @param {string} title - The title of the success alert.
	 * @param text
	 * @param {AlertPosition} [position] - The position of the success alert. Default is undefined.
	 * @param {number} [timeout] - The timeout duration for the success alert. Default is undefined.
	 */
	success( title: string, text?: string, position?: AlertPosition, timeout?: number ) {
		alert( 'success', title, text, position, timeout );
	},
	
	/**
	 * A function that displays an info alert with the specified title, position, and timeout.
	 *
	 * @param {string} title - The title of the info alert.
	 * @param text
	 * @param {AlertPosition} [position] - The position of the info alert (optional).
	 * @param {number} [timeout] - The timeout for the info alert (optional).
	 * @return {void}
	 */
	info( title: string, text?: string, position?: AlertPosition, timeout?: number ): void {
		alert( 'info', title, text, position, timeout );
	},
	
	/**
	 * Displays a warning alert with the specified title.
	 *
	 * @param {string} title - The title of the warning alert.
	 * @param text
	 * @param {AlertPosition} position - The position of the warning alert (optional).
	 * @param {number} timeout - The timeout for the warning alert to disappear (optional).
	 * @return {void} This function does not return a value.
	 */
	warning( title: string, text?: string, position?: AlertPosition, timeout?: number ): void {
		alert( 'warning', title, text, position, timeout );
	},
	
	/**
	 * A description of the entire function.
	 *
	 * @param {string} title - description of the title parameter
	 * @param text
	 * @param {AlertPosition} position - description of the position parameter (optional)
	 * @param {number} timeout - description of the timeout parameter (optional)
	 * @return {void} description of the return value
	 */
	error( title: string, text?: string, position?: AlertPosition, timeout?: number ): void {
		alert( 'error', title, text, position, timeout );
	},
	
	/**
	 * A function that displays a question alert with the given title.
	 *
	 * @param {string} title - The title of the question alert.
	 * @param text
	 * @param {AlertPosition} [position] - The position where the alert should be displayed. Optional, default is undefined.
	 * @param {number} [timeout] - The duration in milliseconds after which the alert should automatically close. Optional, default is undefined.
	 * @return {void} This function does not return a value.
	 */
	question( title: string, text?: string, position?: AlertPosition, timeout?: number ): void {
		alert( 'question', title, text, position, timeout );
	},
};

export const Prompt: {
	hotkey: () => Promise<string>;
	input: ( title: string, defaultValue?: string ) => Promise<string | undefined>;
	textarea: ( title: string, defaultValue?: string, extraParma?: ExtraParma ) => Promise<string | undefined>;
} = {
	hotkey: HotkeyPrompt,
	input: inputPrompt,
	textarea: textareaPrompt,
}
