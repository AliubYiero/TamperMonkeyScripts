/**
 * requestConfig.ts
 * created by 2024/3/11
 * @file 请求基础数据配置
 * @author  Yiero
 * */

/**
 * 请求基础数据列表
 * */
export const requestConfig: {
	// 基础url
	baseURL: string
	
	// csrf校验码
	csrf: string
} = {
	baseURL: 'https://api.bilibili.com',
	csrf: new URLSearchParams( document.cookie.split( '; ' ).join( '&' ) ).get( 'bili_jct' ) || '',
};
