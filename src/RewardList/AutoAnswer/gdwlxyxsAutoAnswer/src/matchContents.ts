/**
 * matchContents.ts
 * created by 2023/7/20
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */
export {
	matchContentsWithoutSign,
	matchContentsWithoutLetter
}

/** 去除符号比对文本，用于比对问题 */
function matchContentsWithoutSign( Content1: string, Content2: string ): boolean | RegExpMatchArray | null {
	const signList = /[，。！？、；：÷×「」“”《》．（）_—.\-=+`~@#$%…&*<>/;'"{}\[\]()\s]/g;
	Content1 = Content1.replace( signList, '' ).trim();
	Content2 = Content2.replace( signList, '' ).trim();
	
	console.log( `[MatchContent]\n[${ Content1 }]\n||\n${ Content2 }` );
	return Content1 === Content2 ||
		Boolean( Content1.match( new RegExp( Content2 ) ) ) ||
		Boolean( Content2.match( new RegExp( Content1 ) ) );
}

/** 去除编号比对文本，用于比对答案 */
function matchContentsWithoutLetter( answerContent: string, optionContent: string ): boolean | RegExpMatchArray | null {
	const signList = /^[ABCDEFG][.．、]/g;
	answerContent = answerContent.replace( signList, '' ).trim();
	optionContent = optionContent.replace( signList, '' ).trim();
	
	console.log( `[MatchContent]\n[${ answerContent }]\n||\n${ optionContent }` );
	return answerContent === optionContent
}
