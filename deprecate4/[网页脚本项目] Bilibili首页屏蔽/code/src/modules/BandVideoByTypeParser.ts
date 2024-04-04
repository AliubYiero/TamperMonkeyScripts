/**
 * BandVideoByTypeParser.ts
 * created by 2023/12/31
 * @file 根据类型屏蔽视频解析器
 * @author  Yiero
 * */
import { BandReadInterface } from '../interfaces/BandReadInterface'

/**
 * 根据给定规则隐藏节点
 *
 * @param matchRule - 一个比较两个字符串并返回布尔值的函数。
 * @param {Object} matchContent - An object containing the target node, a list of BandReadInterface objects, and a content string.
 * @param {Node} matchContent.target - The target node to be hidden.
 * @param {BandReadInterface[]} matchContent.BandVideoList - A list of BandReadInterface objects.
 * @param {string} matchContent.content - The content string used for matching.
 */
const hideNodeByRule = ( matchRule: ( compareContent: string, originContent: string ) => boolean, matchContent: {
	target: Node,
	BandVideoList: BandReadInterface[],
	content: string,
} ) => {
	const { target, BandVideoList, content } = matchContent;
	
	/* 遍历寻找是否存在屏蔽的内容 */
	const foundBandUp = BandVideoList.find( ( item: BandReadInterface ) => {
		matchRule( content, item.content );
	} );
	
	/* 未找到, 返回 */
	if ( !foundBandUp ) {
		return;
	}
	
	/* 找到, 屏蔽视频 */
	( target as HTMLElement ).classList.add( 'hide' );
	console.info( '已屏蔽视频: ', content );
}


export const BandVideoByTypeParser = {
	
	/**
	 * 根据 UP 主名称屏蔽视频
	 * */
	up( upName: string, target: Node, BandVideoList: BandReadInterface[] ) {
		hideNodeByRule( ( compareContent: string, originContent: string ) => {
			return compareContent === originContent;
		}, {
			target,
			BandVideoList,
			content: upName
		} );
	},
	
	/**
	 * 根据视频标题关键字屏蔽视频
	 * */
	title( title: string, target: Node, BandVideoList: BandReadInterface[] ) {
		hideNodeByRule( ( compareContent: string, originContent: string ) => {
			return originContent.includes( compareContent );
		}, {
			target,
			BandVideoList,
			content: title
		} );
	},
	
	
	/**
	 * 根据视频BV号屏蔽视频
	 * */
	bv( bvId: `BV1${ string }`, target: Node, BandVideoList: BandReadInterface[] ) {
		hideNodeByRule( ( compareContent: string, originContent: string ) => {
			return compareContent === originContent;
		}, {
			target,
			BandVideoList,
			content: bvId
		} );
	},
}
