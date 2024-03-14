import { getElement } from '../../../../../lib/Listener/ElementAdd'
import { parseAsidePost } from '../ParseAsidePost'
import { getEl } from '../../../../../lib/Shorten'
import { parseAchieveBottomPost } from '../ParseAchieveBottomPost'
import { globalConfig } from '../../config/global.config'

export async function achievePageEntry() {
	await getElement( document.body, '.related-post-card .cover', 20, globalConfig.getElementDelayPerSecond );
	await parseAchieveBottomPost();
	
	await getElement( document.body, '.sidebar-rank-post-wrap .cover', 20, globalConfig.getElementDelayPerSecond );
	await parseAsidePost();
	
	// 当点击侧边卡片不同榜单时, 更新卡片解析
	getEl( '.nav-pills' )?.addEventListener( 'click', () => {
		setTimeout( () => {
			// 需要调用HomePageEntry整个页面重新解析, 因为点击可能会将主页面也重新加载
			achievePageEntry();
		}, 500 );
	}, {
		once: true
	} )
}
