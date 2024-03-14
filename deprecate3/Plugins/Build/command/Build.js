/**
 * Build.js
 * created by 2023/8/7
 * @file
 * @author  Yiero
 * */

import { useCommand } from '../lib/BuildFiles.js'
import { Print } from '../../Console/lib/Print.js'

const buildCommand = 'tsc && vite build --mode production';
useCommand( buildCommand ).then( ( { outputString, outputErrorString } ) => {
	console.log( outputErrorString );
	console.log( outputString );
} ).catch(
	( error ) => {
		console.error( Print.cyan( error ) );
	}
)
