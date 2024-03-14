/**
 * stringToCapitalizeCase.ts
 * created by 2023/7/16
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export { stringToCapitalizeCase }

const stringToCapitalizeCase = ( word: string ) => {
	const lowerWord = word.trim().toLowerCase();
	return lowerWord.charAt( 0 ).toUpperCase() + lowerWord.slice( 1 );
}
