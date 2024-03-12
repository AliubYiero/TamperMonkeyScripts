import { Terser, TerserOptions } from 'vite';

/**
 * 默认 Terser 打包配置接口
 * */
export type defaultTerserOptionsType = TerserOptions & {
	compress: Terser.CompressOptions & {
		pure_funcs: string[];
	}
};
