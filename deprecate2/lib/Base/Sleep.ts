/**
 * Sleep.ts
 * created by 2023/7/12
 * @file 睡眠函数。
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	Sleep
}


class Sleep {
	/** 延时睡眠等待 */
	static time( delay: number = 1 ) {
		return new Promise( resolve => {
			setTimeout( resolve, delay * 1000 );
		} )
	}
	
	/** 页面加载等待 */
	static windowLoad( delay: number = 0 ) {
		return new Promise( resolve => {
			window.addEventListener( 'load', () => {
				setTimeout( resolve, delay * 1000 );
			} )
		} )
	}
}
