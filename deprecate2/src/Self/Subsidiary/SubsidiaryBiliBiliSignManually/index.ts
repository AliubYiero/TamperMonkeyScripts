import { Info } from '../../../../lib/Base/Info'
import { getElement } from '../../../../lib/Listener/ElementAdd'

export {
	print
}
const print = new Info( 'SubsidiaryBiliBiliSignManually' );

interface ClickElement {
	/** 目标元素 */
	selector: string;
	
	click: () => void;
}

/* 自动点击标记按钮 */
class ReadBtnClick implements ClickElement {
	selector: string
	
	constructor( selector: string ) {
		this.selector = selector;
	}
	
	async click(): Promise<void> {
		/* 自动点击标记按钮  */
		await getElement( void 0, this.selector, 20 );
		const element = document.querySelector( this.selector ) as HTMLElement;
		if ( element ) {
			print.log( '触发观看标记', element );
			element.click();
		}
		else {
			print.log( '获取超时, 获取不到目标元素', this.selector, element );
		}
	}
}

/* 自动收藏 */
class QuickFavorClick implements ClickElement {
	selector: string
	
	constructor( selector: string ) {
		this.selector = selector;
	}
	
	async click(): Promise<void> {
		const isFavor: boolean = !!document.querySelector( '.video-fav.video-toolbar-left-item.on' );
		
		/* 自动收藏, 添加延时1s让数据同步, 防止点击到空容器 */
		await getElement( void 0, this.selector, 20, 1 );
		const element = document.querySelector( this.selector ) as HTMLElement;
		if ( !isFavor && element ) {
			print.log( '触发观看标记', element );
			element.click();
		}
		else {
			print.log( '获取超时, 获取不到目标元素', this.selector, element );
		}
	}
}

/* entry */
( async () => {
	/**
	 * 点击元素
	 * */
	await new ReadBtnClick( '.video-info-detail > .btnNotView' ).click();
	await new QuickFavorClick( '.be-quick-favorite.video-toolbar-left-item:not(.on)' ).click();
	
} )();
