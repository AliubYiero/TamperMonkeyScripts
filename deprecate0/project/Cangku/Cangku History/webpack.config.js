const config = {
	// 打包文件名
	filename: '仓库历史记录.js',
	// 最小化代码 | 代码压缩
	isMinimizeCode: false,
	// 使用Html打包
	BundleHTML: {
		isOpen: false,
		// html标题
		HTMLTitle: 'Test Module',
		// 是否使用HTML模板
		isUseHTMLTemplate: false,
	},
	userConfig: {
		name: 'Yiero',
		version: 'beta1.0.0'
	}
}

// 目录处理模块
const path = require( 'path' );
// 自动清除dist目录模块
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
// Html文件创建模块
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
// 顶部注释模块
const { BannerPlugin } = require( 'webpack' );


// Webpack配置项
const webpackConfig = {
	mode: 'production',
	// 项目入口
	entry: [ "./src/index.ts" ],
	
	// Webpack打包设置
	output: {
		// 指定打包文件目录
		path: path.resolve( __dirname, 'dist' ),
		// 打包文件名
		filename: config.filename,
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
		new CleanWebpackPlugin(),
		// new BannerPlugin( ( new ConfigComment( config.userConfig ) ).returnString() ),
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

module.exports = webpackConfig;