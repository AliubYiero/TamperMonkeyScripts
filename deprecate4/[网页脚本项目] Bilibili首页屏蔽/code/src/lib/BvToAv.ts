/**
 * BvToAv.ts
 * created by 2023/12/31
 * @file BV 号 转换成 AV 号
 * @author  Yiero
 * */
const XOR_CODE = 23442827791579n;
const MASK_CODE = 2251799813685247n;
const MAX_AID = 1n << 51n;
const BASE = 58n;

const data = 'FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf';

/**
 * 将 BV 号 转换成 AV 号
 * */
export function bv2av( bvid: `BV1${ string }` ): number {
	const bvidArr = Array.from<string>( bvid );
	[ bvidArr[ 3 ], bvidArr[ 9 ] ] = [ bvidArr[ 9 ], bvidArr[ 3 ] ];
	[ bvidArr[ 4 ], bvidArr[ 7 ] ] = [ bvidArr[ 7 ], bvidArr[ 4 ] ];
	bvidArr.splice( 0, 3 );
	const tmp = bvidArr.reduce( ( pre, bvidChar ) => pre * BASE + BigInt( data.indexOf( bvidChar ) ), 0n );
	return Number( ( tmp & MASK_CODE ) ^ XOR_CODE );
}
