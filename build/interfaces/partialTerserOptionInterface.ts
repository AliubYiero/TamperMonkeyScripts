/**
 * 可选的 Terser 配置项
 * */
export interface PartialTerserOptionInterface {
	// 是否移除 console.log()
	removeConsoleLog?: boolean;
	
	// 压缩代码配置
	compressOption?: boolean | 'complex' | 'simple';
}
