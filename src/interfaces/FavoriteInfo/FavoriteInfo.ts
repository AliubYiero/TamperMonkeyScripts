/**
 * 用户收藏夹信息
 * */
export interface FavoriteInfo {
	/** 收藏夹mlid（完整id） */
	id: number;
	/** 收藏夹原始id */
	fid: number;
	/** 创建者mid */
	mid: number;
	/** 属性位 */
	attr: number;
	/** 收藏夹标题 */
	title: string;
	/** 目标id是否存在于该收藏夹 */
	fav_state: number;
	/** 收藏夹内容数量 */
	media_count: number;
}
