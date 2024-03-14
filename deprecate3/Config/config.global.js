/**
 * config.global.js
 * created by 2023/8/19
 * @file 全局默认配置项
 * @author  Yiero
 * */

const GlobalConfig = {
	// 脚本配置项
	userinfo: {
		/**
		 * 在这下面定义的userinfo.config配置项会是默认配置项, 新建的项目会应用这些配置
		 * 可选配置:
		 * @property { string } author 默认作者
		 * @property { string } namespace 默认命名空间
		 * @property { string } version 默认版本号
		 * @property { string } license 默认项目许可证
		 *  */
		config: {
			author: 'Yiero',
			namespace: 'https://github.com/AliubYiero/TamperMonkeyScripts/',
			version: '1.0.0',
			license: 'GPL',
		},
		
		/**
		 * 在这下面可以定义一些userinfo配置项的默认简写,
		 * 目前可以定义 grant, require, resource, run-at 这四个配置项的缩写,
		 * 在对应配置项的中定义对象属性, 可以在项目的userinfo中输入键(key)[缩写], 输出右侧的值(value)[展开]
		 * [展开]支持
		 * @property { { [shorten: string]: string | string[] } } grant grant函数
		 * @property { { [shorten: string]: string | string[] } } require js引用
		 * @property { { [shorten: string]: string | string[] } } resource 资源引用
		 * @property { { [shorten: string]: string } } run-at 运行时机
		 * */
		shorten: {
			grant: {
				style: 'GM_addStyle',
				element: [ 'GM_addElement', 'GM_addStyle' ],
				css: [ 'GM_addStyle', 'GM_getResourceText' ],
				menu: [ 'GM_registerMenuCommand', 'GM_unregisterMenuCommand' ],
				storage: [ 'GM_setValue', 'GM_getValue', 'GM_deleteValue', 'GM_listValues' ],
				listener: [ 'GM_addValueChangeListener', 'GM_removeValueChangeListener' ],
				clipboard: 'GM_setClipboard',
			},
			
			require: {
				/**
				 * SmartAlert
				 * @tutorial https://wpmore.cn/resources/SweetAlert2/
				 * */
				SmartAlert: 'https://cdn.bootcdn.net/ajax/libs//sweetalert2/11.7.27/sweetalert2.min.js',
				alert: 'https://cdn.bootcdn.net/ajax/libs//sweetalert2/11.7.27/sweetalert2.min.js',
				/* Vue2 */
				vue2: 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js',
				/* ElementUI */
				element: [
					'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js',
					'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.13/index.min.js'
				],
				/* Layui */
				layui: 'https://unpkg.com/layui@2.8.0/dist/layui.js',
				/** html to canvas
				 * @tutorial https://html2canvas.hertzen.com/documentation
				 * */
				screenshot: 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js',
			},
			
			resource: {
				/* ElementUI css资源 */
				element: 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.13/theme-chalk/index.min.css',
				/* Layui css资源 */
				layui: 'https://cdn.staticfile.org/layui/2.8.11/css/layui.min.css',
			},
			
			"run-at": {
				start: 'document-start',
				body: 'document-body',
				end: 'document-end',
				idle: 'document-idle',
				default: 'document-idle',
				menu: 'context-menu',
			}
		}
	},
	
	ignore: {
		/* 忽略某个项目的构建 */
		project: [
			'CangkuAutoAttendance',
			'CangkuHistoryRecord',
			'CangkuLinkCompletion',
			'WeChatReadAutoScroll',
			'GlobalAutoLogin',
			// 'BiliClean',
			'CCLiveClean',
			'DouyinLiveClean',
			'ChaoxingClean',
			'BiliDynamicScreenshot',
			'BiliQuinDynamicLiveLinkJump',
		],
		/*
		* 忽略项目中某个文件或文件夹的时间戳判断:
		* 1. 以index入口文件存在的路径为根路径, 不支持'./'相对路径
		* 2. 忽略某个文件, 直接写入该文件相对于项目路径下的地址, 如果存在文件夹, 以'\\'作为路径分隔符, 如 'src\\demo.js'
		*    如: README.md则是忽略所有项目根路径下的README.md文件的更改, 即只更改README.md文件项目将无法重新构建.
		* 3. 忽略文件夹: 使用 '\\' 结束的字符串将被识别为文件夹路径:
		*    如: 'src\\' 将忽略所有项目的src路径下的所有文件和文件夹.
		* 区分大小写
		* */
		projectFileTimestamp: [
			'README.md',
		]
	},
	
	/* 创建文件的默认内容 */
	defaultContent: {
		// index文件的默认内容
		index: '/* entry */\n;( async () => {\n\n} )();'
	},
}

export {
	GlobalConfig
}
