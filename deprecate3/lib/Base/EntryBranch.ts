/**
 * EntryBranch.ts
 * created by 2023/8/27
 * @file
 * @author  Yiero
 * */

import { Info } from './Info'

export {
	EntryBranch
}

/**
 * 入口分支选择类
 * @class
 * */
class EntryBranch {
	private branchList: [ ( ...param: any ) => boolean, Function ][] = [];
	
	/**
	 * 添加分支
	 * @param { function:boolean | boolean } condition
	 * @param { function } callback
	 * */
	add(
		condition: ( ( ...param: any ) => boolean ) | boolean,
		callback: Function
	) {
		// 如果类型是布尔值, 返回将这个布尔值作为条件判断
		if ( typeof condition === 'boolean' ) {
			this.branchList.push( [ () => condition, callback ] );
		}
		// 如果判断类型是函数, 返回函数结果作为条件判断
		else {
			this.branchList.push( [ condition, callback ] );
		}
		
		return this;
	}
	
	/**
	 * 添加默认分支, 无条件默认触发
	 * @param { function } callback
	 * */
	default( callback: Function ) {
		this.add( true, callback );
		
		return this;
	}
	
	/**
	 * 运行, 查看是否存在能够运行的入口
	 * */
	run() {
		const entry = this.branchList.find( entry => entry[ 0 ]() );
		
		if ( entry ) {
			( new Info( 'EntryBranch' ) ).log( '进入分支', entry );
			entry[ 1 ]();
		}
	}
}
