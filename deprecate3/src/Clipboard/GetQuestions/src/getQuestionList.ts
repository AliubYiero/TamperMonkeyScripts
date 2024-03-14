export function getQuestionList(
	radioSelector: string,
	replaceRule: ( questionInnerText: string ) => string
) {
	const questionStringList: string[] = [];
	// 单选题
	document.querySelectorAll( radioSelector ).forEach(
		question => {
			const string = replaceRule( ( <HTMLElement> question ).innerText );
			
			questionStringList.push( string );
		} );
	return questionStringList;
}
