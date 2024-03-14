import { DynamicNodeData } from './DynamicNodeData'

/**
 * 获取动态数据
 * @return { Set<DynamicNodeData> } dynamicNodeDataList
 * */
export function parseDynamicList( dynamicNodeList: NodeList ) {
	const dynamicNodeDataSet: Set<DynamicNodeData> = new Set();
	for ( let dynamicNode of dynamicNodeList ) {
		dynamicNodeDataSet.add( {
			target: dynamicNode as HTMLElement,
			isInsert: !!( <HTMLElement> dynamicNode ).querySelector( '.bili-dyn-more__menu__item[data-type="THREE_POINT_SAVE_AS_PNG"]' ),
		} )
	}
	
	return dynamicNodeDataSet;
}
