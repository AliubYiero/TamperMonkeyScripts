/**
 * TypeFormat.ts
 * created by 2023/7/13
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	arrayToMap
}

/** 数组转Map */
const arrayToMap = ( array: any[] ) => {
	const map = new Map();
	for ( let i = 0; i < array.length; i++ ) {
		map.set( i, array[ i ] );
	}
	return map
}
