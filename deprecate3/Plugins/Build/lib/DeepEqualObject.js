/**
 * DeepEqualObject.js
 * created by 2023/8/7
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	deepEqualObj
}

/**
 * 判断两个对象是否相等
 * @param {{[propName: string]: any}} obj1
 * @param {{[propName: string]: any}}obj2
 * @return {boolean}
 * */
function deepEqualObj( obj1, obj2 ) {
	// 基本类型直接比较
	if ( typeof obj1 !== 'object' || typeof obj2 !== 'object' ) {
		return obj1 === obj2;
	}
	
	const keys1 = Object.keys( obj1 );
	const keys2 = Object.keys( obj2 );
	
	// 属性数量不同，返回 false
	if ( keys1.length !== keys2.length ) {
		return false;
	}
	
	// 属性值不同，返回 false
	for ( let key of keys1 ) {
		if ( !deepEqualObj( obj1[key], obj2[key] ) ) {
			return false;
		}
	}
	
	// 所有属性值都相同，返回 true
	return true;
}
