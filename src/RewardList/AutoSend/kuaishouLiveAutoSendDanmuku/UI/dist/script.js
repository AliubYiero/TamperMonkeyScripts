"use strict";
const configStorage = {
    config: {
        sendDelayPerSecond: 5,
        sendWay: 0,
        isOpenFreshAutoSend: true,
        freshPageDelayPerMinute: 0,
        contentList: [
            '测试自定义文本1测试自定义文本1测试自定义文本1测试自定义文本1测试自定义文本1测试自定义文本1测试自定义文本1',
            '测试自定义文本2',
            '测试自定义文本3',
            '测试自定义文本4',
            '测试自定义文本5',
        ],
        openRandomCode: true,
    }
};

class UiMenu {
    domList = {};
    
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
    
    get form() {
        const form = document.querySelector( '.config--container' );
        this.preventFormSubmit( form );
        return form;
    }
    
    get sendDelayInput() {
        const inputElement = this.domList.form.querySelector( '#config--right__delay' );
        inputElement.value = String( configStorage.config.sendDelayPerSecond );
        inputElement.addEventListener( 'change', () => {
            configStorage.config.sendDelayPerSecond = +inputElement.value;
        } );
        return inputElement;
    }
    
    get sendWayLoopInput() {
        const radioElement = this.domList.form.querySelector( '#config-right__send-way-random' );
        radioElement.checked = !!configStorage.config.sendWay;
        return radioElement;
    }
    
    get sendWayRandomInput() {
        const radioElement = this.domList.form.querySelector( '#config-right__send-way-loop' );
        radioElement.checked = !configStorage.config.sendWay;
        return radioElement;
    }
    
    get freshPageDelayOpenInput() {
        const radioElement = this.domList.form.querySelector( '#config--right__fresh-page-true' );
        radioElement.checked = !!configStorage.config.freshPageDelayPerMinute;
        radioElement.addEventListener( 'click', () => {
            if ( radioElement.checked ) {
                this.domList.freshPageDelayInput.disabled = false;
            }
        } );
        return radioElement;
    }
    
    get freshPageDelayCloseInput() {
        const radioElement = this.domList.form.querySelector( '#config--right__fresh-page-false' );
        console.log( configStorage.config.freshPageDelayPerMinute );
        radioElement.checked = !configStorage.config.freshPageDelayPerMinute;
        radioElement.addEventListener( 'click', () => {
            if ( radioElement.checked ) {
                this.domList.freshPageDelayInput.disabled = true;
            }
        } );
        return radioElement;
    }
    
    get freshPageDelayInput() {
        const radioElement = this.domList.form.querySelector( '#config--right__fresh-page-delay' );
        radioElement.value = String( configStorage.config.freshPageDelayPerMinute );
        return radioElement;
    }
    
    get inputContent() {
        const inputContentElement = this.domList.form.querySelector( '#config--right__input' );
        return inputContentElement;
    }
    
    get inputContentSubmit() {
        const inputContentSubmitBtn = this.domList.form.querySelector( '#config--right__input-btn' );
        inputContentSubmitBtn.addEventListener( 'click', () => {
            configStorage.config.contentList.push( this.inputContent.value );
            this.inputContent.value = '';
            this.contentListContainer;
        } );
        return inputContentSubmitBtn;
    }
    
    get contentListContainer() {
        const radioElement = this.domList.form.querySelector( '.config--show-content-list .config--right__container' );
        radioElement.innerHTML = '';
        console.log( configStorage.config.contentList );
        configStorage.config.contentList.forEach( ( content ) => {
            radioElement.innerHTML += `
			<section class="config--right__content-container">
	            <p class="config--right__contents">${ content }</p>
	            <input class="config--right__content-delete-btn" type="button" value="删除">
            </section>
			`;
        } );
        const contentListNodeList = radioElement.querySelectorAll( '.config--right__content-container' );
        contentListNodeList.forEach( ( contentContainer ) => {
            const inputDom = contentContainer.querySelector( '.config--right__content-delete-btn' );
            const pDom = contentContainer.querySelector( '.config--right__contents' );
            inputDom.addEventListener( 'click', () => {
                console.log( pDom.innerText );
            } );
        } );
        return radioElement;
    }
    
    registerFormElement() {
        const form = document.createElement( 'form' );
        form.className = 'config--container';
        form.innerHTML = `
<h1 class="config--title">配置菜单</h1><section class="config--delay"><label class="config--left__content" for="config--right__delay">发送间隔(s):</label><section class="config--right__container"><input id="config--right__delay" type="number" placeholder="请输入发言的时间间隔(单位: s)" step="0.1" min="0.1" required></section></section><section class="config--send-way"><label class="config--left__content">发送方式:</label><section class="config--right__container"><label class="config--right__content" for="config-right__send-way-loop">循环发送<input id="config-right__send-way-loop" type="radio" name="send-way" value="loop"></label><label class="config--right__content" for="config-right__send-way-random">随机发送<input id="config-right__send-way-random" type="radio" name="send-way" value="random"></label></section></section><section class="config--fresh-page"><label class="config--left__content">刷新页面:</label><section class="config--right__container"><label class="config--right__content" for="config--right__fresh-page-true">开启<input id="config--right__fresh-page-true" type="radio" name="is-fresh-page" value="true"></label><label class="config--right__content" for="config--right__fresh-page-false">关闭<input id="config--right__fresh-page-false" type="radio" name="is-fresh-page" value="false"></label></section></section><section class="config--fresh-page"><label class="config--left__content">刷新页面延时(min):</label><section class="config--right__container"><input id="config--right__fresh-page-delay" type="number" placeholder="请输入刷新延时(单位: min)" disabled min="0"></section></section><section class="config--input"><label class="config--left__content">输入文本:</label><section class="config--right__container"><input id="config--right__input" placeholder="请输入要发送的自定义文本"><button id="config--right__input-btn">发送</button></section></section><section class="config--show-content-list"><label class="config--left__content">自定义文本列表:</label><section class="config--right__container"></section></section>
`;
        document.body.appendChild( form );
    }
    
    preventFormSubmit( form ) {
        form.addEventListener( 'submit', ( e ) => {
            e.preventDefault();
        } );
    }
}

const uiMenu = new UiMenu();
