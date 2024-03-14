import { GMStorage } from '../../../../../lib/GM_Lib'

export { whiteList }

class WhiteList extends GMStorage {
	constructor() {
		super( 'liveIdWhiteList' );
	}
	
	get whiteList(): number[] {
		return this.get( [ 361433, 239802416 ] ) as number[];
	}
	
	/* 添加白名单 */
	add( liveId: number ) {
		const whiteList = this.whiteList;
		whiteList.push( liveId );
		this.set( whiteList );
	}
	
	/* 查看是否存在白名单 */
	has( liveId: number ) {
		return this.whiteList.includes( liveId );
	}
	
	delete( liveId: number ) {
		this.set( this.whiteList.filter( whiteLiveId => whiteLiveId !== liveId ) );
	}
}

const whiteList = new WhiteList();
