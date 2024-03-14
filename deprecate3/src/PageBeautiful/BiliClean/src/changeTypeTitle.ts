import { getElement } from '../../../../lib/Listener/ElementAdd'
import { getEls } from '../../../../lib/Shorten'

export {
	changeTypeTitle
}

/**
 * 改变动态分类标题
 * */
async function changeTypeTitle() {
	// 储存选择器
	const selector = '.bili-dyn-list-tabs__list > .bili-dyn-list-tabs__item';
	
	// 等待元素加载
	await getElement( document.body, selector, 0, 0.1 );
	
	// 获取元素
	const dynamicTypeList = getEls( selector );
	
	// 更改文本
	if ( dynamicTypeList ) {
		// 将 `全部` 更换成 `动态`
		( <HTMLElement> dynamicTypeList[ 0 ] ).innerText = '动态';
		// 将 `视频投稿` 更换成 `视频`
		( <HTMLElement> dynamicTypeList[ 1 ] ).innerText = '视频';
		// 将 `看番看剧` 更换成 `番剧`
		( <HTMLElement> dynamicTypeList[ 2 ] ).innerText = '番剧';
	}
}
