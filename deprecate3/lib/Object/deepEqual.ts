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

/**
 * Function to deeply compare two objects for equality.
 *
 * @param obj1 - The first object to compare.
 * @param obj2 - The second object to compare.
 * @returns if the objects are deeply equal, false otherwise.
 */
function deepEqual( obj1: any, obj2: any ): boolean {
	// If either object is not an object, directly compare them
	if ( typeof obj1 !== 'object' || typeof obj2 !== 'object' ) {
		return obj1 === obj2;
	}
	
	// Get the keys of both objects
	const keys1 = Object.keys( obj1 );
	const keys2 = Object.keys( obj2 );
	
	// If the number of keys is different, the objects are not equal
	if ( keys1.length !== keys2.length ) {
		return false;
	}
	
	// Recursively compare the values of each key
	for ( let key of keys1 ) {
		if ( !deepEqual( obj1[ key ], obj2[ key ] ) ) {
			return false;
		}
	}
	
	// All values are equal, return true
	return true;
}
