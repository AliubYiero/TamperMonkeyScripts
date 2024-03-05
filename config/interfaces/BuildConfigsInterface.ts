/**
 * 脚本打包时的配置选项
 * */
export interface BuildConfigsInterface {
	/**
	 * 是否在生产环境中压缩混淆代码
	 *
	 * @default false
	 * */
	devMinify: boolean;
	
	/**
	 * 是否在开发环境中压缩混淆代码
	 *
	 * @default false
	 * */
	productionMinify: boolean;
	
	/**
	 * 是否在生产环境中加密代码 (字符转Unicode, 清空注释),
	 * 在有限度保证代码完整性的同时阻止影响代码的阅读性
	 *
	 * @default true
	 * */
	productionTerser: boolean;
	
	/**
	 * 是否在开发环境中版本号添加 beta 后缀
	 *
	 * @default true
	 * */
	devVersionSuffix: boolean;
	
	/**
	 * 是否在开发环境中热更新代码
	 *
	 * @default true
	 * */
	devHotUpdate: boolean;
	
	/**
	 * 是否在开发环境中自动添加自我引用
	 *
	 * @default true
	 * */
	devSelfLink: boolean;
	
	/**
	 * 是否在生产环境中移除 console.log()
	 *
	 * @default true
	 * */
	productionRemoveConsoleLog: boolean;
	
	/**
	 * 是否在生产环境中热更新代码
	 *
	 * 不建议开启,
	 * 因为在生产环境中, 每次打包都会检测版本号是否与上一次打包相同,
	 * 开启后会导致冲突报错 (除非关闭 productionCheckVersion 选项)
	 *
	 * @default false
	 * */
	productionHotUpdate: boolean;
	
	
	/**
	 * 是否生产环境中检查版本号
	 *
	 * 开启后会在生产环境中检查版本号是否与上一次打包相同,
	 * 如果相同则会报错无法构建
	 *
	 * @default true
	 * */
	productionCheckVersion: boolean;
	
}
