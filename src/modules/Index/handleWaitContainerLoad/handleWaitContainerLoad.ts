import { elementWaiter } from '../../../utils';

// 监听首页容器加载
export const handleWaitContainerLoad = async () => {
	const containerSelector = '.recommended-container_floor-aside > .container';
	
	return await elementWaiter( containerSelector );
};
