import { urlJudge } from '../utils';

/** 更换大字号字体 */
export function setLargeFont() {
	if ( !urlJudge( /https:\/\/www\.zaixiankaoshi\.com\/mnks\/\?paperid/ ) ) {
		return;
	}
	const LargeFontBtn = document.querySelector( 'div.clearfix.font-set span:nth-of-type(3)' ) as HTMLElement;
	LargeFontBtn.click();
}
