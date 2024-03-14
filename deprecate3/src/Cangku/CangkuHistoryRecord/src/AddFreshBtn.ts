import { EntryBranch } from '../../../../lib/Base/EntryBranch'
import { getElement } from '../../../../lib/Listener/ElementAdd'
import { getEl } from '../../../../lib/Shorten'

export async function addFreshBtn( entryBranch: EntryBranch ) {
	await getElement( document.body, '.navbar-nav', 0, 0.5 );
	
	const freshBtn = GM_addElement( <HTMLElement> getEl( '.navbar-nav' ), 'li', {
		class: 'nav-item',
	} );
	// 获取DataHash
	const dataHash: string = ( <HTMLElement> getEl( '.navbar-nav > .nav-item' ) )
		.getAttributeNames()
		.find( ( attribute ) => attribute.startsWith( 'data-v' ) ) as string;
	
	freshBtn.innerHTML = `
		<a class="text-truncate fresh-btn" ${ dataHash } href="javascript:;">刷新</a>
	`;
	
	// 刷新阅读状态
	freshBtn.querySelector( '.fresh-btn' )?.addEventListener( 'click', () => {
		entryBranch.run();
	} )
	
	
}
