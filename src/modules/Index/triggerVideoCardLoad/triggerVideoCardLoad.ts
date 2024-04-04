import {
	EventListener,
	useReadVideoIdListStorage,
} from '../../../utils';

/**
 * 触发元素加载回调
 * */
export const triggerVideoCardLoad = () => {
	// 视频卡片点击事件回调
	const handleClickVideoCard = ( element: HTMLElement ) => {
		if ( !element.classList.contains( 'bili-video-card' ) && element.parentElement ) {
			handleClickVideoCard( element.parentElement );
			return;
		}
		
		// 如果当前视频未看, 则变成已看样式
		if ( element.classList.contains( 'is-not-read' ) ) {
			element.classList.remove( 'is-not-read' );
			element.classList.add( 'is-read' );
		}
	};
	
	// 添加样式
	GM_addStyle( `
.bili-video-card.is-rcmd.is-read {
\topacity: .5
}
.bili-video-card.is-rcmd.read-item::after {
\tposition: absolute;
\ttop: 5px;
\tleft: 5px;
\t
\tfont-size: 13px;
\tpadding: 3px 8px;
\tcolor: #fff;
\tfont-weight: 700;
\tborder-radius: 4px;
\tz-index: 20;
}
.bili-video-card.is-rcmd.is-read::after {
\tcontent: "已看";
\tbackground-color: hsla(0, 0%, 60%, .77);
}
.bili-video-card.is-rcmd.is-not-read::after {
\tcontent: "未看";
\tbackground-color: rgba(3, 169, 244, .77);
}
` );
	
	
	EventListener.listen( ( element ) => {
		// 绑定元素点击事件
		element.addEventListener( 'mousedown', ( e ) => {
			if ( e.button === 2 ) {
				return;
			}
			handleClickVideoCard( <HTMLElement> e.target );
		} );
		
		// 给所有元素添加 `read-item` 类
		element.classList.add( 'read-item' );
		
		// 获取当前视频BV号
		const linkDom = element.querySelector( 'a[href^="https://www.bilibili.com/video/BV1"]' ) as HTMLLinkElement | null;
		if ( !linkDom ) {
			return;
		}
		const bvId = linkDom.href.split( '/' ).find( item => item.startsWith( 'BV1' ) ) as `BV1${ string }`;
		
		// 判断当前元素是否已看
		const isRead = useReadVideoIdListStorage.getInstance().existVideoId( bvId );
		
		// 根据比对结果给当前元素添加已看样式或未看样式
		element.classList.add( isRead ? 'is-read' : 'is-not-read' );
	} );
};
