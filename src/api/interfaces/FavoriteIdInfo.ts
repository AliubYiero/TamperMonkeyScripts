/**
 * 收藏夹id信息
 * */
export interface FavoriteIdInfo {
	/**
	 * 内容id
	 *
	 * 视频稿件：视频稿件avid
	 * 音频：音频auid
	 * 视频合集：视频合集id
	 * */
	'id': number,
	/**
	 * 内容类型:
	 *
	 * 2：视频稿件
	 * 12：音频
	 * 21：视频合集
	 * */
	'type': 2 | 12 | 21,
	/** 视频稿件bvid */
	'bv_id': `BV1${ string }`,
	'bvid': `BV1${ string }`,
}
