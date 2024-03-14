"use strict";
const configStorage = {
    config: {
        sendDelayPerSecond: 5,
        sendDelayMaxPerSecond: 6,
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
    
    get sendDelayMaxInput() {
        const inputElement = this.domList.form.querySelector( '#config--right__delay-end' );
        inputElement.value = String( configStorage.config.sendDelayMaxPerSecond );
        inputElement.addEventListener( 'change', () => {
            configStorage.config.sendDelayMaxPerSecond = +inputElement.value;
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
    
    get textCodeOpenInput() {
        const radioElement = this.domList.form.querySelector( '#config-right__send-text-code-true' );
        radioElement.checked = configStorage.config.openRandomCode;
        radioElement.addEventListener( 'click', () => {
            if ( radioElement.checked ) {
                this.domList.freshPageDelayInput.disabled = false;
            }
        } );
        return radioElement;
    }
    
    get textCodeCloseInput() {
        const radioElement = this.domList.form.querySelector( '#config-right__send-text-code-false' );
        radioElement.checked = !configStorage.config.openRandomCode;
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
            let text = this.inputContent.value;
            text.split( '\n' ).forEach( ( text ) => {
                if ( !text.trim() ) {
                    return;
                }
                configStorage.config.contentList.push( text.trim() );
            } );
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
    }
    
    preventFormSubmit( form ) {
        form.addEventListener( 'submit', ( e ) => {
            e.preventDefault();
        } );
    }
}
const uiMenu = new UiMenu();
