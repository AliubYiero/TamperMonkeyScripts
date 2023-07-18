/* entry */
import { ElementMutationObserverOnce } from '../../../../lib/Listener/ElementAdd'
import { addHideClass, GMStorage, registerMenu } from '../../../../lib/GM_Lib'
import { Prompt } from '../../../../Component'
import { bindHotkey } from '../../../../lib/Listener/Event'
import { Info } from '../../../../lib/Base/Info'


( () => {
	const info = new Info( 'BiliBiliVideoNote-Subsidiary' );
	
	let NoteOpenButton: HTMLElement;
	
	// 检测页面是否出现目标元素
	ElementMutationObserverOnce( 'body', '.absolute.z-999.text-lg', ( e: HTMLElement ) => {
		NoteOpenButton = e;
		// 添加 `.hide` 隐藏元素样式
		addHideClass();
		// 隐藏元素
		e.classList.add( 'hide' );
		
		// 注册脚本菜单
		registerMenu( '笔记模式', () => {
			info.info( '开启笔记模式' )
			e.click();
		} )
	} )
	
	registerMenu( '配置快捷键', () => {
		Prompt(
			'设置开启视频笔记快捷键：',
			( element: HTMLElement ) => {
				// 读取默认快捷键配置
				const hotkey: string = GMStorage.get( 'hotkey', '' );
				
				// 写入默认快捷键配置
				const input = element.querySelector( 'input' ) as HTMLInputElement;
				input.value = hotkey;
				
				// 读取快捷键输入
				element.addEventListener( 'keydown', ( e: KeyboardEvent ) => {
					// 阻止默认输入
					e.preventDefault();
					
					// 监控键盘输入
					let hotkeyString = '';
					if ( e.ctrlKey ) {
						hotkeyString += 'Ctrl + ';
					}
					
					if ( e.altKey ) {
						hotkeyString += 'Alt + ';
					}
					
					if ( e.shiftKey ) {
						hotkeyString += 'Shift + ';
					}
					
					if ( [ 'Control', 'Alt', 'Shift' ].indexOf( e.key ) === -1 ) {
						hotkeyString += e.key.toUpperCase();
					}
					
					// 将键盘输入输出到input框中
					input.value = hotkeyString;
				} )
			},
			// @ts-ignore
			( element: HTMLElement, value: string ) => {
				// 绑定用户按键到全局
				bindHotkey( value, document, callback )
				
				function callback() {
					info.warn( `按键 ${ value } 已绑定为全局快捷键` )
					GMStorage.set( 'hotkey', value );
					NoteOpenButton.click();
				}
			} )
	} )
	
} )();
