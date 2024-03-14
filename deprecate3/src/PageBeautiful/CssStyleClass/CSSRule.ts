/**
 * AddStyle.ts
 * created by 2023/8/23
 * @file
 * @author  Yiero
 * */

import { AddCSSRule, CssRule } from './interfaces/AddCSSRule'
import { Info } from '../../../lib/Base/Info'

export {
	CSSRule
}

class CSSRule implements AddCSSRule {
	cssRuleSet: Set<string> = new Set();
	private styleDom: HTMLStyleElement = document.createElement( 'style' );
	
	/**
	 * Add a CSS rule to the CSS rule set.
	 *
	 * @param selector - The CSS selector for the rule.
	 * @param rule - The CSS rule to add.
	 * @returns The updated instance of CSSRuleSet.
	 */
	push( selector: string, rule: CssRule ): CSSRule {
		// Convert the rule object to a string
		const ruleString = Object.entries( rule )
			// Concatenate each key-value pair into a string with a colon in between
			.reduce( ( result, [ key, value ] ) =>
					result + `${ key }:${ value };`,
				'' );
		
		// Add the rule to the CSS rule set
		this.cssRuleSet.add( `${ selector } {${ ruleString }}` );
		
		return this;
	}
	
	/**
	 * Adds an important CSS rule to a selector.
	 *
	 * @param {string} selector - The CSS selector.
	 * @param {CssRule} rule - The CSS rule to add.
	 * @returns {CSSRule} - The updated CSS rule.
	 */
	pushImportant( selector: string, rule: CssRule ): CSSRule {
		// Generate the CSS rule string by iterating over the rule object
		const ruleString = Object.entries( rule )
			.reduce( ( result, [ key, value ] ) => {
				let ruleValue = value;
				if ( typeof ruleValue === 'string' ) {
					// Remove the !important flag if it exists in the value
					ruleValue = ruleValue.replace( '!important', '' );
				}
				// Concatenate the key-value pair with !important flag
				return result + `${ key }:${ ruleValue } !important;`;
			}, '' );
		// Add the CSS rule to the cssRuleSet
		this.cssRuleSet.add( `${ selector } {${ ruleString }}` );
		// Return the updated CSS rule
		return this;
	}
	
	/**
	 * Adds a CSS rule to hide the specified selector.
	 * @param selector - The selector to hide.
	 * @returns The modified CSSRule object.
	 */
	pushHide( selector: string ): CSSRule {
		// Add CSS rule with 'display: none' to hide the selector
		this.pushImportant( selector, {
			display: 'none',
		} );
		
		return this;
	}
	
	/**
	 * Adds a list of selectors to the hide list by setting their display property to 'none'.
	 * @param selectorList - The list of selectors to add to the hide list.
	 * @returns The updated CSSRule object.
	 */
	pushHideList( selectorList: string[] ): CSSRule {
		// Iterate over each selector in the list
		selectorList.forEach( ( selector ) => {
			// Set the display property of the selector to 'none' using pushImportant method
			this.pushImportant( selector, {
				display: 'none',
			} );
		} );
		
		// Return the updated CSSRule object
		return this;
	}
	
	/**
	 * Adds a list of rules to the CSSRule object.
	 *
	 * @param ruleList - An array of objects containing the selector and rule to be added.
	 * @returns The updated CSSRule object.
	 */
	pushList( ruleList: Array<{ selector: string; rule: CssRule }> ): CSSRule {
		// Iterate over the ruleList array
		ruleList.forEach( ( { selector, rule } ) => {
			// Call the push method to add each rule to the CSSRule object
			this.push( selector, rule );
		} );
		
		// Return the updated CSSRule object
		return this;
	}
	
	/**
	 * Pushes a list of rules to the important list.
	 *
	 * @param ruleList - The list of rules to push.
	 * @returns The updated CSSRule object.
	 */
	pushImportantList( ruleList: Array<{ selector: string; rule: CssRule }> ): CSSRule {
		// Iterate over each rule in the list
		ruleList.forEach( ( { selector, rule } ) => {
			// Push the rule to the important list
			this.pushImportant( selector, rule );
		} );
		
		// Return the updated CSSRule object
		return this;
	}
	
	/**
	 * Remove all existing rules and add new rules to the styleDom.
	 */
	submit(): void {
		// Remove all existing rules
		this.removeAll();
		
		// Add new rules
		const cssRules = Array.from( this.cssRuleSet ).join( ' ' );
		( new Info( 'AddStyle' ) ).log( cssRules );
		this.styleDom = GM_addStyle( cssRules );
	}
	
	/**
	 * Removes the styleDom element and returns the instance of the class.
	 * @returns {CSSRule} The instance of the class after removing the styleDom element.
	 */
	removeAll(): CSSRule {
		if ( this.styleDom ) {
			this.styleDom.remove();
		}
		return this;
	}
}
