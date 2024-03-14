/* entry */
import { getElement } from '../../../lib/Listener/ElementAdd'
import { getEls } from '../../../lib/Shorten'

( async () => {
	await getElement( document.body, '.operate', 0, 1 );
	const operateList = getEls( '.operate > li > a' ) as NodeList;
	if ( operateList.length === 3 ) {
		const attendanceBtn = operateList[ 1 ] as HTMLElement;
		attendanceBtn.click();
	}
} )();
