/**
 * bvIdToAvId.ts
 * created by 2024/3/11
 * @file bv号转av号
 * @author  Yiero
 *
 * @tutorial https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/bvid_desc.md
 * */
import { codeConfig } from './config/codeConfig.ts';

/**
 * 将 bv 号转换为 av 号
 *
 * @param {`BV1${ string }`} bvid - 要转换的 bv 号
 * @return {number} 相应的 av 号
 */
export function bvToAv( bvid: `BV1${ string }` ) {
	const { MASK_CODE, XOR_CODE, data, BASE } = codeConfig;
	const bvidArr = Array.from<string>( bvid );
	[ bvidArr[ 3 ], bvidArr[ 9 ] ] = [ bvidArr[ 9 ], bvidArr[ 3 ] ];
	[ bvidArr[ 4 ], bvidArr[ 7 ] ] = [ bvidArr[ 7 ], bvidArr[ 4 ] ];
	bvidArr.splice( 0, 3 );
	const tmp = bvidArr.reduce( ( pre, bvidChar ) => pre * BASE + BigInt( data.indexOf( bvidChar ) ), 0n );
	return Number( ( tmp & MASK_CODE ) ^ XOR_CODE );
}
