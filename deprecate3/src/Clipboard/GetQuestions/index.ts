import { GMConfigMenu } from '../../../lib/GM_Lib'
import { website } from './interfaces/website.ts'
import { questionParse } from './src/questionParse.ts'

/* entry */
( function () {
	'use strict';
	
	/**
	 * This function parses the URL and returns a bound function based on the website
	 *
	 * Parses the URL and returns a bound function based on the website
	 * @returns {( () => void ) | undefined} - The bound function based on the website
	 */
	const _questionParser = (): ( () => void ) | undefined => {
		if ( document.URL.startsWith( 'https://mooc1.chaoxing.com' ) ) {
			return questionParse.bind( _questionParser, website.mooc );
		}
		else if ( document.URL.startsWith( 'https://www.haodaxue.net' ) ) {
			return questionParse.bind( _questionParser, website.haodaxue );
		}
	};
	const reQuestionParser = _questionParser() as ( () => void );
	
	const questionParseSetting = new GMConfigMenu( () => {
		reQuestionParser();
	} );
	questionParseSetting.open( '题库解析' );
} )();
