/**
 * Send.ts
 * created by 2023/8/5
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { domList } from '../index'
import { clickEvent, inputEvent } from '../../../../../lib/Event'

export {
	sendDanmuku
}


/** 发送弹幕 */
function sendDanmuku( content: string ) {
	inputContent( content );
	clickSendBtn();
}

/** 输入文本 */
function inputContent( content: string ) {
	domList.sendInputBar = document.querySelector( '.chat-actions textarea' ) as HTMLTextAreaElement;
	
	inputEvent( <HTMLTextAreaElement> domList.sendInputBar, content );
}

/** 点击发送按钮 */
function clickSendBtn() {
	domList.sendBtn = document.querySelector( '.chat-actions .submit-button' ) as HTMLElement;
	
	clickEvent( domList.sendBtn );
}
