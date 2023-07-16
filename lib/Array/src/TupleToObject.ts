/**
 * TupleToObject.ts
 * created by 2023/7/16
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	tupleToObject
}

/** 将两个长度相同的数组，转化成对象 */
const tupleToObject = ( keyArray: string[], valueArray: any[] ): { [ propName: string ]: any } => {
	return keyArray.reduce( ( obj: { [ propName: string ]: any }, key, index ) => {
		obj[ key ] = valueArray[ index ];
		return obj;
	}, {} as { [ propName: string ]: any } ); // 在这里添加了类型注释
};
