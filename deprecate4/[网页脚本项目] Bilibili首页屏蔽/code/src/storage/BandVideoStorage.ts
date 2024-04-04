import { BandReadInterface } from '../interfaces/BandReadInterface'

/**
 * 生成唯一的 BandId
 *
 * 通过 将类型和屏蔽文本进行 base64 编码后截取前 32 位获取
 *  (先进行encodeURIComponent序列化转成 ASCII 码，再进行 base64 编码)
 * */
function generateBandId( content: string ) {
	const encryptContent = btoa( encodeURIComponent( content ) );
	return encryptContent.slice( 0, 32 ) + encryptContent.slice( -32 );
}

export class BandVideoStorage {
	private static instance: BandVideoStorage = new BandVideoStorage();
	
	private videoMap: Map<string, BandReadInterface> = new Map();
	// 存储名
	private readonly storageName: string;
	
	/**
	 * 私有化构造方法
	 * */
	private constructor() {
		
		/**
		 * init
		 * */
		// 存储名
		this.storageName = 'BandVideoList';
		
		/**
		 * 给 videoMap 赋值
		 * */
		if ( this.videoMap.size === 0 ) {
			/*
			* 获取视频信息
			* */
			const videoInfoOriginList = ( GM_getValue( this.storageName ) || [] ) as Array<[ string, BandReadInterface ]>;
			
			/* 将视频信息转换成Map (Object -> Map) */
			this.videoMap = new Map( videoInfoOriginList );
		}
	}
	
	/**
	 * 获取单例储存类
	 * */
	static getInstance() {
		return this.instance;
	}
	
	/**
	 * 获取视频信息
	 * */
	get(): BandReadInterface[] {
		/* 返回视频信息 */
		return Array.from( this.videoMap.values() );
	}
	
	/**
	 * 设置视频信息
	 *
	 * @param {Array<{type: BandVideoType; content: string;}>} appendVideoList
	 * */
	set( appendVideoList: Array<Omit<BandReadInterface, 'band_id'>> ) {
		/**
		 * 遍历 appendVideoList, 储存视频信息到 videoMap 中
		 * */
		appendVideoList.forEach( appendVideoInfo => {
			const { type, content } = appendVideoInfo;
			
			/*  生成唯一的 BandId */
			const bandId = generateBandId( type + content );
			
			/* 存储视频信息, 通过唯一的 BandId 防止重复添加 */
			this.videoMap.set( bandId, {
				band_id: bandId,
				type,
				content
			} );
		} );
		
		// // fixme debugger
		// console.log( 'videoMap:', Array.from( this.videoMap ) )
		
		/**
		 * 将 videoMap 写入本地存储
		 * */
		GM_setValue( this.storageName, Array.from( this.videoMap ) );
	}
}
