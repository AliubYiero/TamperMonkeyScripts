/**
 * BandReadInterface.ts
 * created by 2023/12/31
 * @file 屏蔽视频的接口
 * @author  Yiero
 * */

export enum BandVideoType {
	UP,
	Title,
	BV,
	AV
}
export interface BandReadInterface {
	/** 序列号 */
	band_id: string;
	
	/** band 类型 */
	type: BandVideoType;
	
	/** band 的内容 */
	content: string;
}
