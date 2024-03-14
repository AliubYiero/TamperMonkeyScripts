import { CSSRule } from '../../CssStyleClass/CSSRule'
import { hideSelectorList, prefSelectorList } from '../config/CSSRule.config'
import { transformedHideSelectorList, transformedPrefSelectorList } from '../../CssStyleClass/TransformedToArray'

export {
	addNewStyle
}

function addNewStyle( pageType: 'video' | 'dynamic' | 'live' | 'space' | 'liveNavIframe' ) {
	const cssRule = new CSSRule();
	
	cssRule
		.pushHideList( transformedHideSelectorList( hideSelectorList[ pageType ] ) )
		.pushImportantList( transformedPrefSelectorList( prefSelectorList[ pageType ] ) )
		.submit();
}
