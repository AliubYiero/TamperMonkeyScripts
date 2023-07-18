/**
 * Prompt.ts
 * created by 2023/7/16
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { addElementToDocument, createElement } from '../../lib/GM_Lib'

export {
	prompt
}

// @ts-ignore
function prompt( title: string, mountedCallback: Function, confirmCallback: Function ) {
	// 创建元素
	const element = createElement( {
		tagName: 'section',
		className: [ 'custom-prompt__container', 'hide' ],
		innerHTML: `
		<header>
			<h3 class="custom-prompt__title">${ title }</h3>
		</header>
		<main>
			<input class="custom-prompt__input" type="text">
		</main>
		<footer class="custom-prompt__confirm-btn">
			<button>确认</button>
			<button>取消</button>
		</footer>
		`
	} );
	
	// 写入CSS
	const cssString = `
	.custom-prompt__container {
		width: 400px;
		height: 125px;
		background: #f8f8f8;
		border-radius: 15px;
		box-sizing: border-box;
		padding: 20px;
		
		box-shadow: 2px 2px #a6a6a6;
		
		display: flex;
		justify-content: center;
		flex-flow: column;
		
		position: fixed;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10002;
	}
	
	h3.custom-prompt__title {
		margin: 10px -0px;
	}
	
	input.custom-prompt__input {
		width: 100%;
		border: #a6a6a6 2px solid;
		border-radius: 5px;
		box-sizing: border-box;
		padding: 5px 10px;
	}
	
	.custom-prompt__confirm-btn {
		margin-top: 10px;
		align-self: flex-end;
	}
	
	.custom-prompt__confirm-btn > button {
		padding: 3px;
		border-radius: 5px;
		border: 2px #a6a6a6 solid;
	}
	
	.custom-prompt__confirm-btn > button:hover {
		border: 2px cornflowerblue solid;
		color: cornflowerblue;
	}
	
	.custom-prompt__container.hide {
		display: none;
	}
	`
	
	// 记录dom对象
	const htmlElements: { [ propName: string ]: HTMLElement } = {
		confirmBtn: element.querySelector( '.custom-prompt__confirm-btn > button:first-of-type' ) as HTMLButtonElement,
		cancelBtn: element.querySelector( '.custom-prompt__confirm-btn > button:last-of-type' ) as HTMLButtonElement,
		userInputContainer: element.querySelector( '.custom-prompt__input' ) as HTMLInputElement,
	};
	
	// 执行元素自定义回调
	mountedCallback( element );
	
	// 写入用户交互
	htmlElements.confirmBtn.addEventListener( 'click', () => {
		// 执行确认回调
		confirmCallback( element, ( <HTMLInputElement> htmlElements.userInputContainer ).value );
		
		// 关闭元素
		hide();
	} );
	
	// 点击取消按钮，关闭元素
	htmlElements.cancelBtn.addEventListener( 'click', hide );
	
	// 点击空白页面，关闭元素
	document.addEventListener( 'click', ( e ) => {
		if ( element && !element.contains( <HTMLElement> e.target ) ) {
			hide();
		}
	} )
	
	// 写入元素到页面中
	addElementToDocument( element, cssString );
	
	function hide() {
		element.classList.add( 'hide' );
	}
	
	function show() {
		element.classList.remove( 'hide' );
	}
	
	return show;
}
