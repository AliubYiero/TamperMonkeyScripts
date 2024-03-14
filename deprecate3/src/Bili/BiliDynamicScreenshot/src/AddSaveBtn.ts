import { DynamicNodeData } from './DynamicNodeData'
import { print } from '../index'

/** 添加保存按钮 */
export function addSaveBtn( dynamicNodeData: DynamicNodeData ) {
	if ( dynamicNodeData.isInsert ) {
		return;
	}
	
	/* 添加按钮 */
	const moreBtn = dynamicNodeData.target.querySelector( '.bili-dyn-more__menu' ) as HTMLElement;
	const saveDynamicBtn = ( <HTMLElement> moreBtn.querySelector( '.bili-dyn-more__menu__item' ) ).cloneNode() as HTMLElement;
	saveDynamicBtn.dataset[ 'type' ] = 'THREE_POINT_SAVE_AS_PNG';
	saveDynamicBtn.innerText = '保存为图片';
	moreBtn.appendChild( saveDynamicBtn );
	
	saveDynamicBtn.addEventListener( 'click', async () => {
		/* 关闭更多 */
		( <HTMLElement> dynamicNodeData.target.querySelector( '.bili-popover' ) ).style.display = 'none';
		
		/* 保存图片 */
		// @ts-ignore
		const dynamicCanvasDom: HTMLCanvasElement = await html2canvas( dynamicNodeData.target, {
			allowTaint: true,
			useCORS: true,
			ignoreElements( element: HTMLElement ) {
				return element.matches( '.bili-dyn-item__action' );
			},
		} );
		
		print.log( dynamicCanvasDom );
		dynamicCanvasDom.toBlob( ( blob ) => {
			if ( !blob ) {
				return;
			}
			
			navigator.clipboard.write( [ new ClipboardItem( {
				[ blob.type ]: blob,
			} ) ] );
		} );
	} )
}
