import { getEls } from '../../../../lib/Shorten'
import { parsePost } from './ParsePost'
import { writeHistoryBtn } from './WriteHistoryBtn'
import { PostListType } from './ParseMainPost'
import { getReadHistory } from './GetReadHistory'

/**
 * 识别帖子底部的卡片区, 判断是否已读
 * */
export async function parseAchieveBottomPost() {
	const postList: PostListType[] = [];
	
	// 获取侧边帖子卡片内部
	const postCardList = getEls( '.related-post .related-post-card' );
	
	// 写入数据
	postCardList?.forEach( ( post ) => {
		parsePost( postList, post );
	} );
	
	// 判断帖子是否已读
	const postDataList = await getReadHistory( postList );
	
	// 根据历史写入样式
	writeHistoryBtn( postDataList );
}
