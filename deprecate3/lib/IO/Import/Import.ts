/**
 * Import.ts
 * created by 2023/8/27
 * @file
 * @author  Yiero
 * */

export {
	importJson
}

function importJson(): Promise<string> {
	const importInput = GM_addElement( 'input', {
		type: 'file',
		accept: '.json',
	} );
	importInput.click();
	
	return new Promise( ( resolve ) => {
		importInput.addEventListener( 'change', ( e ) => {
			const inputDom = e.target as HTMLInputElement;
			if ( inputDom.files ) {
				const fileReader = new FileReader()
				fileReader.readAsText( inputDom.files[ 0 ] );
				fileReader.onload = () => {
					resolve( fileReader.result as string || '' );
				}
			}
		} )
	} )
	
}
