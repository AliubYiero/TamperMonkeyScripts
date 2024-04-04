/**
 * AvToBv.ts
 * created by 2023/12/31
 * @file AV 号 转换成 BV 号
 * @author  Yiero
 * */

const XOR_CODE = 23442827791579n;
const MASK_CODE = 2251799813685247n;
const MAX_AID = 1n << 51n;
const BASE = 58n;

const data = 'FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf';

/**
 * 将 AV 号 转换成 BV 号
 * */
export function av2bv( aid: number ): `BV1${ string }` {
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
