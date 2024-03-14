/**
 * 秒传输入助手.ts
 * created by 2023/7/3
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

// ==UserScript==
// @name         秒传拓展 - 秒传提取快捷输入
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://pan.baidu.com/disk/*
// @match        https://pan.baidu.com/s/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=baidu.com
// @grant        none
// ==/UserScript==


const config = {
	inputText: [ '本子', '套图', '画集', '音声', '书', '视频', '设定集', ],
}


/** 绑定秒传输入 */
function bindRapiduplooadKeydown() {
	const inputElement = document.querySelector( '#mzf-path-input' ) as HTMLInputElement;
	const rapiduplooad = document.querySelector( '.swal2-show' ) as HTMLDivElement;
	console.log( rapiduplooad )
	
	rapiduplooad.onkeydown = e => {
		console.log( e )
		if ( !e.key.match( /[0-9]/ ) ) {
			return;
		}
		
		inputElement.value = 'Yiero/' + config.inputText[ parseInt( e.key ) - 1 ] || config.inputText[ 0 ];
	}
}

/** 绑定原生百度云保存 */
// todo 张开第二层目录后innerText会增加，需要锁定目录的元素
function bindBaiduKeydown() {
	const aimDirList: Array<HTMLLIElement> = [];
	
	function getFirstDir() {
		const firstDirList = document.querySelectorAll( '.treeview-' ) as NodeList;
		
		// 获取第一层目录
		firstDirList.forEach( ( firstDir: HTMLLIElement ) => {
			if ( firstDir.innerText === 'Yiero' ) {
				aimDirList.push( firstDir );
				
				// 选中第一层目录
				( <HTMLSpanElement> firstDir.querySelector( '.treeview-node-handler' ) ).click();
			}
		} );
	}
	
	function getSecondDir() {
		const secondDirList = aimDirList[ 0 ].querySelectorAll( '.treeview-' ) as NodeList;
		window.onkeydown = e => {
			console.log( e )
			if ( !e.key.match( /[0-9]/ ) ) {
				return;
			}
			
			console.log( secondDirList );
			secondDirList.forEach( ( secondDir: HTMLLIElement ) => {
				// console.log( secondDir.innerText, config.inputText[ parseInt( e.key ) ] );
				if ( secondDir.innerText === config.inputText[ parseInt( e.key ) ] ) {
					( <HTMLSpanElement> secondDir.querySelector( '.treeview-node-handler' ) ).click();
				}
			} )
			
		}
	}
	
	getFirstDir();
	
	if ( aimDirList[ 0 ] ) {
		setTimeout( getSecondDir, 500 );
	}
}


let counter = 0;
let timer = setInterval( () => {
	if ( document.querySelector( '#mzf-path-input' ) ) {
		console.log( '获取秒传保存UI' );
		clearInterval( timer );
		setTimeout( bindRapiduplooadKeydown, 500 )
	}
	if ( document.querySelector( '#fileTreeDialog' ) ) {
		console.info( '获取百度云保存UI' );
		clearInterval( timer );
		setTimeout( bindBaiduKeydown, 500 );
	}
	if ( counter++ >= 20 ) {
		console.warn( '无获取' );
		clearInterval( timer );
	}
}, 500 )
