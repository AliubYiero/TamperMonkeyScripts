import { CSSRuleMap } from './interfaces';

/**
 * 写入新样式
 *
 * 不能直接使用 `new CSSStyleSheet()` 创建,
 * 某些情况下使用 `new CSSStyleSheet()` 创建的 StyleSheet 无法注入页面
 *
 * @param { string } cssRuleString 包含了将要插入的规则的 DOMString, 详细规则见 CSSStyleSheet.insertRule
 * @tutorial https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleSheet/
 * */
export class CSSStyleController {
	/**
	 * 样式元素 (样式表依附的 style 元素)
	 */
	private styleElement: HTMLStyleElement = document.createElement( 'style' );
	
	/**
	 * 样式表
	 */
	private styleSheet: CSSStyleSheet = new CSSStyleSheet();
	
	/**
	 * @constructor
	 */
	constructor( cssRuleString?: string ) {
		/* 创建 style 样式表 */
		this.createStyleSheet();
		
		/* 如果传入 css 字符串, 则写入样式 */
		cssRuleString && this.push( cssRuleString );
	}
	
	/**
	 * 获取当前样式表的长度
	 * @readonly
	 * */
	get length(): number {
		return this.styleSheet.cssRules.length;
	}
	
	/**
	 * 内部缓存的 CSS 样式表对象
	 *
	 * @todo 有更好的缓存方式? 等找到了再更新 (目前是手动更新缓存 (通过 .push() 和 .delete() 方法))
	 *
	 * @private
	 * */
	private _cssRules: CSSRuleMap = new Map();
	
	/**
	 * 获取当前样式表的规则对象
	 * @readonly
	 */
	get cssRules(): CSSRuleMap {
		return this._cssRules;
	};
	
	/**
	 * 以字符串数组的形式展示当前样式表中所有的样式 /
	 * 或者展示输入参数(样式表)中的所有样式
	 *
	 * @returns { string[] } 字符串数组, 每个元素为一个样式规则 (已自动格式化缩进)
	 */
	show( cssRuleMap?: CSSRuleMap ): string[] {
		/* 参数归一 */
		cssRuleMap ||= this.cssRules;
		
		/*
		* 遍历样式表, 转换成格式字符串
		* */
		return Array.from( cssRuleMap )
			.map( ( [ selectorText, cssStyleMap ] ) => {
				const cssStyleText = Array.from( cssStyleMap )
					.map( ( [ property, value ] ) => {
						return `${ property }:${ value };`;
					} )
					.join( '\n\t' );
				return `${ selectorText } {\n\t${ cssStyleText }\n}`;
			} );
	}
	
	/**
	 * 展示当前样式表中所有的样式
	 *
	 * @returns { string } 样式字符串 (已自动格式化缩进)
	 */
	toString(): string {
		return this.show().join( '\n' );
	}
	
	/**
	 * 添加 CSS 样式到样式表中
	 *
	 * 如果当前样式表中存在样式, 则在原样式的基础上添加样式
	 * */
	add( cssRuleString: string ) {
		const cssRuleMap = this.matchBrackets( cssRuleString );
		
		/*
		* 将 cssRuleMap 分成两个 Map, 一个是新样式, 一个是旧样式
		* */
		const newCssRuleMap: CSSRuleMap = new Map();
		const oldCssRuleMap: CSSRuleMap = new Map();
		cssRuleMap.forEach( ( cssRule, selectorText ) => {
			this.cssRules.has( selectorText )
				/* 旧样式 */
				? oldCssRuleMap.set( selectorText, cssRule )
				/* 新样式 */
				: newCssRuleMap.set( selectorText, cssRule );
		} );
		
		/* 新样式直接添加到样式表中 */
		this.push( newCssRuleMap );
		
		/* 旧样式进行覆盖操作 */
		oldCssRuleMap.forEach( ( cssRule, selectorText ) => {
			// 获取旧的样式
			const oldCssRule = this.cssRules.get( selectorText ) as Map<string, string>;
			
			// 遍历新样式, 将新样式覆写在旧样式上
			cssRule.forEach( ( value, key ) => {
				oldCssRule.set( key, value );
			} );
			
			// 重新写入样式
			oldCssRuleMap.set( selectorText, oldCssRule );
			
			// 删除原有样式
			this.delete( selectorText );
		} );
		
		/* 将旧样式添加到样式表中 */
		this.push( oldCssRuleMap );
		return this;
	}
	
	/**
	 * 删除某个选择器对应的 CSS 样式
	 * */
	delete( selector: string ) {
		// 如果不存在当前 CSS 选择器, 则直接返回
		if ( !this.cssRules.has( selector ) ) {
			return this;
		}
		
		// 找到 CSS 选择器对应的索引
		const willDeleteIndex = Array.from( this.cssRules ).findIndex( ( [ key ] ) => {
			return key === selector;
		} );
		
		// 删除对应 CSSRule
		this.styleSheet.deleteRule( willDeleteIndex );
		
		/*
		* 更新内部 CSS 样式表缓存
		* */
		this.freshCssRules();
		
		return this;
	}
	
	/**
	 * 强制添加 CSS 规则到样式表中
	 *
	 * 如果当前样式表中存在同样选择器的样式, 则会失效 / 覆盖原来的样式
	 * */
	push( cssRule: string | CSSRuleMap ) {
		/* 写入新的CSS规则 */
		try {
			// 解析 CSS 字符串
			let cssRuleMap: CSSRuleMap = typeof cssRule === 'string'
				? this.matchBrackets( cssRule )
				: cssRule;
			const cssRuleStringList: string[] = this.show( cssRuleMap );
			
			/*
			* 插入 CSS 规则到页面中
			* */
			cssRuleStringList.forEach( cssRuleString => {
				// 一次只能插入一条CSS规则
				this.styleSheet.insertRule( cssRuleString );
			} );
			
			/*
			* 更新内部 CSS 样式表缓存
			* */
			this.freshCssRules();
		} catch ( e ) {
			// 报错时(写入CSS规则失败), 移除刚添加的CSSStyleSheet (回滚操作)
			this.remove();
			throw new Error( e as string );
		}
		
		return this;
	}
	
	/**
	 * 移除整个样式表
	 * */
	remove() {
		this.styleElement && this.styleElement.remove();
	}
	
	/**
	 * 更新内部的 CSS 规则缓存
	 * */
	private freshCssRules() {
		const cssTexts = Array.from( this.styleSheet.cssRules )
			.map( item => item.cssText )
			.join( '\n' );
		
		this._cssRules = this.matchBrackets( cssTexts );
	}
	
	/**
	 * 创建一个新的样式表到页面中
	 * */
	private createStyleSheet() {
		/*
		* 如果存在 CSS 样式, 则先删除再创建
		* */
		this.remove();
		
		/*
		* 声明新的CSSStyleSheet
		* 向head元素中添加一个新的style元素
		*  */
		try {
			/*
			* 如果当前环境中存在 GM_addElement() 函数, 则使用 GM_addElement() 函数
			*
			* 虽然添加的 style 元素不是通过 link 引入的应该不会触发 CSP 防御, 但是还是防止一下
			* */
			this.styleElement = GM_addElement( document.head, 'style', {
				id: `style-${ Date.now() }-${ Math.random().toString().slice( 2, 8 ) }`,
			} ) as HTMLStyleElement;
		} catch ( e ) {
			/*
			* 如果当前环境中不存在 GM_addElement() 函数, 则使用原生方法添加元素
			* */
			this.styleElement = document.createElement( 'style' );
			this.styleElement.id = `style-${ Date.now() }-${ Math.random().toString().slice( 2, 8 ) }`;
			document.head.appendChild( this.styleElement );
		}
		
		/*
		* 遍历所有样式表获取空的CSS样式表(新添加的CSS样式表)
		* 新添加了CSSStyleSheet可能不在document.styleSheets的最后一个, 需要遍历获取空样式表
		* 倒序遍历, 优化性能
		* */
		const newStyleSheet = Array.from( document.styleSheets )
			.findLast( cssStyleSheet => {
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
	}
	
	/**
	 * 匹配同层级的CSS字符串, 将 CSS 字符串转化成 CSS 规则数组
	 *
	 * @param { string } cssContent CSS规则字符串
	 *
	 * @return { string[] } CSS规则数组
	 * */
	private matchBrackets( cssContent: string ): CSSRuleMap {
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
		* 清空制表符, 换行符
		* */
		cssContent = cssContent.replace( /[\t\n]/g, '' );
		
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
					spiltConfig.index.start = spiltConfig.index.end;
				}
			}
		}
		
		// console.log( matchList );
		
		/*
		* 将 CSS 规则数组变成对象数组
		* */
		const cssRuleMap = matchList.reduce( (
			cssRuleMap: CSSRuleMap,
			cssRule,
		) => {
			const [ _, selectorText, cssStyleText ] = cssRule
				.match( /([^{]+){(.*)}/ ) as RegExpMatchArray;
			
			
			/**
			 * css 样式 Map
			 *
			 * @example Map<属性, 值>
			 * */
			const cssStyleMap: Map<string, string> = cssStyleText
				.split( ';' )
				.filter( item => item.trim() )
				.reduce( ( result: Map<string, string>, item ) => {
					const [ key, value ] = item.split( ':' );
					result.set( key.trim(), value.trim() );
					return result;
				}, new Map() );
			// console.log( selectorText );
			cssRuleMap.set( selectorText.trim(), cssStyleMap );
			
			return cssRuleMap;
		}, new Map() );
		
		return cssRuleMap;
	}
}
