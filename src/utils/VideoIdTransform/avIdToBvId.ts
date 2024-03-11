/**
 * av to bv.ts
 * created by 2024/3/11
 * @file av号转bv号
 * @author  Yiero
 *
 * @tutorial https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/bvid_desc.md
 * */
import { codeConfig } from './config/codeConfig.ts';

/**
 * 将AvId转换为BvId。
 *
 * @param {number} aid - 要转换的AvId。
 * @return {`BV1${ string }`} 相应的BvId。
 */
export function avToBv( aid: number ): `BV1${ string }` {
	const { MAX_AID, XOR_CODE, data, BASE } = codeConfig;
	const bytes = [ 'B', 'V', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0' ];
	let bvIndex = bytes.length - 1;
	let tmp = ( MAX_AID | BigInt( aid ) ) ^ XOR_CODE;
	while ( tmp > 0 ) {
		bytes[ bvIndex ] = data[ Number( tmp % BigInt( BASE ) ) ];
		tmp = tmp / BASE;
		bvIndex -= 1;
	}
	[ bytes[ 3 ], bytes[ 9 ] ] = [ bytes[ 9 ], bytes[ 3 ] ];
	[ bytes[ 4 ], bytes[ 7 ] ] = [ bytes[ 7 ], bytes[ 4 ] ];
	return bytes.join( '' ) as `BV1${ string }`;
}
