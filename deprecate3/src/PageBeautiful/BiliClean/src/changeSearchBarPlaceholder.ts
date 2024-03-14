import { getElement } from '../../../../lib/Listener/ElementAdd'
import { getEl } from '../../../../lib/Shorten'

export async function changeSearchBarPlaceholder( title: string ) {
	const selector = '.search-bar > input';
	
	// 获取元素
	await getElement( document.body, selector, 0, 0.5 );
	const inputElement = getEl( selector ) as HTMLInputElement;
	
	// 改变placeholder
	inputElement.placeholder = title;
}
