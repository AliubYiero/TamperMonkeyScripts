/**
 * Alert.ts
 * created by 2023/9/20
 * @file 通用提示框函数
 * @author  Yiero
 * */
import { AlertPosition } from './Interfaces/AlertPosition'
import { InfoType } from './Interfaces/InfoType.ts'


/**
 * Display an alert with the specified information.
 *
 * @param { 'success' | 'error' | 'warning' | 'info' | 'question' } info - The type of the alert.
 * @param { string } title - The title of the alert.
 * @param text
 * @param { AlertPosition } position - The position of the alert.
 * @param { number } [timeout=1500] - The timeout duration in milliseconds.
 * @return { void }
 */
export const alert = (
	info: InfoType,
	title: string,
	text?: string,
	position?: AlertPosition,
	timeout?: number
): void => {
	// 处理输入的text分行
	if ( text ) {
		text = text.split( '\n' ).map( ( item ) => `<p>${ item }</p>` ).join( '' );
	}
	
	
	// @ts-ignore
	// Display the alert using Swal.fire
	Swal.fire( {
		// Set the title of the alert
		titleText: title,
		html: text,
		// Set the position of the alert, default to 'center'
		position: position || 'center',
		// Set the type of the alert
		info,
		// Show the confirm button
		showConfirmButton: true,
		// Set the timeout duration in milliseconds, default to 1500
		timer: timeout || 1500
	} );
}
