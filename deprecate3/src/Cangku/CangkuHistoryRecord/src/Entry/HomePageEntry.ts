import { parseMainPost } from '../ParseMainPost'
import { parseAsidePost } from '../ParseAsidePost'
import { getElement } from '../../../../../lib/Listener/ElementAdd'
import { getEl } from '../../../../../lib/Shorten'
import { globalConfig } from '../../config/global.config'

export async function HomePageEntry(): Promise<void> {
	await getElement( document.body, '.post-card-wrap .cover', 20, globalConfig.getElementDelayPerSecond );
	await parseMainPost();
	
	await getElement( document.body, '.sidebar-rank-post-wrap .cover', 20, globalConfig.getElementDelayPerSecond );
	await parseAsidePost();
	
	// 当点击侧边卡片不同榜单时, 更新卡片解析
	getEl( '.nav-pills' )?.addEventListener( 'click', () => {
		setTimeout( () => {
			// 需要调用HomePageEntry整个页面重新解析, 因为点击可能会将主页面也重新加载
			HomePageEntry();
		}, 500 );
	}, {
		once: true
	} )
}
