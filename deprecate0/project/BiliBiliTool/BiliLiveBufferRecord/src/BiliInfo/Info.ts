/**
 * Info.ts
 * created by 2023/6/9
 * @file bilibili信息处理
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	getLiveRoomId
}

/**
 * 从URL中获取直播间Id
 * @return {{roomId:string}}
 * */
function getLiveRoomId(): { roomId: string } {
	// @ts-ignore
	const roomId: string = location.pathname.split( '/' )[ ( this ).length - 1 ];
	return { roomId };
}
