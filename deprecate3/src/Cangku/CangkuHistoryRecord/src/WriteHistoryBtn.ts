import { print } from '../index'
import { PostDataListType } from './ParseMainPost'

export function writeHistoryBtn( postList: PostDataListType[] ) {
	for ( const post of postList ) {
		
		// 添加样式
		if ( post.isRead ) {
			print.log( post.achieveId, 'is-read' );
			// 移除样式(如果存在)
			post.target.classList.remove( 'is-not-read' );
			post.target.classList.add( 'is-read' );
		}
		else {
			print.log( post.achieveId, 'is-not-read' );
			// 移除样式(如果存在)
			post.target.classList.remove( 'is-read' );
			post.target.classList.add( 'is-not-read' );
		}
	}
}
