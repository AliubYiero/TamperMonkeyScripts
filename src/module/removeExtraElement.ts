/** 移除多余元素 & 优化答题界面UI */
export function removeExtraElement() {
	// @ts-ignore
	GM_addStyle( `
		/* 居中主容器 */
		.app-main {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0;
		}
		
		/* 优化主容器UI */
		.middle-container {
			padding: 10px ${ 16 + 19 + 16 + 10 }px;
			border-radius: 10px;
		}
		
		/* 隐藏多余元素 */
		.vip-quanyi,
		.new-footer,
		.header,
		.answer-box-detail,
		.answer-box-detail,
		.vip-tips,
		.right-float-window,
		.page-main .pull-right > :not(.serch-form)
		{
			display: none;
		}
	` );
}
