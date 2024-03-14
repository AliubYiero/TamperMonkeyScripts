/**
 * 根据url后缀判断文件类型
 * @param { string } url
 * @return { boolean }
 * */
export function isCSS( url: string ): boolean {
	return url.endsWith( 'css' );
}
