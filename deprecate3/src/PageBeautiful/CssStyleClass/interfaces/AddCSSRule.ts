/**
 * AddCSSRule.ts
 * created by 2023/8/23
 * @file
 * @author  Yiero
 * */

export type {
	AddCSSRule,
	CssRule
}

interface CssRule {
	[ propName: string ]: string | number | boolean;
}

interface AddCSSRule {
	/* css规则 */
	cssRuleSet: Set<string>;
	
	/** 添加新规则 */
	push: ( selector: string, rule: CssRule ) => void;
	
	/** 批量添加新规则 */
	pushList: ( ruleList: Array<{ selector: string, rule: CssRule }> ) => void;
	
	/** 写入规则 */
	submit: () => void;
	
	/** 移除全部规则 */
	removeAll: () => void;
}
