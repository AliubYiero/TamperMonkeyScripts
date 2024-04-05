import { URLModuleMapper } from '../../interfaces/URLModuleMapper.ts';

/**
 * URL模块映射表
 * */
export const urlModuleMapper: URLModuleMapper = {
	// 首页
	'https://www.bilibili.com/': 'index',
	// 动态
	'https://t.bilibili.com/': 'dynamic',
	// 视频
	'https://www.bilibili.com/video/*': 'video',
};