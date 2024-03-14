import { OrderDetail } from '../interfaces/OrderDetail.ts'

/**
 * 给商品信息分组(根据在线情况)
 *
 * @param {Array<OrderDetail>} orderList - The list of orders to group.
 * @return {object} - An object containing the grouped orders.
 */
// @ts-ignore
const groupByLoginStatus = ( orderList: Array<OrderDetail> ) => {
	// @ts-ignore - 忽略 ts 无法识别 es2023 Object.groupBy 的问题
	return Object.groupBy(
		orderList,
		( order: OrderDetail ) =>
			order.user.status
	);
}
