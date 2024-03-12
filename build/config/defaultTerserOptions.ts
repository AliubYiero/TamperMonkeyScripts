/**
 * defaultTerserOptions.ts
 * created by 2024/3/12
 * @file 默认Terser配置文件
 * @author  Yiero
 * */
import { TerserOptions } from 'vite';

/**
 * 默认 Terser 打包配置
 * */
export const defaultTerserOptions: TerserOptions = {
	// 压缩选项
	compress: {
		// 关闭大部分压缩选项, 只保留设置的选项
		defaults: false,
		// 移除所有 `debugger` 语句
		drop_debugger: true,
		// 移除所有 `console.log()` 语句
		pure_funcs: [ 'console.log' ],
		// 折叠一次性使用的非恒定变量
		collapse_vars: true,
		// 移除无法执行的代码
		dead_code: true,
		// 删除冗余或非标准指令
		directives: true,
		// 优化if/return和if/continue语句
		if_return: true,
		// 优化if-s和条件表达式语句
		conditionals: true,
		// 将 `typeof foo == "undefined"` 语句转换成 `foo === void 0` 语句
		typeofs: true,
	},
	// 混淆选项
	mangle: false,
	// 格式化选项
	format: {
		// 清除所有注释
		comments: false,
		// 优化代码排版 (弃用属性)
		beautify: true,
		// 转义 Unicode 字符
		ascii_only: true,
	},
};
