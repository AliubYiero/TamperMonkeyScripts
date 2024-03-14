/* entry */
import { getElement } from '../../../../lib/Listener/ElementAdd'
import { addStyle } from '../../../../lib/GM_Lib'

( async () => {
	await getElement( document.body, '.tb > li' );
	addStyle( '.hide {display: none !important}' )
	
	// 获取所有li元素数组
	const nodeList: { [ propName: string ]: NodeList } = {
		li: document.querySelectorAll( '.tb > li' ) as NodeList,
	}
	
	class Module {
		domList: { [ propName: string ]: HTMLElement }
		
		constructor( li: HTMLInputElement ) {
			this.domList = {
				li,
			}
			this.domList.a = this.domList.li.querySelector( 'a' ) as HTMLElement;
		}
		
		hide() {
			this.domList.li.classList.add( 'hide' );
		}
		
		getTitle() {
			return this.domList.a.title;
		}
		
		// 向本地存储输入值
		setTitleToLocalStorage( isHide: boolean = false ) {
			localStorage.setItem( this.getTitle(), String( isHide ) );
		}
		
		// 从本地存储中获取值
		getTitleToLocalStorage() {
			return localStorage.getItem( this.getTitle() ) as 'true' | 'false' | null;
		}
		
	}
	
	// 遍历所有li元素
	nodeList.li.forEach( ( li ) => {
		const module = new Module( li as HTMLInputElement );
		
		// 隐藏
		const isHide = module.getTitleToLocalStorage();
		if ( isHide === 'true' ) {
			module.hide();
		}
		// 储存初始值
		else if ( isHide === null ) {
			module.setTitleToLocalStorage();
		}
		
	} )
} )();
