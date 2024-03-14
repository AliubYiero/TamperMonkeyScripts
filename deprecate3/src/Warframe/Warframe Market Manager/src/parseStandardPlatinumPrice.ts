import { OrderDetail } from '../interfaces/OrderDetail.ts'
import {
	PlatinumGroupTuple
} from '../interfaces/platinumGroupTuple.ts'

/**
 * 获取标准值白金和数量
 *
 * @param {Object.<string, Array<OrderDetail>>} platinumGroup - The platinum group to calculate the price from.
 * @returns {Object} - An object containing the calculated prices and numbers.
 */
export const parseStandardPlatinumPrice = ( platinumGroup: {
	[ s: string ]: Array<OrderDetail>
} ): {
	number: number;
	minPriceOnline: number;
	secondNumber: number;
	price: number;
	minPrice: number;
	secondPrice: number
} => {
	const platinumGroupTuple: PlatinumGroupTuple[] = Object.entries( platinumGroup );
	// @ts-ignore - 忽略 ts 无法识别 es2023 Array.toSorted 的问题
	const sortedNumberPlatinumGroup = platinumGroupTuple.toSorted(
		( a: PlatinumGroupTuple, b: PlatinumGroupTuple ) => b[ 1 ].length - a[ 1 ].length
	);
	// @ts-ignore - 忽略 ts 无法识别 es2023 Array.toSorted 的问题
	const sortedPricePlatinumGroup = platinumGroupTuple.toSorted(
		( a: PlatinumGroupTuple, b: PlatinumGroupTuple ) => Number( a[ 0 ] ) - Number( b[ 0 ] )
	) as Array<[ string, OrderDetail[] ]>;
	
	const minPrice = Number( sortedPricePlatinumGroup[ 0 ][ 0 ] );
	const minPriceOnline = Number( ( <[ string, OrderDetail[] ]> sortedPricePlatinumGroup.find( ( item ) =>
		item[ 1 ].find( ( detail ) => detail.user.status === 'ingame' )
	) )[ 0 ] );
	const price = Number( sortedNumberPlatinumGroup[ 0 ][ 0 ] );
	const number = Number( sortedNumberPlatinumGroup[ 0 ][ 1 ].length );
	const secondPrice = Number( sortedNumberPlatinumGroup[ 1 ][ 0 ] );
	const secondNumber = Number( sortedNumberPlatinumGroup[ 1 ][ 1 ].length );
	
	return {
		minPrice,
		minPriceOnline,
		price,
		number,
		secondPrice,
		secondNumber,
	}
}
