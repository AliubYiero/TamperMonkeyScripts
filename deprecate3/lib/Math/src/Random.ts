/**
 * Random.ts
 * created by 2023/8/5
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	randomInt
}

/** 随机数字 */
const randomInt = ( minOrMax: number, max?: number ): number => {
	// 不输入max参数时, 默认为 [0-min]
	if ( !max ) {
		max = minOrMax;
		minOrMax = 0;
	}
	
	// 首先确保 min 和 max 是整数
	minOrMax = Math.floor( minOrMax );
	max = Math.floor( max );
	
	// 生成 [0, max - min] 范围内的随机整数
	const randomNumber = Math.floor( Math.random() * ( max - minOrMax + 1 ) );
	
	// 将随机数加上 min 得到最终结果
	return randomNumber + minOrMax;
}
