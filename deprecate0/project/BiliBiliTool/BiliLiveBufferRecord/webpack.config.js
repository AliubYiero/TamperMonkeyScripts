const config = {
	// 打包文件名
	filename: 'bundle.js',
	// 最小化代码 | 代码压缩
	isMinimizeCode: false,
	// 是否清除log输出日志
	isCleanLog: false,
	// 使用Html打包
	BundleHTML: {
		isOpen: true,
		// html标题
		HTMLTitle: 'Test Module',
		// 是否使用HTML模板
		isUseHTMLTemplate: false,
	},
	// 使用TamperMoney用户脚本标题
	TamperMonkeyConfig: {
		name: 'BiliBili直播回放/录制',
		/** @todo 搭建整体项目框架 */
		version: 'beta0.0.1',
		match: [
			'https://live.bilibili.com/*',
		],
		/**
		 * @type {GM_addStyle, GM_setValue, GM_getValue, GM_xmlhttpRequest}
		 * */
		grant: [
			'GM_xmlhttpRequest',
		],
		require: [
			'',
		],
		resource: [
			'',
		],
		icon: '',
		namespace: '',
		description: '',
		author: '',
		license: '',
		isRequireSelf: true,
	}
}

const path = require( 'path' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
const WebpackCleanConsolePlugin = require( "webpack-clean-console-plugin" );
const { BannerPlugin } = require( 'webpack' );
const webpackConfig = {
	mode: 'production',
	// 项目入口
	entry: './src/index.ts',
	
	// Webpack打包设置
	output: {
		// 指定打包文件目录
		path: path.resolve( __dirname, 'dist' ),
		// 打包文件名
		filename: config.filename,
		// 重新打包前清空输出目录
		clean: true,
	},
	
	// Webpack打包时使用的依赖
	module: {
		// 加载规则
		rules: [
			{
				test: /\.ts$/,
				use: [
					// 设置Babel加载器
					{
						loader: 'babel-loader',
						// 配置Babel选项
						options: {
							// 预设设置
							presets: [
								[
									'@babel/preset-env',
									{
										// 目标兼容浏览器(浏览器名需小写)
										targets: {
											"chrome": "113",
										},
										// 使用coreJs兼容模块
										"corejs": "3",
										// 按需引入coreJs
										"useBuiltIns": "usage"
									}
								]
							]
						}
					},
					// 设置TypeScript加载器
					'ts-loader'
				],
				exclude: /node-modules/
			}
		]
	},
	
	// 设置模块引用规则
	resolve: {
		// 拓展名为`.ts`和`.js`的可以作为模块引用
		extensions: [
			'.ts',
			'.js'
		]
	},
	
	// Webpack插件引入
	plugins: [
		new BannerPlugin( {
			banner: () => {
				const TamperMonkeyConfig = config.TamperMonkeyConfig;
				
				// 写入配置项，并配置项默认值设置
				function initConfig() {
					TamperMonkeyConfig.name ||= config.filename;
					TamperMonkeyConfig.description ||= config.filename;
					TamperMonkeyConfig.author ||= 'Yiero';
					TamperMonkeyConfig.namespace ||= 'https://github.com/AliubYiero/TemperScripts';
					TamperMonkeyConfig.version ||= 'beta1.0.0';
					TamperMonkeyConfig.license ||= 'GPL';
					TamperMonkeyConfig.icon = TamperMonkeyConfig.match[0] ? TamperMonkeyConfig.match[0].match( /.*?:\/\/.*?\// )[0] + 'favicon.ico' : '';
					
					if ( TamperMonkeyConfig.isRequireSelf ) {
						TamperMonkeyConfig.require.push( 'file://' + path.resolve( __dirname, 'dist', config.filename ) )
					}
					TamperMonkeyConfig.isRequireSelf = '';
				}
				
				// 配置项
				function formatterConfig() {
					// 配置头
					let userScriptConfig = [ '// ==UserScript==' ];
					for ( let tamperMonkeyConfigKey in TamperMonkeyConfig ) {
						const tamperMonkeyConfigValue = TamperMonkeyConfig[tamperMonkeyConfigKey];
						if ( typeof tamperMonkeyConfigValue === 'string' ) {    // 字符串配置
							// 空字符跳过
							if ( !tamperMonkeyConfigValue ) {
								continue;
							}
							// 写入用户配置
							userScriptConfig.push( `// @${ tamperMonkeyConfigKey }\t\t${ tamperMonkeyConfigValue }` );
						} else { // 数组配置
							for ( const tamperMonkeyConfigChildValue of tamperMonkeyConfigValue ) {
								// 空字符跳过
								if ( !tamperMonkeyConfigChildValue ) {
									continue;
								}
								// 写入用户配置
								userScriptConfig.push( `// @${ tamperMonkeyConfigKey }\t\t${ tamperMonkeyConfigChildValue }` );
							}
						}
					}
					// 配置尾
					userScriptConfig.push( '// ==/UserScript==' );
					return userScriptConfig.join( '\n' );
				}
				
				initConfig();
				return formatterConfig();
			}
		} ),
	],
	
	/* 优化 */
	optimization: {
		minimize: config.isMinimizeCode     // 取消代码压缩
	},
};

/* 引入HTML打包模块 */
if ( config.BundleHTML.isOpen ) {
	// 设置html-webpack-plugin配置
	const HTMLWebpackPluginConfig = {};
	if ( config.BundleHTML.isUseHTMLTemplate ) {
		HTMLWebpackPluginConfig.template = './src/index.html';
	} else {
		HTMLWebpackPluginConfig.title = config.BundleHTML.HTMLTitle;
	}
	
	/* 添加html-webpack-plugin依赖 */
	webpackConfig.plugins.push( new HTMLWebpackPlugin( HTMLWebpackPluginConfig ) );
}

if ( config.isCleanLog ) {
	webpackConfig.plugins.push( { include: [ "log" ] } );
}

module.exports = webpackConfig;
