import { getApi } from './getApi.ts'
import { API_PREV_URL } from '../config/EnvConfig.ts'
import { OrderDescription } from '../interfaces/OrderDescription.ts'

/**
 * 根据商品key获取商品详细信息
 *
 * @param {string} itemName - The name of the item to retrieve the order description for.
 * @return {Array<OrderDescription>} - An array of order descriptions for the given item name.
 */
export const api_GetOrderDescription = async ( itemName: string ): Promise<Array<OrderDescription>> => {
	let res = await getApi( API_PREV_URL + itemName )
	return res
		.payload
		.item
		.items_in_set
		.map(
			( orderDescription: {
				[ x: string ]: any;
				url_name: any;
				quantity_for_set: any;
				ducats: any
			} ) => Object.assign(
				{},
				{
					url_name: orderDescription.url_name,
					quantity_for_set: orderDescription.quantity_for_set || 1,
					ducats: orderDescription.ducats
				},
				orderDescription[ 'zh-hans' ]
			)
		);
	
}
