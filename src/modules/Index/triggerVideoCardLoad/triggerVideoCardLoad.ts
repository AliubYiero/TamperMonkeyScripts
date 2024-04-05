import {
	EventListener,
	handleParseWatchedVideoIdList,
} from '../../../utils';

/**
 * 添加已看/未看样式
 * */
const addWatchedStyle = () => {
	// 添加样式
	GM_addStyle( `
.bili-video-card.is-rcmd.is-watched {
	opacity: .5
}
.bili-video-card.is-rcmd.watched-item::after {
	position: absolute;
	top: 5px;
	left: 5px;
	
	font-size: 13px;
	padding: 3px 8px;
	color: #fff;
	font-weight: 700;
	border-radius: 4px;
	z-index: 20;
}
.bili-video-card.is-rcmd.is-watched::after {
	content: "已看";
	background-color: hsla(0, 0%, 60%, .77);
}
.bili-video-card.is-rcmd.is-not-watched::after {
	content: "未看";
	background-color: rgba(3, 169, 244, .77);
}
` );
};

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
		if ( element.classList.contains( 'is-not-watched' ) ) {
			element.classList.remove( 'is-not-watched' );
			element.classList.add( 'is-watched' );
		}
	};
	
	// 添加已看/未看样式
	addWatchedStyle();
	
	EventListener.listen( async ( element ) => {
		// 绑定元素点击事件
		element.addEventListener( 'mousedown', ( e ) => {
			const containerDom = e.target as HTMLElement;
			// console.log( containerDom );
			if (
				// 右键点击不触发
				e.button === 2
				// 如果点击空白区域, 不触发
				|| (
					containerDom.classList.contains( 'bili-video-card__info--tit' )
					|| containerDom.classList.contains( 'bili-video-card__info--bottom' )
					|| containerDom.classList.contains( 'bili-video-card__info--icon-text' )
				)
			) {
				return;
			}
			
			handleClickVideoCard( containerDom );
		} );
		
		// 给所有元素添加 `watched-item` 类
		element.classList.add( 'watched-item' );
		
		// 获取当前视频BV号
		const linkDom = element.querySelector( 'a[href^="https://www.bilibili.com/video/BV1"]' ) as HTMLLinkElement | null;
		if ( !linkDom ) {
			return;
		}
		const bvId = linkDom.href.split( '/' ).find( item => item.startsWith( 'BV1' ) ) as `BV1${ string }`;
		
		// 判断当前元素是否已看
		const isWatched = handleParseWatchedVideoIdList.getInstance().existVideoId( bvId );
		
		// 根据比对结果给当前元素添加已看样式或未看样式
		element.classList.add( isWatched ? 'is-watched' : 'is-not-watched' );
	} );
};
