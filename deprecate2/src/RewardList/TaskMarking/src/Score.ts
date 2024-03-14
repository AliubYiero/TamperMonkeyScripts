/**
 * Score.ts
 * created by 2023/7/12
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { Sleep } from '../../../../lib/Base/Sleep'

export {
	getScoreInput,
	getRandomMath,
	writeScore,
}

/** 获取分数输入框 */
function getScoreInput() {
	return document.querySelector( '[name=score]' ) as HTMLInputElement;
}

/** 获取随机数字 */
function getRandomMath( min: number, max: number ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min as number;
}


/** 填写分值 */
async function writeScore() {
	try {
		const scoreInput = getScoreInput();
		console.info( 'get input element successfully.' );
		const score = getRandomMath( 90, 100 );
		console.info( 'get random score successfully.' );
		
		scoreInput.focus();
		await Sleep.time( 1 );
		// @ts-ignore
		const inputElement = $( scoreInput )
		inputElement.val( score ).triggerHandler( 'input' );
		await Sleep.time( 1 );
		scoreInput.blur();
		await Sleep.time( 1 );
		scoreInput.click();
		
		return 'score write successfully!'
	} catch ( e ) {
		const errorMsg = '[error] score write error!';
		console.error( errorMsg );
		
		return errorMsg;
	}
	
}
