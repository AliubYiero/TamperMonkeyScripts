import { getApi } from './getApi.ts'
import { API_PREV_URL, TIMEOUT_EXPIRE } from '../config/EnvConfig.ts'

/**
 * 根据商品key获取商品的出售信息
 *
 * @param {string} itemName - The name of the item to retrieve order details for.
 * @return {Array} An array of orders that meet the filter criteria.
 */
export const api_GetOrderDetails = async ( itemName: string ): Promise<Array<any>> => {
	return getApi( API_PREV_URL + itemName + '/orders' ).then(
		res => {
			return res
				.payload
				.orders
				.filter(
					( order: {
						order_type: string;
						visible: any;
						user: { last_seen: string }
					} ) => order.order_type === 'sell'
						&& order.visible
						&& ( Date.now() - Date.parse( order.user.last_seen ) ) < TIMEOUT_EXPIRE.THREE_DAY
				)
		}
	);
}
