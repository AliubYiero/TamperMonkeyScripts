/**
 * VideoInfo.ts
 * created by 2023/12/31
 * @file 视频容器 (从B站加载的视频容器中获取的视频信息)
 * @author  Yiero
 * */

export interface VideoInfo {
	// 目标视频容器节点
	target: Node;
	
	// 视频标题
	title: string;
	
	// 视频 BV 号
	bv: `BV1${ string }`;
	
	// UP主名称
	up: string;
}
