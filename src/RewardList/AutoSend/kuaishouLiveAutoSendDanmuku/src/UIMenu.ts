/**
 * UIMenu.ts
 * created by 2023/8/5
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { addElementToDocument, createElement } from '../../../../../lib/GM_Lib'
import { configStorage } from './Storage'
import { print } from '../index'
import { SendWay } from './sendConfig'

export {
	UiMenu
}

/**
 * UI菜单类, 用于注册一个UI菜单
 * @class
 * */
class UiMenu {
	domList: {
		[ propName: string ]: HTMLElement
	} = {};
	
	constructor() {
		this.registerFormElement();
		this.domList.form = this.form;
		this.domList.sendDelayInput = this.sendDelayInput;
		this.domList.sendWayLoopInput = this.sendWayLoopInput;
		this.domList.sendWayRandomInput = this.sendWayRandomInput;
		this.domList.freshPageDelayInput = this.freshPageDelayInput;
		this.domList.freshPageDelayOpenInput = this.freshPageDelayOpenInput;
		this.domList.freshPageDelayCloseInput = this.freshPageDelayCloseInput;
		this.domList.contentListContainer = this.contentListContainer;
		this.domList.inputContentSubmit = this.inputContentSubmit;
	}
	
	/** 获取form表单项, 并阻止其自动提交 */
	get form(): HTMLFormElement {
		const form = document.querySelector( '.config--container' ) as HTMLFormElement;
		this.preventFormSubmit( form );
		return form;
	}
	
	/** 获取发送间隔表单项*/
	get sendDelayInput(): HTMLInputElement {
		const inputElement = this.domList.form.querySelector( '#config--right__delay' ) as HTMLInputElement;
		inputElement.value = String( configStorage.config.sendDelayPerSecond );
		
		inputElement.addEventListener( 'change', () => {
			configStorage.config.sendDelayPerSecond = +inputElement.value;
		} )
		
		return inputElement;
	}
	
	/** 获取发送方式(循环)表单项 */
	get sendWayLoopInput(): HTMLInputElement {
		const radioElement = this.domList.form.querySelector( '#config-right__send-way-loop' ) as HTMLInputElement;
		radioElement.checked = !configStorage.config.sendWay;
		
		radioElement.addEventListener( 'change', () => {
			if ( radioElement.checked ) {
				print.log( 'sendWayOrigin', configStorage.config.sendWay )
				configStorage.config.sendWay = SendWay.loop;
				print.log( 'sendWayChange', configStorage.config.sendWay );
			}
		} )
		
		return radioElement;
	}
	
	/** 获取发送方式(随机)表单项 */
	get sendWayRandomInput(): HTMLInputElement {
		const radioElement = this.domList.form.querySelector( '#config-right__send-way-random' ) as HTMLInputElement;
		radioElement.checked = !!configStorage.config.sendWay;
		
		radioElement.addEventListener( 'change', () => {
			if ( radioElement.checked ) {
				configStorage.config.sendWay = SendWay.random;
				print.log( 'sendWay', configStorage.config.sendWay );
			}
		} )
		
		return radioElement;
	}
	
	/** 获取刷新页面状态(开启)表单项 */
	get freshPageDelayOpenInput(): HTMLInputElement {
		const radioElement = this.domList.form.querySelector( '#config--right__fresh-page-true' ) as HTMLInputElement;
		radioElement.checked = !!configStorage.config.freshPageDelayPerMinute;
		
		radioElement.addEventListener( 'change', () => {
			if ( radioElement.checked ) {
				( <HTMLInputElement> this.domList.freshPageDelayInput ).disabled = false;
				configStorage.config.freshPageDelayPerMinute = 1;
				( <HTMLInputElement> this.domList.freshPageDelayInput ).value = '1';
			}
		} )
		
		return radioElement;
	}
	
	/** 获取刷新页面状态(关闭)表单项 */
	get freshPageDelayCloseInput(): HTMLInputElement {
		const radioElement = this.domList.form.querySelector( '#config--right__fresh-page-false' ) as HTMLInputElement;
		radioElement.checked = !configStorage.config.freshPageDelayPerMinute;
		
		if ( radioElement.checked ) {
			print.log( radioElement.checked, this.domList.freshPageDelayInput );
			( <HTMLInputElement> this.domList.freshPageDelayInput ).disabled = true;
			configStorage.config.freshPageDelayPerMinute = 0;
		}
		
		radioElement.addEventListener( 'change', () => {
			if ( radioElement.checked ) {
				( <HTMLInputElement> this.domList.freshPageDelayInput ).disabled = true;
				configStorage.config.freshPageDelayPerMinute = 0;
				
				( <HTMLInputElement> this.domList.freshPageDelayInput ).value = '0';
			}
		} )
		
		return radioElement;
	}
	
	/** 获取刷新页面延时表单项 */
	get freshPageDelayInput(): HTMLInputElement {
		const radioElement = this.domList.form.querySelector( '#config--right__fresh-page-delay' ) as HTMLInputElement;
		radioElement.value = String( configStorage.config.freshPageDelayPerMinute );
		
		radioElement.addEventListener( 'change', () => {
			configStorage.config.freshPageDelayPerMinute = +radioElement.value;
		} )
		
		return radioElement;
	}
	
	/** 获取输入文本表单项 */
	get inputContent(): HTMLInputElement {
		return this.domList.form.querySelector( '#config--right__input' ) as HTMLInputElement;
	}
	
	/** 获取输入文本提交表单项 */
	get inputContentSubmit(): HTMLInputElement {
		const inputContentSubmitBtn = this.domList.form.querySelector( '#config--right__input-btn' ) as HTMLInputElement;
		
		inputContentSubmitBtn.addEventListener( 'click', () => {
			configStorage.addContentToContentList( this.inputContent.value );
			this.inputContent.value = '';
			this.contentListContainer;
		} );
		
		return inputContentSubmitBtn;
	}
	
	/** 获取自定义文本列表表单项 */
	get contentListContainer(): HTMLDivElement {
		const radioElement = this.domList.form.querySelector( '.config--show-content-list .config--right__container' ) as HTMLDivElement;
		radioElement.innerHTML = '';
		print.log( configStorage.config.contentList );
		
		configStorage.config.contentList.forEach( ( content ) => {
			radioElement.innerHTML += `
			<section class="config--right__content-container">
	            <p class="config--right__contents">${ content }</p>
	            <input class="config--right__content-delete-btn" type="button" value="删除">
            </section>
			`
		} );
		
		const contentListNodeList = radioElement.querySelectorAll( '.config--right__content-container' ) as NodeList;
		contentListNodeList.forEach( ( contentContainer ) => {
			const inputDom = ( <HTMLElement> contentContainer ).querySelector( '.config--right__content-delete-btn' ) as HTMLButtonElement;
			const pDom = ( <HTMLElement> contentContainer ).querySelector( '.config--right__contents' ) as HTMLParagraphElement;
			inputDom.addEventListener( 'click', () => {
				print.log( '删除文本', pDom.innerText );
				configStorage.removeContentFromContentList( pDom.innerText );
				this.contentListContainer;
			} )
		} )
		
		return radioElement;
	}
	
	/** 注册表单 */
	registerFormElement() {
		const form = createElement( {
			tagName: 'form',
			className: [ 'config--container', 'hide' ],
			innerHTML: `
				<h1 class="config--title">配置菜单</h1><button class="config--close-btn">×</button><section class="config--delay"><label class="config--left__content" for="config--right__delay">发送间隔(s):</label><section class="config--right__container"><input id="config--right__delay" type="number" placeholder="请输入发言的时间间隔(单位: s)" step="0.1" min="0.1" required></section></section><section class="config--send-way"><label class="config--left__content">发送方式:</label><section class="config--right__container"><label class="config--right__content" for="config-right__send-way-loop">循环发送<input id="config-right__send-way-loop" type="radio" name="send-way" value="loop"></label><label class="config--right__content" for="config-right__send-way-random">随机发送<input id="config-right__send-way-random" type="radio" name="send-way" value="random"></label></section></section><section class="config--fresh-page"><label class="config--left__content">刷新页面:</label><section class="config--right__container"><label class="config--right__content" for="config--right__fresh-page-true">开启<input id="config--right__fresh-page-true" type="radio" name="is-fresh-page" value="true"></label><label class="config--right__content" for="config--right__fresh-page-false">关闭<input id="config--right__fresh-page-false" type="radio" name="is-fresh-page" value="false"></label></section></section><section class="config--fresh-page"><label class="config--left__content">刷新页面延时(min):</label><section class="config--right__container"><input id="config--right__fresh-page-delay" type="number" placeholder="请输入刷新延时(单位: min)" min="0"></section></section><section class="config--input"><label class="config--left__content">输入文本:</label><section class="config--right__container"><input id="config--right__input" placeholder="请输入要发送的自定义文本"><button id="config--right__input-btn">发送</button></section></section><section class="config--show-content-list"><label class="config--left__content">自定义文本列表:</label><section class="config--right__container"></section></section>
			`,
		} )
		const menuCssString = `
		.hide{display:none !important}input[id^=config]{-webkit-appearance:radio;outline:none;border:solid 1px #f8f8f8;border-radius:5px;margin:0;padding:0}.config--container{width:500px;height:500px;border:2px solid #a6a6a6;border-radius:5px;margin:0 auto;background-color:#ffffff;display:flex;flex-flow:column;align-items:center;position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:9999}.config--container>[class^=config]{width:95%;border:1px solid #f8f8f8;border-radius:5px;margin:5px}.config--container>section{display:flex}.config--title{margin:0;text-align:center;border:none !important}.config--close-btn{font-size:20px;line-height:20px;text-align:center;width:20px !important;height:20px;position:absolute;right:10px;top:10px;border-radius:5px;padding:0;margin:0;background-color:#a6a6a6;color:white}.config--left__content{padding:5px 10px;height:30px;line-height:30px;text-align:center;font-size:15px;font-weight:bolder}.config--right__content{padding:5px 10px;height:30px;line-height:30px;text-align:center;width:40%;margin-right:30px;vertical-align:center}.config--right__container{padding:5px 10px;height:30px;flex:1}input[type="radio"]{width:15px;height:15px;vertical-align:center;transform:translate(5px, 3px)}#config--right__delay,#config--right__input,#config--right__fresh-page-delay{box-sizing:border-box;height:30px;line-height:30px;padding-left:10px;width:100%}#config--right__delay:focus,#config--right__input:focus,#config--right__fresh-page-delay:focus{border:2px solid #a6a6a6}.config--input .config--right__container{display:flex;gap:5px}#config--right__input{width:90%}#config--right__input-btn{width:50px;height:30px}#config--right__input-btn,.config--right__content-delete-btn{border:none;background:#a6a6a6;border-radius:5px;color:#ffffff}.config--show-content-list>.config--left__content{width:100%}.config--show-content-list{flex:1;display:flex;flex-flow:column;overflow-y:scroll;overflow-x:hidden}.config--show-content-list .config--right__container{display:flex;flex-flow:column}.config--right__contents{margin:0;flex:1;width:70%;border:1px solid #f8f8f8;padding:2px}.config--right__content-container{display:flex;padding:5px -0px;gap:5px}
		`;
		addElementToDocument( form, menuCssString );
		
		
		// 关闭菜单事件
		( <HTMLElement> form.querySelector( '.config--close-btn' ) ).addEventListener( 'click', () => {
			this.hideForm();
		} )
	}
	
	/** 开启表单 */
	showForm() {
		this.domList.form.classList.remove( 'hide' );
	}
	
	/** 隐藏表单 */
	hideForm() {
		this.domList.form.classList.add( 'hide' );
	}
	
	/** 阻止form表单自动提交 */
	private preventFormSubmit( form: HTMLFormElement ) {
		form.addEventListener( 'submit', ( e ) => {
			e.preventDefault();
		} );
	}
	
}
