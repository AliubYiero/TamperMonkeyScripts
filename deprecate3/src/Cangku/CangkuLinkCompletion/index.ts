/* entry */
import { elementWaiter } from '../../../lib/Listener/ElementAdd'
import { Info } from '../../../lib/Base/Info'
import { getEls } from '../../../lib/Shorten'

export {
	print
}
const print = new Info( 'CangkuLinkCompletion' );
( async () => {
	// 等待评论载入完成
	await elementWaiter( '.comment-item' );
	// @ts-ignore
	const pwdRegString = '[A-Za-z0-9]{4}';
	// 获取所有带有href的
	const links = getEls( 'a[href*="pan.baidu.com"]:not([href*="?pwd"])' ) as NodeList;
	links.forEach( ( link ) => {
		const linkDom = link.cloneNode( true ) as HTMLAnchorElement;
		print.log( linkDom )
		
		// 向上查找提取码
		function getParentElement( link: HTMLElement | null ): void | string {
			if ( !link ) {
				print.log( '遍历所有父元素, 无法查询到提取码.' );
				return;
			}
			
			/**
			 * 获取提取码
			 * */
			function matchEnterCode( content: string ): string | null {
				let enterCode: string | null = null;
				
				const enterCodeMatch =
					content.match( new RegExp( `提取码?s*?[：:]s*?(${pwdRegString})` ) )
					|| content.match( new RegExp( `\\b(${pwdRegString})\\b` ) );
				if ( enterCodeMatch ) {
					enterCode = enterCodeMatch[ 1 ];
				}
				
				return enterCode;
			}
			
			const enterCode = matchEnterCode( link.innerText );
			if ( enterCode ) {
				print.log( '获取到提取码: ', enterCode );
				return enterCode;
			}
			else {
				// 进行递归查询
				return getParentElement( link.parentElement );
			}
		}
		
		// 向上查找提取码
		const enterCode = getParentElement( link as HTMLElement );
		
		// 如果查询到提取码, 拼接到link地址(href)
		if ( enterCode ) {
			( <HTMLAnchorElement> link ).href += `?pwd=${ enterCode }`;
		}
	} )
	
} )();
