import { DynamicNodeData } from './DynamicNodeData'
import { addSaveBtn } from './AddSaveBtn'

/**
 * 为每一个帖子添加保存为图片的按钮
 * */
export function addDynamicSaveBtn( dynamicNodeDataSet: Set<DynamicNodeData> ) {
	dynamicNodeDataSet.forEach( addSaveBtn );
}
