import { getNext20Minute } from './getNext20Minute.ts'

/**
 * 获取与下一个整数20分钟需要等待时间的毫秒数
 * 不精准计时, 精度为分钟级别
 * */
export const getWaitTimePerMs = () => {
	const nextTime = getNext20Minute();
	return ( nextTime - new Date().getMinutes() ) * 60 * 1000;
}
