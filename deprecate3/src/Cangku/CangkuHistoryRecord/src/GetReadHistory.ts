import { readHistory } from '../index'
import { PostDataListType, PostListType } from './ParseMainPost'

export async function getReadHistory( postList: PostListType[] ): Promise<PostDataListType[]> {
	const postDataList: PostDataListType[] = [];
	for ( const post of postList ) {
		postDataList.push( {
			...post,
			isRead: await readHistory.has( post.achieveId )
		} )
	}
	return postDataList;
}
