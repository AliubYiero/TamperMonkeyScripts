/**
 * index.ts
 * created by 2023/7/21
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	importLayui
}

function importLayui() {
	let script = document.createElement( "script" );
	script.type = "text/javascript";
	script.src = "https://cdn.staticfile.org/layui/2.8.11/layui.min.js";
	document.head.appendChild( script );
}
