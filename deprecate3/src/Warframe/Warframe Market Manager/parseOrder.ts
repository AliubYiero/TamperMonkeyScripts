import { getItemName } from './src/getItemName.ts'
import { OrderDescription } from './interfaces/OrderDescription.ts'
import {
	api_GetOrderDescription
} from './api/api_GetOrderDescription.ts'
import { api_GetOrderDetails } from './api/api_GetOrderDetails.ts'
import {
	parseStandardPlatinumPrice
} from './src/parseStandardPlatinumPrice.ts'
import { groupByPlatinum } from './src/groupByPlatinum.ts'
import { printParseOrderDetail } from './src/printParseOrderDetail.ts'

/**
 * 通过检索商品名称、获取订单描述、迭代订单描述列表以获取订单详细信息、计算标准白金价格并打印解析的订单详细信息来解析订单。
 */
export const parseOrder = async () => {
	// 获取商品名称
	const itemName = getItemName();
	
	// 获取商品信息(包括套装信息)
	const orderDescriptionList: Array<OrderDescription> = await api_GetOrderDescription( itemName );
	
	// 遍历商品信息, 输出解析后字符串数组
	let parseOrderDetailList = orderDescriptionList.map( async ( orderDescription ) => {
		const {
			url_name,
		} = orderDescription
		
		// 获取商品详细信息
		const orderList = await api_GetOrderDetails( url_name );
		
		// 获取标准白金价
		const standardPlatinum = parseStandardPlatinumPrice( groupByPlatinum( orderList ) );
		
		// 输出解析后字符串
		const parseResult = printParseOrderDetail( orderDescription, standardPlatinum );
		
		return parseResult;
	} );
	
	// 将当前商品置顶
	const topCurrentParseOrderDetailList: string[] = [];
	for ( const parseOrderDetail of parseOrderDetailList ) {
		const orderDetail = await parseOrderDetail;
		if ( orderDetail.includes( itemName ) ) {
			topCurrentParseOrderDetailList.unshift( orderDetail );
		}
		else {
			topCurrentParseOrderDetailList.push( orderDetail );
		}
	}
	
	// 返回置顶后的解析订单
	return topCurrentParseOrderDetailList;
	
};
