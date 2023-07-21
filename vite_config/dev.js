/**
 * dev.js
 * created by 2023/7/20
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */
import child_process from 'child_process'
import { getEntities } from '../Plugins/GetEntities.js'
import { resolve } from 'path'

const { exec } = child_process;

const buildCommand = 'npm run dev:origin';

function useCommand( buildCommand ) {
	return new Promise( ( resolve, rejects ) => {
		exec( buildCommand, ( error, stdout, stderr ) => {
			if ( error ) {
				rejects( error );
			}
			
			resolve( {
				stdout,
				stderr,
			} );
		} );
	} )
}

( async () => {
	let isLast = false;
	const entities = getEntities( resolve( 'src' ) ).values();
	while ( entities.next().value ) {
		let result = useCommand( buildCommand ).then(
			res => {
				console.log( res.stdout );
				return 'ok';
			},
			err => {
				console.error( err );
				console.error( '[Error] 没有文件修改，无法获取文件...' );
				isLast = true;
				return 'last';
			}
		)
		await new Promise( resolve => {
			setTimeout( resolve, 1000 );
		} )
	}
	
} )();
