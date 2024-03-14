import { PostListType } from './ParseMainPost'

export function parsePost( postList: PostListType[], postCard: Node ) {
	const domList = {
		postCard: postCard as HTMLElement,
		link:
		// 主体
			( <HTMLElement> postCard ).querySelector( '.post-card a' ) as HTMLAnchorElement
			// 侧边
			|| ( <HTMLElement> postCard ).querySelector( '.sidebar-rank-post-wrap a' ) as HTMLAnchorElement
			// 帖子底部
			|| ( <HTMLElement> postCard ).querySelector( '.related-post-card a' ) as HTMLAnchorElement,
	}
	
	// 排除空卡片
	if ( !domList.postCard.innerText ) {
		return;
	}
	
	// 写入数据
	postList.push( {
		target: postCard as HTMLElement,
		achieveId: Number( domList.link.href.slice( domList.link.href.lastIndexOf( '/' ) + 1 ) )
	} )
}
