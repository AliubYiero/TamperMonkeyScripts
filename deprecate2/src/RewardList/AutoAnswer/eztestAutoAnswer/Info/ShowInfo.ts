/**
 * ShowInfo.ts
 * created by 2023/7/13
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	AddInfoElement
}


class AddInfoElement {
	private timer: NodeJS.Timeout | undefined = undefined;
	
	constructor() {
		
		// 初始化创建答题容器
		this._container = document.createElement( 'section' );
		this._container.classList.add( 'answer-show-container', 'hide' );
		document.body.append( this._container );
		
	}
	
	private _container: HTMLElement = document.createElement( 'section' );
	
	get container(): HTMLElement {
		return this._container
	}
	
	set container( value: HTMLElement ) {
		this._container = value
	}
	
	private _answerShow: HTMLElement | undefined = void 0;
	
	get answerShow(): HTMLElement | undefined {
		return this._answerShow;
	}
	
	set answerShow( value: HTMLElement ) {
		this._answerShow = value
	}
	
	private _correctAnswerElement: string = '';
	
	get correctAnswerElement(): string {
		return this._correctAnswerElement
	}
	
	set correctAnswerElement( value: string ) {
		this._correctAnswerElement = value
	}
	
	
	create( correctAnswer: string[] ) {
		// 获取题目
		this._correctAnswerElement = '';
		correctAnswer.forEach( content => {
			this._correctAnswerElement += `<p class="answer-show-content">${ content }</p>`;
		} )
		this._answerShow = document.createElement( 'section' );
		this._answerShow.classList.add( 'answer-show', 'answer-show__display' );
		this._answerShow.innerHTML = this._correctAnswerElement;
		
		// 添加到页面
		while ( this._container.firstChild ) { // 移除旧元素
			this._container.removeChild( this._container.firstChild );
		}
		this._container.append( this._answerShow );
		
		// 延时销毁元素
		this.destroy();
	}
	
	
	destroy( ms: number = 2000 ) {
		this.timer = setTimeout( () => {
			this._answerShow?.classList.remove( 'answer-show__display' );
			this._answerShow?.classList.add( 'answer-show__hide' );
		}, ms );
	}
	
	clear() {
		this._answerShow?.classList.remove( 'answer-show__display' );
		this._answerShow?.classList.add( 'answer-show__hide' );
		clearTimeout( this.timer );
	}
	
	toggleContainer() {
		this._container.classList.toggle( 'hide' );
	}
}
