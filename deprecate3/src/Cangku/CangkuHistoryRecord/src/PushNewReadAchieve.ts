import { readHistory } from '../index'

export async function pushNewReadAchieve() {
	const achieveId: string = document.URL.slice( document.URL.lastIndexOf( '/' ) + 1 );
	if ( await readHistory.has( Number( achieveId ) ) ) {
		localStorage.setItem( 'history', achieveId );
	}
}
