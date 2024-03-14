/** 绑定页面更改事件，强制更改为页面刷新 */
export function bindPageReloadEvent() {
	console.log( 'Bind page reload event.' );
	
	function reloadPage() {
		console.info( 'Reload Page.' );
		location.reload();
	}
	
	window.addEventListener( 'hashchange', reloadPage );
	
	let _pushState = window.history.pushState;
	window.history.pushState = function () {
		setTimeout( reloadPage, 1000 );
		// @ts-ignore
		return _pushState.apply( this, arguments );
	};
}
