/**
 * HotkeyPrompt.ts
 * created by 2023/9/21
 * @file 热键输入
 * @author  Yiero
 * */

/**
 * Prompts the user to enter a hotkey by displaying a Swal (SweetAlert) modal.
 *
 * @return {Promise<string>} The hotkey entered by the user.
 */
export const HotkeyPrompt = async (): Promise<string> => {
	// @ts-ignore
	// Display Swal modal with hotkey input field
	const { value: hotkey } = await Swal.fire( {
		// Prompt title
		titleText: '输入热键',
		// Hotkey input field
		html: '<input id="swal2-hotkey-input" placeholder="输入热键" class="swal2-input">',
		// Show close button
		showCloseButton: true,
		// Do not focus on confirm button
		focusConfirm: false,
		// Show cancel button
		showCancelButton: true,
		// Allow keydown event to propagate
		stopKeydownPropagation: false,
		
		/**
		 * Attach event listener to the `keydown` event of the hotkey input field in the toast element.
		 * Update the value of the input field with the key combination pressed.
		 * @param toast - The toast element containing the hotkey input field
		 */
		didOpen( toast: HTMLDivElement ): void {
			const hotkeyInput: HTMLInputElement = toast.querySelector( '#swal2-hotkey-input' ) as HTMLInputElement;
			
			hotkeyInput.addEventListener( 'keydown', handleKeyDown );
			
			/**
			 * Handle the keydown event and update the value of the input field with the key combination pressed.
			 * @param e - The KeyboardEvent object
			 */
			function handleKeyDown( e: KeyboardEvent ): void {
				e.preventDefault();
				
				const keydownList: string[] = [];
				e.shiftKey && keydownList.push( 'Shift' );
				e.ctrlKey && keydownList.push( 'Ctrl' );
				e.altKey && keydownList.push( 'Alt' );
				keydownList.push(
					[ 'Alt', 'Control', 'Shift' ].includes( e.key )
						? ''
						: e.key.toUpperCase()
				);
				
				hotkeyInput.value = keydownList.join( ' + ' );
			}
		},
		
		/**
		 * Performs a pre-confirmation check and returns the value of the hotkey input.
		 * @param isConfirm - A boolean indicating whether the confirmation is being made.
		 * @returns The value of the hotkey input if the confirmation is made, otherwise undefined.
		 */
		preConfirm( isConfirm: boolean ): string {
			// If the confirmation is not being made, return undefined.
			if ( !isConfirm ) {
				return '';
			}
			
			// Get the hotkey input element.
			const hotkeyInput = document.body.querySelector<HTMLInputElement>( '#swal2-hotkey-input' );
			
			// Return the value of the hotkey input.
			return hotkeyInput?.value || '';
		}
	} );
	
	return hotkey;
}
