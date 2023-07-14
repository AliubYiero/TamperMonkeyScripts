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
	
	constructor( correctAnswer: string[] ) {
		this._correctAnswer = correctAnswer
		
		this._correctAnswerElement = '';
		
	}
	
	private _answerShow: HTMLElement | undefined = void 0;
	
	get answerShow(): HTMLElement | undefined {
		return this._answerShow;
	}
	
	set answerShow( value: HTMLElement ) {
		this._answerShow = value
	}
	
	private _correctAnswerElement: string
	
	get correctAnswerElement(): string {
		return this._correctAnswerElement
	}
	
	set correctAnswerElement( value: string ) {
		this._correctAnswerElement = value
	}
	
	private _correctAnswer: string[]
	
	get correctAnswer(): string[] {
		return this._correctAnswer
	}
	
	set correctAnswer( value: string[] ) {
		this._correctAnswer = value
	}
	
	create() {
		this._correctAnswer.forEach( content => {
			this._correctAnswerElement += `<p class="answer-show-content">${ content }</p>`;
		} )
		this._answerShow = document.createElement( 'section' );
		this._answerShow.classList.add( 'answer-show', 'answer-show__display' );
		this._answerShow.innerHTML = this._correctAnswerElement;
		
		document.body.append( this._answerShow );
		
		this.destroy();
	}
	
	destroy( ms: number = 3000 ) {
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
}
