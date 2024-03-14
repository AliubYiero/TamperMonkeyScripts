/**
 * UIConfig.ts
 * created by 2023/8/6
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */
import { UIConfig, UIData } from '../../../../../lib/GM_Lib'
import { config } from './Storage'

export {
	scrollUIConfig
}

class ScrollData implements UIData {
	close(): void {
		config.isScroll = false;
	}
	
	isOpen(): boolean {
		return config.isScroll
	}
	
	open(): void {
		config.isScroll = true;
	}
}


const scrollUIConfig = new UIConfig( new ScrollData(), '自动滚动' );
 
