/**
 * index.ts
 * created by 2024/4/5
 * @file 视频页的视频标记
 * @author  Yiero
 * */

/*
* 1. 视频本身的标记
* 2. 视频推荐的标记
* 3. 视频连播的标记
* 4. 视频分p暂时不需要标记
* */

import {
	handleWaitVideoTitleLoad,
} from './CurrentVideo/handleWaitVideoTitleLoad.ts';
import { markCurrentVideo } from './CurrentVideo/markCurrentVideo.ts';
import { selectorConfig } from './config/config.ts';

/**
 * 添加样式
 * */
const addWatchedStyle = ( selector: string ) => {
	GM_addStyle( `
${ selector }.watched-item::after{
    padding: 3px 8px;
    color: #fff;
    font-weight: 700;
    border-radius: 5px;
    margin-left: 12px;
}
${ selector }.is-watched::after{
    content: "已看";
    background-color: hsla(0, 0%, 60%, .77);
}
${ selector }.is-watching::after{
    content: "观看中";
    background-color: rgba(3, 169, 244, .77);
}
	` );
};

/**
 * 监听视频页
 * */
export const listenVideo = async () => {
	// 添加已看/未看样式
	addWatchedStyle( selectorConfig.titleSelector );
	
	// 等待视频标题加载, 已看/观看中标签将挂载在标题后面
	const videoTitleDom = await handleWaitVideoTitleLoad() as HTMLElement;
	
	await markCurrentVideo( videoTitleDom );
};
