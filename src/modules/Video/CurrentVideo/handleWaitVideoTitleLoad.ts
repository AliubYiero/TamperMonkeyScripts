import { elementWaiter } from '../../../utils';
import { selectorConfig } from '../config/config.ts';

/**
 * 等待视频标题加载, 已看/观看中标签将挂载在标题后面
 * */
export const handleWaitVideoTitleLoad = async () => {
	const selector = selectorConfig.titleSelector;
	return await elementWaiter( selector, {
		delayPerSecond: .3,
	} );
};
