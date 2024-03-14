/**
 * deepEqual.ts
 * created by 2023/7/16
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */
export {
	deepEqual
}

function deepEqual( obj1, obj2 ) {
	if ( typeof obj1 !== 'object' || typeof obj2 !== 'object' ) {
		return obj1 === obj2; // 基本类型直接比较
	}
	
	const keys1 = Object.keys( obj1 );
	const keys2 = Object.keys( obj2 );
	
	if ( keys1.length !== keys2.length ) {
		return false; // 属性数量不同，直接返回 false
	}
	
	for ( let key of keys1 ) {
		if ( !deepEqual( obj1[ key ], obj2[ key ] ) ) {
			return false; // 属性值不同，直接返回 false
		}
	}
	
	return true; // 所有属性值都相同，返回 true
}
