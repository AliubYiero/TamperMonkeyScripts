/**
 * index.ts
 * created by 2024/4/5
 * @file 监听首页视频卡片
 * @author  Yiero
 * */
import {
	handleWaitContainerLoad,
} from './handleWaitContainerLoad/handleWaitContainerLoad.ts';
import {
	observeIndexVideoCardLoad,
} from './observeIndexVideoCardLoad/observeIndexVideoCardLoad.ts';
import {
	triggerVideoCardLoad,
} from './triggerVideoCardLoad/triggerVideoCardLoad.ts';

/** 监听首页 */
export const listenIndex = async () => {
	// 等待首页容器加载完成
	const videoContainer = await handleWaitContainerLoad() as HTMLElement;
	
	// 触发元素加载回调
	triggerVideoCardLoad();
	
	// 监听元素加载事件
	observeIndexVideoCardLoad( videoContainer );
};
