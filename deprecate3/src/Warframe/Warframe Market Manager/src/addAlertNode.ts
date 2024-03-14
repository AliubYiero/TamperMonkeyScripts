import { getEl } from '../../../../lib/Shorten'

export const addAlertNode = ( selector: string, content: string ) => {
	const parentNode = getEl( selector ) as HTMLElement;
	// 写入元素
	const standardPriceStringNode = GM_addElement( 'div', {
		style: 'margin-left: 10px;'
	} );
	standardPriceStringNode.innerHTML = '<a class="link">标准价</a>';
	standardPriceStringNode.addEventListener( 'click', () => {
		content = `<div style="text-align: left">${ content.split( '\n' ).map( ( item ) => `<p>${ item }</p>` ).join( '' ) }</div>`;
		// @ts-ignore
		// Display the alert using Swal.fire
		Swal.fire( {
			// Set the title of the alert
			titleText: '标准价',
			html: content,
			// Set the position of the alert, default to 'center'
			position: 'center',
			// Set the type of the alert
			info: 'info',
			width: 800,
			// Show the confirm button
			showConfirmButton: true,
			// Set the timeout duration in milliseconds, default to 1500
			timer: 30 * 1000
		} );
	} );
	parentNode.appendChild( standardPriceStringNode );
	return standardPriceStringNode;
}
