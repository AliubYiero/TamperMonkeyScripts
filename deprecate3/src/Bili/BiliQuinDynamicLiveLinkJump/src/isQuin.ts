/**
 * 判断是否是Quin的动态
 * @return {boolean}
 * */
export function isQuin( dynamicDom: HTMLElement ): boolean {
	const upName = ( <HTMLElement> dynamicDom.querySelector( '.bili-dyn-title__text' ) )?.innerText;
	
	return upName === 'Mr.Quin';
}
