import { parseMainPost } from '../ParseMainPost'
import { getElement } from '../../../../../lib/Listener/ElementAdd'
import { globalConfig } from '../../config/global.config'

export async function categoryPageEntry() {
	await getElement( document.body, '.post-card-wrap .cover', 20, globalConfig.getElementDelayPerSecond );
	await parseMainPost();
}
