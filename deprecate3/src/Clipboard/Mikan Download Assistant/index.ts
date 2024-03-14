/* 等待元素载入 */


/* entry */
import { elementWaiter } from '../../../lib/Listener/ElementAdd';
import { getEls } from '../../../lib/Shorten'

( async () => {
	// wait element loaded
	await elementWaiter( '#sk-footer', { delayPerSecond: 1 } );
	
	// define a object to save dom
	const domListObject: {
		subtitleGroupList: Node[];
		subtitleGroupAnimateList: Node[]
	} = {
		subtitleGroupList: Array.from( getEls( '.subgroup-text' ) as NodeList ),
		subtitleGroupAnimateList: Array.from( getEls( '.table.table-striped.tbl-border.fadeIn' ) as NodeList )
	};
	
	// convert dom object to a map
	const subtitleGroupMap: Map<HTMLElement, HTMLElement> = new Map();
	for ( let i = 0; i < domListObject.subtitleGroupList.length; i++ ) {
		// get data
		const subtitleGroup = domListObject.subtitleGroupList[ i ] as HTMLElement;
		let subtitleGroupAnimateTable = domListObject.subtitleGroupAnimateList[ i ] as HTMLElement;
		
		// if there are more items which were hide
		if ( subtitleGroupAnimateTable.nextElementSibling?.classList.contains( 'episode-expand' ) ) {
			const moreItemBtn = subtitleGroupAnimateTable.nextElementSibling as HTMLElement;
			moreItemBtn.click();
			subtitleGroupAnimateTable = moreItemBtn.previousElementSibling as HTMLElement;
		}
		
		// set data to map
		subtitleGroupMap.set(
			subtitleGroup,
			subtitleGroupAnimateTable
		);
	}
	
	// get animate data
	const animationLinkStringMap: Map<HTMLElement, string> = new Map();
	for ( let entry of subtitleGroupMap.entries() ) {
		// get data from map
		const subtitleGroup = entry[ 0 ] as HTMLElement;
		const subtitleGroupAnimateTable = entry[ 1 ] as HTMLElement;
		
		// get all link from animate table
		// convert to a string
		const linkString = Array.from( subtitleGroupAnimateTable.querySelectorAll( '.js-magnet.magnet-link' ) )
			.reduce( ( result, content ) =>
					`${ result }\n${ ( <HTMLElement> content ).dataset.clipboardText }`,
				// initValue is an empty string
				'' );
		
		// write the date to a new map
		animationLinkStringMap.set( subtitleGroup, linkString );
		
		
	}
	
	// define a download button element generator
	function copyBtnGenerator( parent: HTMLElement, linksString: string ) {
		const btn = GM_addElement( parent, 'a', {
			href: 'javascript:;',
			class: 'mikan-copy-all-links subgroup-subscribe',
			textContent: '复制所有链接'
		} );
		
		btn.addEventListener( 'click', ( e ) => {
			// prevent page jumping
			e.preventDefault();
			
			// copy links to clipboard
			GM_setClipboard( linksString );
			
			// notify user copy successfully
			// @ts-ignore
			Swal.fire( '全部链接已复制到剪切板中' );
		} );
		
		return btn;
	}
	
	// write download button to page
	for ( let entry of animationLinkStringMap.entries() ) {
		// get data from map
		const subtitleGroup = entry[ 0 ] as HTMLElement;
		const linksString = entry[ 1 ] as string;
		
		// write button to page
		copyBtnGenerator( subtitleGroup, linksString );
	}
} )();
