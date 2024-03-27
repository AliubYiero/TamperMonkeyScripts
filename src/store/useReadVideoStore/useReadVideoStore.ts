import { ReadVideoData } from '../../interface';

/**
 * 已经读取的视频存储
 * */
export class useReadVideoStore {
	private static instance: useReadVideoStore;
	/**
	 * 储存已读视频的bv id
	 * key: bv id的第一个非前缀字符 BV1<key>
	 * value: bv id字符串数组 (去除 BV1)
	 * */
	private localData: ReadVideoData;
	/** 储存库的名 */
	private STORE_NAME = 'ReadVideoIdList';
	
	private constructor() {
		this.localData = this.getFromDatabase();
	};
	
	/**
	 * 获取储存库
	 * */
	static getInstance(): useReadVideoStore {
		if ( !this.instance ) {
			this.instance = new useReadVideoStore();
		}
		return this.instance;
	}
	
	/**
	 * 和数据库比较视频id
	 * */
	compare( bvId: `BV1${ string }` ) {
		const { firstAlpha, fullAlpha } = this.splitVideoId( bvId );
		this.localData[ firstAlpha ] ||= [];
		return this.localData[ firstAlpha ].includes( fullAlpha );
	}
	
	/**
	 * 清空当前储存
	 * */
	delete() {
		GM_deleteValue( this.STORE_NAME );
		this.localData = this.getFromDatabase();
	}
	
	/**
	 * 设置视频id到存储中
	 * */
	set( bvId: `BV1${ string }` ): boolean {
		/*
		* 先存储到本地
		* */
		const { firstAlpha, fullAlpha } = this.splitVideoId( bvId );
		
		// 如果存在于数据库中, 则直接退出
		if ( this.compare( bvId ) ) {
			return false;
		}
		
		// 储存到本地数据中
		this.localData[ firstAlpha ] ||= [];
		this.localData[ firstAlpha ].push( fullAlpha );
		
		/*
		* 再存储到数据库中
		* */
		GM_setValue( this.STORE_NAME, this.localData );
		return true;
	}
	
	/**
	 * 展示当前的所有数据
	 * */
	show(): ReadVideoData {
		return this.localData;
	}
	
	/**
	 * 分离视频id的前缀 (BV1)
	 * */
	private splitVideoId( bvId: `BV1${ string }` ): {
		firstAlpha: string,
		fullAlpha: string,
	} {
		const fullAlpha = bvId.slice( 3 );
		const firstAlpha = fullAlpha.slice( 0, 1 );
		return {
			firstAlpha,
			fullAlpha,
		};
	}
	
	/**
	 * 从本地储存中获取数据
	 * @returns {ReadVideoData}
	 * */
	private getFromDatabase(): ReadVideoData {
		return GM_getValue( this.STORE_NAME, {} );
	}
}
