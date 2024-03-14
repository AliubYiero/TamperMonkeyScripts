/**
 * Config.ts
 * created by 2023/9/21
 * @file Storage读取
 * @author  Yiero
 * */
import { GMStorage } from '../../../lib/GM_Lib'

export interface LinkCSSRule {
	url: string,
	cssRule: {
		selector: string,
		style: { [ propName: string ]: any }
	}
}

export const config = new class Config {
	private cssRuleStorage: GMStorage = new GMStorage( 'cssRule' );
	
	get cssRule(): LinkCSSRule[] {
		return this.cssRuleStorage.get( [] ) as LinkCSSRule[];
	}
	
	set cssRule( value: LinkCSSRule[] ) {
		this.cssRuleStorage.set( value );
	}
}
