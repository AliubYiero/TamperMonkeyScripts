/**
 * ShowInfo.ts
 * created by 2023/7/13
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	addInfo
}

function addInfo( correctAnswer: string[] ) {
	let correctAnswerElement = '';
	correctAnswer.forEach( content => {
		correctAnswerElement += `<p class="answer-show-content">${ content }</p>`;
	} )
	const answerShow = document.createElement( 'section' );
	answerShow.classList.add( 'answer-show', 'answer-show__display' );
	answerShow.innerHTML = correctAnswerElement;
	
	document.body.append( answerShow );
	setTimeout( () => {
		answerShow.classList.remove( 'answer-show__display' );
		answerShow.classList.add( 'answer-show__hide' );
	}, 3000 )
}
