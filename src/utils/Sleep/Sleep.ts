/**
 * Sleep.ts
 * created by 2024/3/24
 * @file 睡眠等待函数
 * @author  Yiero
 * */

/**
 * 等待多少s后才执行
 * */
export const sleep = ( timeoutPerSecond: number ) => {
	return new Promise( resolve => {
		setTimeout( resolve, timeoutPerSecond * 1000 );
	} );
};
