/**
 * Info.ts
 * created by 2023/6/9
 * @file 输出当前项目信息
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	Info
}

/**
 * 输出当前项目信息
 * @class info
 * */
class Info {
	
	// @ts-ignore
	private projectName: string
	private readonly header: string
	
	constructor( projectName: string ) {
		this.projectName = projectName;
		this.header = `[${ projectName }]`;
	}
	
	log( ...msg: LogMsg ) {
		console.log( ...this.contentInfo( ...msg ) );
	}
	
	info( ...msg: LogMsg ) {
		console.info( ...this.contentInfo( ...msg ) );
	}
	
	warn( ...msg: LogMsg ) {
		console.warn( ...this.contentInfo( ...msg ) );
	}
	
	error( ...msg: LogMsg ) {
		console.error( ...this.contentInfo( ...msg ) );
	}
	
	private contentInfo( ...msg: LogMsg ): any[] {
		return [ this.header, `[${ new Date().toLocaleString( 'zh-ch' ) }]`, ...msg ];
	}
}


type LogMsg = string | any | any[];
