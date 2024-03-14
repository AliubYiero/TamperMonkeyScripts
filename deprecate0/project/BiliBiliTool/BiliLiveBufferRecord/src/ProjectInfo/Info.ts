/**
 * Info.ts
 * created by 2023/6/9
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	Info
}

/**
 * 静态类，输出当前项目信息
 * @class Info
 * */
class Info {
	private static header: string = '[BiliBili直播回放/录制]';
	
	private static contentInfo( msg: string ): string {
		return `${ this.header } ${ msg }`
	}
	
	static info( msg: string ) {
		console.info( this.contentInfo( msg ) );
	}
	
	static warn( msg: string ) {
		console.warn( this.contentInfo( msg ) );
	}
	
	static error( msg: string ) {
		console.error( this.contentInfo( msg ) );
	}
}
