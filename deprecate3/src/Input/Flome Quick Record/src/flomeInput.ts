import { config } from '../config/config.ts'
import { Alert, Prompt } from '../../../../lib/UI/SweetAlert2'
import { api_pushContent, FlomeResponse } from '../api/api_pushContent.ts'

/**
 * Prompts the user to input a Flome note and pushes it to the Flome API.
 * @param defaultValue - The default value for the input prompt.
 */
export async function flomeInput( defaultValue: string = '' ) {
	// Check if Flome API is configured
	if ( !config.api ) {
		Alert.warning( '请输入 Flome APi' );
		return;
	}
	
	// fixme 需要刷新页面才能获取修改后的tagList
	// Prompt user for Flome note input
	const result: string | undefined = await Prompt.textarea(
		'输入 Flome 笔记',
		defaultValue + (
			config.history.get( document.URL ) === 'undefined' || !config.history.get( document.URL )
				? ''
				: config.history.get( document.URL )
		),
		{
			handleOpen: ( textarea: HTMLTextAreaElement ) => {
				const history: Map<string, string> = config.history;
				// todo 节流定时保存
				textarea.addEventListener( 'input', () => {
					history.set( document.URL, textarea.value.replace( defaultValue, '' ) );
					config.history = history;
				} );
				
				/* 监听ctrl+enter提交 */
				textarea.addEventListener( 'keydown', ( e: KeyboardEvent ) => {
					if ( e.ctrlKey && e.keyCode === 13 ) {
						e.preventDefault();
						// @ts-ignore
						Swal.clickConfirm();
					}
				} );
			}
		} );
	
	if ( !result ) {
		return;
	}
	
	let response: FlomeResponse | Error;
	try {
		// Push the note content to the Flome API
		response = await api_pushContent( config.api, result );
	} catch ( e ) {
		Alert.error( 'Api错误' );
		throw e;
	}
	
	// Check if the note was successfully recorded
	if ( response.message === '已记录' ) {
		Alert.success( '已记录到 Flome.' );
	}
}
