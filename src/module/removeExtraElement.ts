import { urlJudge } from '../utils';

/** 移除多余元素 & 优化答题界面UI */
export function removeExtraElement() {
	// 如果是主页, 不进行更改
	if (
		!urlJudge( /^https:\/\/www.zaixiankaoshi.com\/(online\/\?paperId)|(mnks\/simulation)/ )
	) {
		return;
	}
	
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
			padding: 10px ${ 16 + 19 + 16 + 10 } px;
			border-radius: 10px;
		}
		
		/*显示ai解析*/
		.prative-page .answer-box .hide-height .answer-analysis {
			margin-right: 8px;
			width: 100%;
			-webkit-line-clamp: 1;
			overflow: hidden;
			white-space: normal;
		}
		
		/* 隐藏多余元素 */
		.vip-quanyi,
		.new-footer,
		.header,
		.vip-tips,
		.right-float-window,
		.el-button.el-button--warning.el-button--mini,
		.page-main .pull-right > :not(.serch-form) {
			display: none;
		}
	` );
}
