import { OrderDescription } from '../interfaces/OrderDescription.ts'
import { ParseOrderDetail } from '../interfaces/parseOrderDetail.ts'

/**
 * 生成一个字符串，其中包含已解析的订单详细信息。
 *
 * @param {OrderDescription} orderDescription - the description of the order
 * @param {ParseOrderDetail} standardPlatinum - the standard platinum details
 * @return {string} the parsed order details as a string
 */
export const printParseOrderDetail = ( orderDescription: OrderDescription, standardPlatinum: ParseOrderDetail ): string => {
	const parseList: string[] = [];
	
	// 解构数据
	const {
		url_name,
		item_name,
		description,
		quantity_for_set,
		ducats,
	} = orderDescription;
	const {
		minPrice,
		minPriceOnline,
		price,
		number,
		secondPrice,
		secondNumber,
	} = standardPlatinum;
	
	// 计算杜卡德金币性价比
	const ducatsCostEffective = ducats && Math.round( ducats / standardPlatinum.price * 100 ) / 100;
	
	// 解析数据, 输出字符串
	parseList.push( `名称: ${ item_name } ( ${ url_name } )` );
	parseList.push( `描述: ${ description }` );
	parseList.push( `需求数量: ${ quantity_for_set }` );
	parseList.push( `标准价: ${ price } ( ${ number }个在售 )` );
	parseList.push( `第二标准价: ${ secondPrice } ( ${ secondNumber }个在售 )` );
	parseList.push( `最低价: ${ minPrice } ( 当前在线最低价 ${ minPriceOnline } )` );
	if ( ducatsCostEffective ) {
		parseList.push( `售出杜卡德金币数量: ${ ducats }` );
		parseList.push( `售出杜卡德金币性价比: ${ ducatsCostEffective } (根据标准值计算, 1白金 = ${ ducatsCostEffective }杜卡德金币)` );
	}
	
	return parseList.join( '\n' );
}
