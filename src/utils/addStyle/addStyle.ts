/**
 * addStyle.ts
 * created by 2024/3/6
 * @file 向页面添加css样式工具类
 * @author  Yiero
 * */
// const a = `
// .b_algo .b_deep h3{font-size:20px;line-height:24px}.b_algo .b_deep h3{padding-bottom:3px;line-height:1.2em}.b_deep p{display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;-webkit-line-clamp:2;height:40px;line-height:20px}#tabcontrol_53_B02FF1 .tab-head { height: 40px; } #tabcontrol_53_B02FF1 .tab-menu { height: 40px; } #tabcontrol_53_B02FF1_menu { height: 40px; } #tabcontrol_53_B02FF1_menu>li { background-color: #ffffff; margin-right: 0px; height: 40px; line-height:40px; font-weight: 700; color: #767676; } #tabcontrol_53_B02FF1_menu>li:hover { color: #111; position:relative; } #tabcontrol_53_B02FF1_menu .tab-active { box-shadow: inset 0 -3px 0 0 #111; background-color: #ffffff; line-height: 40px; color: #111; } #tabcontrol_53_B02FF1_menu .tab-active:hover { color: #111; } #tabcontrol_53_B02FF1_navr, #tabcontrol_53_B02FF1_navl { height: 40px; width: 32px; background-color: #ffffff; } #tabcontrol_53_B02FF1_navr .sv_ch, #tabcontrol_53_B02FF1_navl .sv_ch { fill: #444; } #tabcontrol_53_B02FF1_navr:hover .sv_ch, #tabcontrol_53_B02FF1_navl:hover .sv_ch { fill: #111; } #tabcontrol_53_B02FF1_navr.tab-disable .sv_ch, #tabcontrol_53_B02FF1_navl.tab-disable .sv_ch { fill: #444; opacity:.2; }#slideexp1_B42088 .slide { width: 280px; margin-right: 8px; }#slideexp1_B42088c .b_slidebar .slide { border-radius: 6px; }#slideexp1_B42088 .slide:last-child { margin-right: 1px; }#slideexp1_B42088c { margin: -4px; } #slideexp1_B42088c .b_viewport { padding: 4px 1px 4px 1px; margin: 0 3px; } #slideexp1_B42088c .b_slidebar .slide { box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05); -webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05); } #slideexp1_B42088c .b_slidebar .slide.see_more { box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.00); -webkit-box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.00); } #slideexp1_B42088c .b_slidebar .slide.see_more .carousel_seemore { border: 0px; }#slideexp1_B42088c .b_slidebar .slide.see_more:hover { box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.00); -webkit-box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.00); }
// `;

/**
 * 写入新样式
 *
 * 不能直接使用 `new CSSStyleSheet()` 创建,
 * 某些情况下使用 `new CSSStyleSheet()` 创建的 StyleSheet 无法注入页面
 *
 * @param { string } cssRuleString 包含了将要插入的规则的 DOMString, 详细规则见 CSSStyleSheet.insertRule
 * @tutorial https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleSheet/insertRule
 * */
export class CSSStyleController {
	private styleElement: HTMLStyleElement | undefined;
	private styleSheet: CSSStyleSheet | undefined;
	
	constructor( cssRuleString?: string ) {
		/* 如果传入css字符串, 则创建 style 样式表 */
		cssRuleString && this.createStyle( cssRuleString );
	}
	
	/**
	 * 创建一个新的样式表到页面中
	 * */
	createStyle( cssRuleString: string ) {
		/*
		* 如果存在 CSS 样式, 则先删除再创建
		* */
		this.remove();
		
		/*
		* 声明新的CSSStyleSheet
		* 向head元素中添加一个新的style元素
		*  */
		this.styleElement = document.createElement( 'style' );
		this.styleElement.id = `style-${ Date.now() }-${ Math.random().toString().slice( 2, 8 ) }`;
		document.head.appendChild( this.styleElement );
		
		/*
		* 遍历所有样式表获取空的CSS样式表(新添加的CSS样式表)
		* 新添加了CSSStyleSheet可能不在document.styleSheets的最后一个, 需要遍历获取空样式表
		* 倒序遍历, 优化性能
		* */
		const newStyleSheet = Array.from( document.styleSheets ).findLast( cssStyleSheet => {
			/*
			* 通过link引入的CSSStyleSheet无法读取cssRules, 通过cssStyleSheet.href筛选是否通过link引入的css;
			* 通过link引入的css的href属性会是一个链接字符串, 直接使用style定义的href属性是null.
			* */
			return !cssStyleSheet.href && cssStyleSheet.type === 'text/css' && cssStyleSheet.cssRules.length === 0;
		} );
		
		/*
		* 当没有找到空的样式表时
		* */
		if ( !newStyleSheet ) {
			/* 移除空的样式表 */
			this.remove();
			/* 样式表插入失败 / 无法失败新样式表 */
			throw new Error( '无法添加样式表' );
		}
		
		/* 储存样式表 */
		this.styleSheet = newStyleSheet;
		
		// 写入新的CSS规则
		this.add( cssRuleString );
	}
	
	/**
	 * 添加 CSS 样式到样式表中
	 * */
	add( cssRuleString: string ) {
		/* 写入新的CSS规则 */
		try {
			// 将 CSS 规则字符串分割成数组 (单独的 CSS 规则为一个元素)
			const cssRuleList = this.matchBrackets( cssRuleString );
			// 依次将 CSS 规则写入样式表中
			cssRuleList.forEach( cssRule => {
				this.styleSheet?.insertRule( cssRule );
			} );
		} catch ( e ) {
			// 报错时(写入CSS规则失败), 移除刚添加的CSSStyleSheet (回滚操作)
			this.remove();
			throw new Error( e as string );
		}
		
		return this;
	}
	
	/**
	 * 删除某个 CSS 规则
	 * @todo 删除某个 CSS 规则
	 * */
	delete() {
		return this;
	}
	
	/**
	 * 替换某个 CSS 规则
	 * @todo 替换某个 CSS 规则
	 * */
	replace( cssRuleString: string ) {
		console.log( this.styleSheet );
		this.styleSheet?.replaceSync( cssRuleString );
		
		return this;
	}
	
	/**
	 * 移除整个样式表
	 * */
	remove() {
		this.styleElement && this.styleElement.remove();
	}
	
	/**
	 * 匹配同层级的CSS字符串, 将 CSS 字符串转化成 CSS 规则数组
	 * @param { string } cssContent CSS规则字符串
	 * @return { string[] } CSS规则数组
	 *
	 * @todo 分割成 {selectorText: { [cssKey: string]: string }}[] 数组的形式
	 * */
	private matchBrackets( cssContent: string ): string[] {
		/*
		* 定义计数变量配置
		* */
		let spiltConfig = {
			// 分割字符串符号
			sign: {
				left: '{',
				right: '}',
			},
			// 层级计数器
			levelCounter: 0,
			// 分割字符串索引
			index: {
				start: 0,
				end: 0,
			},
		};
		
		/*
		* 清空空白字符
		* */
		cssContent = cssContent.replace( /\s/g, '' );
		
		/*
		* 匹配 CSS 规则
		* */
		const matchList = [];
		for ( let i = 0; i < cssContent.length; i++ ) {
			if ( cssContent[ i ] === spiltConfig.sign.left ) {
				// 获取到左匹配符号, 增加层级
				spiltConfig.levelCounter++;
			}
			else if ( cssContent[ i ] === spiltConfig.sign.right ) {
				// 获取到右匹配符号, 减少层级
				spiltConfig.levelCounter--;
				
				// 如果层级为0, 表示获取到匹配字符串
				if ( spiltConfig.levelCounter === 0 ) {
					spiltConfig.index.end = i + 1;
					matchList.push( cssContent.substring( spiltConfig.index.start, spiltConfig.index.end ) );
					spiltConfig.index.start = spiltConfig.index.end + 1;
				}
			}
		}
		
		return matchList;
	}
}
