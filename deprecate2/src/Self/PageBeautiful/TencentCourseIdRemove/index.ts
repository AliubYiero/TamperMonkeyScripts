import { Info } from '../../../../lib/Base/Info'
import { getElement } from '../../../../lib/Listener/ElementAdd'

export {
	domList,
	print
}
const print = new Info( 'TencentCourseIdRemove' );
const domList: { [ propName: string ]: HTMLElement } = {};

/* entry */
( async () => {
	
	/* 判断页面 */
	if ( !document.URL.match( /https:\/\/ke.qq.com\/course\/\d+\/\d+/g ) ) {
		return;
	}
	
	/* 注册监听器 */
	
	const courseIdObserver = new MutationObserver( ( e ) => {
		e.forEach( ( record ) => {
			const addNode = record.addedNodes[ 0 ] as HTMLElement;
			if ( addNode?.innerText.match( /^\d+$/ ) ) {
				print.log( '移除课堂Id' );
				addNode.style.display = 'none';
			}
		} )
	} );
	
	/* 绑定观察者 */
	getElement( undefined, '#video-container' ).then(
		( res ) => {
			if ( !res ) {
				return;
			}
			
			/* 初始化移除课堂Id */
			( <HTMLElement> document.querySelector( '#video-container > div' ) ).remove();
			
			/* 绑定观察者, 持续移除课堂Id */
			courseIdObserver.observe( res, {
				childList: true,
			} )
		}
	)
} )();
