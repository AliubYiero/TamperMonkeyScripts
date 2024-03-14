/**
 * 返回商品名称
 *
 * @return {string} 商品名称
 */
export const getItemName = (): string => {
	const ITEM_PREV = 'items/';
	const itemNameStartIndex = location.pathname.indexOf( ITEM_PREV ) + ITEM_PREV.length;
	// 获取商品名称
	const itemName = location.pathname.slice( itemNameStartIndex );
	return itemName;
}
