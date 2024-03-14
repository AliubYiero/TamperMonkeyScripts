/**
 * @file 项目入口
 * @author  Yiero
 * @version beta1.0.0
 * */


import { LiveDB } from './indexDB/CreateDatabase';
import { FunctionChainCall } from './FunctionChain/FunctionChainCall';
import { getLivePlayUrl, getRoomStatus } from './BiliInfo/Api'
import { Info } from './ProjectInfo/Info'

( () => {
	/**
	 * @readonly
	 * @enum {number}
	 * @type {stop:0, next: 1, finial: 2}
	 * */
	enum Go {
		// 停止执行
		stop,
		// 继续执行下一个函数
		next,
		// 跳转至最后一个函数结束
		finial,
	}
	
	
	/**
	 * 创建数据库
	 * */
	function creatDatabase( res: { go?: Go } ) {
		// new LiveDB();
	}
	
	
	// FunctionChainCall.call();
	// getRoomStatus( { roomId: '169669' } );
	getLivePlayUrl( { roomId: '169669', quality: 4 } )
	
	
} )();
