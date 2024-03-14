/**
 * Alert the user with a message.
 *
 * @param {Object} config - The configuration object.
 * @param {string} config.text - The text to display in the alert.
 */
// @ts-ignore
export const AlertYou = ( config: {
	// 提示文本
	text: string,
} ) => {
	window.alert( config.text );
};
