import { getElement } from '../../../../../lib/Listener/ElementAdd'
import { parseMainPost } from '../ParseMainPost'
import { getEl } from '../../../../../lib/Shorten'
import { globalConfig } from '../../config/global.config'

export async function rankPageEntry() {
	await getElement( document.body, '.post-card-content > .cover', 20, globalConfig.getElementDelayPerSecond );
	await parseMainPost();
	
	getEl( '.rank-wrapper' )?.addEventListener( 'click', () => {
		setTimeout( rankPageEntry, 500 );
	}, { once: true } );
}
