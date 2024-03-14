/* entry */
import { GMConfigMenu } from '../../../lib/GM_Lib'
import { AlertCheckReturn } from '../../../lib/UI/SweetAlert2/lib/Prompt/interfaces/AlertCheckReturn.ts'

interface CssRuleInputConfig {
	url: string,
	selector: string,
	cssRule: string
}

const inputPrompt = async (
	title: string,
	defaultUrl = document.URL,
	defaultValue: string = ''
): Promise<CssRuleInputConfig[] | CssRuleInputConfig | null> => {
	// @ts-ignore
	// Show a prompt dialog using Swal.fire() function
	const response: AlertCheckReturn = await Swal.fire( {
		// Prompt title
		titleText: title,
		// Input field
		html: `
<section class="url-container">
<label for="swal2-input--url">
	<p>当前匹配URL (支持正则, 通过 \`/content/\` )</p>
	<input type="text" id="swal2-input--url" class="swal2-input" placeholder="输入匹配Url" value="${ defaultUrl }"/>
</label>
</section>
<section>
<label for="swal2-input--css-selector">
	<p>输入CSS选择器</p>
	<input type="text" id="swal2-input--css-selector" class="swal2-input" placeholder="输入CSS选择器"/>
</label>
</section>
<section>
<label for="swal2-input--css-rule">
	<p>输入CSS属性</p>
	<input type="text" id="swal2-input--css-rule" class="swal2-input" placeholder="输入CSS规则" value="${ defaultValue }"/>
</label>
</section>
		`,
		// Show close button
		showCloseButton: true,
		// Do not focus on confirm button
		focusConfirm: false,
		// Show cancel button
		showCancelButton: true,
		
		confirmButtonText: '确定',
		showDenyButton: true,
		denyButtonText: `继续添加`,
		cancelButtonText: '取消',
		
		
		preConfirm( isConfirm: boolean ): CssRuleInputConfig | null {
			// If the confirmation is not being made, return undefined.
			if ( !isConfirm ) {
				return null;
			}
			
			return {
				url: ( <HTMLInputElement> document.querySelector( '#swal2-input--url' ) ).value as string,
				selector: ( <HTMLInputElement> document.querySelector( '#swal2-input--css-selector' ) ).value as string,
				cssRule: ( <HTMLInputElement> document.querySelector( '#swal2-input--css-rule' ) ).value as string,
			}
		},
		
		preDeny( isDeny: boolean ): CssRuleInputConfig | null {
			// If the confirmation is not being made, return undefined.
			if ( !isDeny ) {
				return null;
			}
			
			return {
				url: ( <HTMLInputElement> document.querySelector( '#swal2-input--url' ) ).value as string,
				selector: ( <HTMLInputElement> document.querySelector( '#swal2-input--css-selector' ) ).value as string,
				cssRule: ( <HTMLInputElement> document.querySelector( '#swal2-input--css-rule' ) ).value as string,
			}
		}
	} );
	
	// console.log( response );
	const result: CssRuleInputConfig[] = [];
	
	if ( response.isDismissed && response.dismiss === 'cancel' ) {
		return null;
	}
	else if ( response.isDenied ) {
		if ( response.value ) {
			result.push( <CssRuleInputConfig> response.value );
		}
		const res = await inputPrompt( title, defaultUrl, defaultValue );
		if ( res ) {
			result.push( <CssRuleInputConfig> res );
		}
	}
	// Return the user's input value
	else if ( response.isConfirmed && response.value ) {
		result.push( <CssRuleInputConfig> response.value );
	}
	
	// console.log( result );
	return result;
}

( async () => {
	const configSettingMenu = new GMConfigMenu( async () => {
		const result = await inputPrompt( '请输入CSS规则' ) as CssRuleInputConfig[];
		console.log( result );
	} );
	configSettingMenu.open( '输入CSS规则' );
} )();
