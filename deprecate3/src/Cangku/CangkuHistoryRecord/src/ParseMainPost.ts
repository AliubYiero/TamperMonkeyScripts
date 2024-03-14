import { getEls } from '../../../../lib/Shorten'
import { parsePost } from './ParsePost'
import { writeHistoryBtn } from './WriteHistoryBtn'
import { bindNotReadBtnEvent } from './BindNotReadBtnEvent'
import { getReadHistory } from './GetReadHistory'

export type {
	PostListType,
	PostDataListType
}
export {
	parseMainPost,
}

interface PostListType {
	target: HTMLElement;
	achieveId: number
}

interface PostDataListType extends PostListType {
	isRead: boolean;
}

/**
 * 识别主要的帖子卡片区, 判断是否已读
 * */
async function parseMainPost() {
	const postList: PostListType[] = [];
	
	// 获取底部分页, 因为加载完页面才会加载底部分页栏
	const postCardList = getEls( 'span.row .post' );
	
	// 写入数据
	postCardList?.forEach( ( post ) => {
		parsePost( postList, post );
	} );
	
	// 判断帖子是否已读
	const postDataList = await getReadHistory( postList );
	
	// 根据历史写入样式
	writeHistoryBtn( postDataList );
	
	// 根据未看帖子写入点击事件监听(更改样式为已看)
	bindNotReadBtnEvent( postDataList );
}
