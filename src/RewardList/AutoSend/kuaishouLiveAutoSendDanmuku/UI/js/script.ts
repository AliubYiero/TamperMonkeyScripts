/**
 * script.ts
 * created by 2023/8/5
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

const configStorage = {
	config: {
		/** 弹幕发送延时 (s) */
		sendDelayPerSecond: 5,
		
		/** 发送方式 (0-loop | 1-random) */
		sendWay: 0,
		
		/** 开启定时刷新后自动发送弹幕 */
		isOpenFreshAutoSend: true,
		
		/** 定时刷新页面延时 (s); 0表示关闭定时刷新页面 */
		freshPageDelayPerMinute: 0,
		
		/** 输入文本 */
		contentList: [
			'测试自定义文本1测试自定义文本1测试自定义文本1测试自定义文本1测试自定义文本1测试自定义文本1测试自定义文本1',
			'测试自定义文本2',
			'测试自定义文本3',
			'测试自定义文本4',
			'测试自定义文本5',
		],
		
		/** 开启文本乱码后缀 */
		openRandomCode: true,
	}
}

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
		this.domList.freshPageDelayOpenInput = this.freshPageDelayOpenInput;
		this.domList.freshPageDelayCloseInput = this.freshPageDelayCloseInput;
		this.domList.freshPageDelayInput = this.freshPageDelayInput;
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
	
	/** 获取发送方式(循环)表单项*/
	get sendWayLoopInput(): HTMLInputElement {
		const radioElement = this.domList.form.querySelector( '#config-right__send-way-random' ) as HTMLInputElement;
		radioElement.checked = !!configStorage.config.sendWay;
		return radioElement;
	}
	
	/** 获取发送方式(随机)表单项*/
	get sendWayRandomInput(): HTMLInputElement {
		const radioElement = this.domList.form.querySelector( '#config-right__send-way-loop' ) as HTMLInputElement;
		radioElement.checked = !configStorage.config.sendWay;
		return radioElement;
	}
	
	/** 获取刷新页面状态(开启)表单项 */
	get freshPageDelayOpenInput(): HTMLInputElement {
		const radioElement = this.domList.form.querySelector( '#config--right__fresh-page-true' ) as HTMLInputElement;
		radioElement.checked = !!configStorage.config.freshPageDelayPerMinute;
		radioElement.addEventListener( 'click', () => {
			if ( radioElement.checked ) {
				( <HTMLInputElement> this.domList.freshPageDelayInput ).disabled = false;
			}
		} )
		return radioElement;
	}
	
	/** 获取刷新页面状态(关闭)表单项 */
	get freshPageDelayCloseInput(): HTMLInputElement {
		const radioElement = this.domList.form.querySelector( '#config--right__fresh-page-false' ) as HTMLInputElement;
		console.log( configStorage.config.freshPageDelayPerMinute );
		radioElement.checked = !configStorage.config.freshPageDelayPerMinute;
		
		radioElement.addEventListener( 'click', () => {
			if ( radioElement.checked ) {
				( <HTMLInputElement> this.domList.freshPageDelayInput ).disabled = true;
			}
		} )
		
		return radioElement;
	}
	
	/** 获取刷新页面延时表单项 */
	get freshPageDelayInput(): HTMLInputElement {
		const radioElement = this.domList.form.querySelector( '#config--right__fresh-page-delay' ) as HTMLInputElement;
		radioElement.value = String( configStorage.config.freshPageDelayPerMinute );
		return radioElement;
	}
	
	/** 获取输入文本表单项 */
	get inputContent(): HTMLInputElement {
		const inputContentElement = this.domList.form.querySelector( '#config--right__input' ) as HTMLInputElement;
		
		return inputContentElement;
	}
	
	/** 获取输入文本提交表单项 */
	get inputContentSubmit(): HTMLInputElement {
		const inputContentSubmitBtn = this.domList.form.querySelector( '#config--right__input-btn' ) as HTMLInputElement;
		inputContentSubmitBtn.addEventListener( 'click', () => {
			configStorage.config.contentList.push( this.inputContent.value );
			this.inputContent.value = '';
			this.contentListContainer;
		} )
		return inputContentSubmitBtn;
	}
	
	/** 获取自定义文本列表表单项 */
	get contentListContainer(): HTMLDivElement {
		const radioElement = this.domList.form.querySelector( '.config--show-content-list .config--right__container' ) as HTMLDivElement;
		radioElement.innerHTML = '';
		console.log( configStorage.config.contentList );
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
				console.log( pDom.innerText );
			} )
		} )
		return radioElement;
	}
	
	/** 注册表单 */
	registerFormElement() {
		const form = document.createElement( 'form' );
		form.className = 'config--container';
		form.innerHTML = `
<h1 class="config--title">配置菜单</h1><section class="config--delay"><label class="config--left__content" for="config--right__delay">发送间隔(s):</label><section class="config--right__container"><input id="config--right__delay" type="number" placeholder="请输入发言的时间间隔(单位: s)" step="0.1" min="0.1" required></section></section><section class="config--send-way"><label class="config--left__content">发送方式:</label><section class="config--right__container"><label class="config--right__content" for="config-right__send-way-loop">循环发送<input id="config-right__send-way-loop" type="radio" name="send-way" value="loop"></label><label class="config--right__content" for="config-right__send-way-random">随机发送<input id="config-right__send-way-random" type="radio" name="send-way" value="random"></label></section></section><section class="config--fresh-page"><label class="config--left__content">刷新页面:</label><section class="config--right__container"><label class="config--right__content" for="config--right__fresh-page-true">开启<input id="config--right__fresh-page-true" type="radio" name="is-fresh-page" value="true"></label><label class="config--right__content" for="config--right__fresh-page-false">关闭<input id="config--right__fresh-page-false" type="radio" name="is-fresh-page" value="false"></label></section></section><section class="config--fresh-page"><label class="config--left__content">刷新页面延时(min):</label><section class="config--right__container"><input id="config--right__fresh-page-delay" type="number" placeholder="请输入刷新延时(单位: min)" disabled min="0"></section></section><section class="config--input"><label class="config--left__content">输入文本:</label><section class="config--right__container"><input id="config--right__input" placeholder="请输入要发送的自定义文本"><button id="config--right__input-btn">发送</button></section></section><section class="config--show-content-list"><label class="config--left__content">自定义文本列表:</label><section class="config--right__container"></section></section>
`;
		document.body.appendChild( form );
	}
	
	/** 阻止form表单自动提交 */
	private preventFormSubmit( form: HTMLFormElement ) {
		form.addEventListener( 'submit', ( e ) => {
			e.preventDefault();
		} );
	}
}

const uiMenu = new UiMenu();
