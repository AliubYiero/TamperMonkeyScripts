// 引入`idb-keyval`操作数据库
const {
	createStore,
	set,
	get,
	clear,
} = require( 'idb-keyval' );

export {
	LiveDB
};


/**
 * @class
 * */
class LiveDB {
	private databaseName: string;
	private customStore: unknown;
	
	/**
	 * @constructor
	 * */
	constructor( liveId: string ) {
		this.databaseName = `live-id-${ liveId }`;
		
		this.initDatabase();
	}
	
	initDatabase() {
		this.customStore = createStore( this.databaseName, 'live-buffer' );
		clear( this.customStore ).then(
			() => {
				console.log( `清空数据库${ this.databaseName }` );
			}
		);
	}
	
	get( key: string ) {
		get( key, this.customStore ).then(
			( res: unknown ) => {
				console.log( `成功从数据库 ${ this.databaseName } 中获取数据 {${ key }: ${ res }` );
			}
		).catch(
			( e: string ) => {
				console.error( `发生错误: ${ e }` );
			}
		);
	}
	
	set( key: string, value: unknown ) {
		set( key, value, this.customStore ).then(
			() => {
				console.log( `成功放置数据 {${ key }: ${ value } 到数据库 ${ this.databaseName } ` );
			}
		).catch(
			( e: string ) => {
				console.error( `发生错误: ${ e }` );
			}
		);
	}
}
