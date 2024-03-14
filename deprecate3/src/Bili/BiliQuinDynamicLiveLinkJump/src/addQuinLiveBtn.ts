import { isQuin } from './isQuin'

/**
 * 添加Quin直播间跳转按钮
 * @param dynamicDom
 * @return { void }
 * */
export function addQuinLiveBtn( dynamicDom: Node ) {
	if ( !isQuin( <HTMLElement> dynamicDom ) ) {
		return;
	}
	
	const domList: {
		dynamicItem: HTMLElement;
		firstMoreBtn: HTMLElement;
		popoverContainer: HTMLElement;
		moreMenu: HTMLElement;
	} = {
		dynamicItem: dynamicDom as HTMLElement,
		firstMoreBtn: ( <HTMLElement> dynamicDom ).querySelector( '.bili-dyn-more__menu__item' ) as HTMLElement,
		popoverContainer: ( <HTMLElement> dynamicDom ).querySelector( '.bili-popover' ) as HTMLElement,
		moreMenu: ( <HTMLElement> dynamicDom ).querySelector( '.bili-dyn-more__menu' ) as HTMLElement,
	};
	const dynamicItem = dynamicDom as HTMLElement;
	
	
	// 右上角添加链接
	// 添加CC直播链接
	const CCLiveLinkBtn = domList.firstMoreBtn.cloneNode() as HTMLElement;
	CCLiveLinkBtn.dataset.type = 'THREE_POINT_CC_LIVE_LINK';
	CCLiveLinkBtn.innerHTML = '<a href="https://cc.163.com/361433/" target="_blank">跳转CC</a>';
	// 关闭浮窗
	CCLiveLinkBtn.onclick = () => domList.popoverContainer.style.display = 'none';
	
	// 添加抖音链接
	const douyinLiveLinkBtn = ( <HTMLElement> dynamicItem.querySelector( '.bili-dyn-more__menu__item' ) ).cloneNode() as HTMLElement;
	douyinLiveLinkBtn.dataset.type = 'THREE_POINT_DOUYIN_LIVE_LINK';
	douyinLiveLinkBtn.innerHTML = '<a href="https://live.douyin.com/200525029536" target="_blank">跳转抖音</a>';
	// 关闭浮窗
	douyinLiveLinkBtn.onclick = () => domList.popoverContainer.style.display = 'none';
	
	// 添加按钮
	domList.moreMenu.appendChild( CCLiveLinkBtn );
	domList.moreMenu.appendChild( douyinLiveLinkBtn );
}
