import { PostDataListType } from './ParseMainPost'

export function bindNotReadBtnEvent( postList: PostDataListType[] ) {
	postList.forEach( ( post ) => {
		if ( !post.isRead ) {
			post.target.addEventListener( 'mousedown', bindPostClickEvent, {
				once: true,
			} )
			
			function bindPostClickEvent( e: MouseEvent ) {
				if ( e.button !== 2 ) {
					post.target.classList.remove( 'is-not-read' );
					post.target.classList.add( 'is-read' );
				}
				else {
					post.target.addEventListener( 'mousedown', bindPostClickEvent, {
						once: true,
					} )
				}
			}
		}
	} )
}
