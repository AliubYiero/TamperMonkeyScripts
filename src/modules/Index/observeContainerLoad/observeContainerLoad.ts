import { elementWaiter } from '../../../utils';

// 监听首页容器加载
export const observeContainerLoad = async () => {
	const containerSelector = '.recommended-container_floor-aside > .container';
	
	return await elementWaiter( containerSelector );
};
