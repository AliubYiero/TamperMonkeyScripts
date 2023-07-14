/**
 * ToggleBtn.ts
 * created by 2023/7/14
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { addElementToDocument, createElement } from '../../../../lib/GM_Lib/AddElementToDocument'
import { AddInfoElement } from './ShowInfo'

export {
	createToggleBtn
}
const createToggleBtn = ( toggleElement: AddInfoElement ) => {
	// 创建元素
	const btn = createElement( {
		tagName: 'btn',
		class: 'toggle-display-btn',
	} )
	
	const callback = ( e: Event ) => {
		e.preventDefault();
		console.info( '切换显示' );
		toggleElement.toggleContainer();
	}
	// 添加监听，切换显示
	btn.addEventListener( 'click', callback )
	btn.addEventListener( 'touchstart', callback )
	
	// 设置CSS
	const css = `
	.toggle-display-btn {
		width: 20px;
		height: 20px;
		border-radius: 10px;
		border: 0;
		outline: 0;
		
		box-shadow: 1px 1px rgba(0, 0, 0, 0.44);
		
		position: fixed;
		bottom: 60px;
		right: 20px;
	}
	@media screen and (min-width: 990px) {
		.toggle-display-btn {
			right: 300px;
			bottom: 70px;
		}
	}
	`;
	
	// 写入页面
	addElementToDocument( btn, css );
}
