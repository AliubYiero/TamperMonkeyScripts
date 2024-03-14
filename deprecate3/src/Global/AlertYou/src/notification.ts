/**
 * Sets a notification to be displayed after a specified timeout.
 *
 * @param {string} content - The content of the notification.
 * @param {number} timeoutPerSecond - The timeout duration in seconds.
 */
export const notification = ( content: string, timeoutPerSecond: number ) => {
	setTimeout( () => {
		GM_notification( {
			text: content,
			title: "定时提醒",
		} );
	}, timeoutPerSecond * 1000 );
};

/**
 * Sets a notification by prompting the user for an event and a timeout.
 *
 * @return {void} This function does not return anything.
 */
export const setNotification = (): void => {
	const msg = prompt( '输入需要提醒的事件: ' );
	const timeout = Number( prompt( '输入需要提醒的时间: ' ) );
	if ( msg && timeout ) {
		notification( msg, timeout );
	}
}
