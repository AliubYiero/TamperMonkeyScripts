/**
 * GlobalAutoScroll.ts
 * created by 2023/8/19
 * @file
 * @author  Yiero
 * */

export type {
	AutoScroll
}

/** 自动滚动 */
interface AutoScroll {
	/** 滚动速度 */
	movementDistancePerSecond: number;
	
	/** 滚动延时, 停留多少ms再进行滚动 */
	delayPerMs: number | undefined;
	
	/** 开启自动滚动 */
	open: () => void;
	
	/** 关闭自动滚动 */
	close: () => void;
}
