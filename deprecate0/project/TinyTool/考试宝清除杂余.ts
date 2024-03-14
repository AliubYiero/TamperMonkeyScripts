// ==UserScript==
// @name        考试宝答题界面优化
// @namespace   https://github.com/AliubYiero/TemperScripts
// @version     1.2.6
// @description 优化考试宝答题界面UI，增加按键绑定
// @author      Yiero
// @match       https://www.zaixiankaoshi.com/*
// @icon        https://www.zaixiankaoshi.com/favicon.ico
// @require		file://D:\Code\TemperScripts\project\TinyTool\考试宝清除杂余.js
// @license     GPL
// @grant       GM_addStyle
// ==/UserScript==


// -------------------- 辅助函数 ------------------------------
/** 职责链控制器
 * @class
 * */
class FunctionChainCall {
	private callChain: Array<[ Function, any[] ]>;
	
	constructor() {
		this.callChain = [];
	}
	
	set( fn, params = [] ) {
		this.callChain.push( [ fn, params ] );
	}
	
	setList( array ) {
		array.forEach( ( fn: Function | [ Function, any[] ] ) => {
			// 非数组不带参数的函数
			if ( !Array.isArray( fn ) ) {
				this.set( fn )
				return;
			}
			
			// 数组带参数函数
			this.set( fn[ 0 ], fn[ 1 ] );
		} )
	}
	
	show() {
		console.info( this.callChain );
	}
	
	// @ts-ignore
	async call() {
		let returnString;	// 函数执行判断器
		while ( this.callChain[ 0 ] ) {
			if ( returnString === 'stop' ) {
				return;
			} else if ( returnString === 'skip' ) {
				this.callChain.shift();
				continue;
			}
			const fn = this.callChain[ 0 ]
			returnString = await fn[ 0 ].apply( null, fn[ 1 ] );
			this.callChain.shift();
		}
	}
}

const functionChainCall = new FunctionChainCall();

/**
 * 多选题提交状态改变
 * @class
 * */
class SubmitAnswerStatusChange {
	static isSubmit: Boolean = false;
	
	/**
	 * @static
	 * 状态改变：提交
	 * */
	static submit() {
		this.isSubmit = true;
	}
	
	/**
	 * @static
	 * 状态改变：取消提交
	 * */
	static close() {
		this.isSubmit = false;
	}
	
	/**
	 * @static
	 * 状态改变：更新提交
	 * */
	static fresh() {
		this.close();
	}
}

/**
 * 选项更新观察者类
 * @class
 * @extends MutationObserver
 * */
class OptionObserver extends MutationObserver {
	constructor( Node, callback ) {
		super( callback );
		
		super.observe( Node, {
			childList: true
		} )
	}
}

/** 判断Url前缀是否为输入前缀 */
function urlJudge( urlHeader: string | RegExp ): Boolean {
	if ( typeof urlHeader === 'string' ) {
		urlHeader = new RegExp( urlHeader );
	}
	
	return !!document.URL.match( urlHeader );
	
}

// ----------------- 主函数 -----------------
/** 绑定页面更改事件，强制更改为页面刷新 */
function bindPageReloadEvent() {
	console.log( 'Bind page reload event.' );
	
	function reloadPage() {
		console.info( 'Reload Page.' );
		location.reload();
	}
	
	window.addEventListener( 'hashchange', reloadPage );
	
	let _pushState = window.history.pushState;
	window.history.pushState = function () {
		setTimeout( reloadPage, 1000 );
		return _pushState.apply( this, arguments );
	}
}

/** 移除多余元素 & 优化答题界面UI */
function removeExtraElement() {
	// @ts-ignore
	GM_addStyle( `
		/* 居中主容器 */
		.app-main {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0;
		}
		
		/* 优化主容器UI */
		.middle-container {
			padding: 10px ${ 16 + 19 + 16 + 10 }px;
			border-radius: 10px;
		}
		
		/* 隐藏多余元素 */
		.vip-quanyi,
		.new-footer,
		.header,
		.answer-box-detail,
		.answer-box-detail,
		.vip-tips,
		.right-float-window,
		.page-main .pull-right > :not(.serch-form)
		{
			display: none;
		}
	` )
}


/** 模拟考试界面：解锁题目乱序选择 */
function unlockRandomOption() {
	if ( !urlJudge( /https:\/\/www\.zaixiankaoshi\.com\/mnks\/\?paperid/ ) ) {
		return;
	}
	
	// 清空用户选择
	localStorage.removeItem( 'openRandomOption' );
	
	// 获取随机选项选择容器
	console.info( 'Remove Origin Random Option Btn. ' );
	const formContainer = document.querySelectorAll( 'div.box-card > form > div' ) as NodeList;
	let randomOptionLabel: HTMLDivElement;
	formContainer.forEach( formItem => {
		if ( ( <HTMLDivElement> formItem ).querySelector( 'label' )?.innerText === '选项乱序' ) {
			randomOptionLabel = formItem as HTMLDivElement;
		}
	} )
	
	// 删除原生选项
	const randomOptionBtn = randomOptionLabel.querySelector( 'div' ) as HTMLElement;
	randomOptionBtn.remove();
	
	// 添加本脚本的选项
	const reRandomOptionBtnContainer = document.createElement( 'form' );
	reRandomOptionBtnContainer.id = 'random-option-container';
	// 更改样式使其和原样式相容
	reRandomOptionBtnContainer.style.height = '40px';
	reRandomOptionBtnContainer.style.lineHeight = '40px';
	reRandomOptionBtnContainer.innerHTML = `
		<input type="radio" name="randomOption" id="random-option--open" value="true">
		<label for="random-option--open">开启</label>
		<input type="radio" name="randomOption" id="random-option--close" value="false">
		<label for="random-option--close">关闭</label>
		<!-- <div style="text-indent: 2em;color:red;background:#f8f8f8;">请注意，当您开启本脚本的随机选项时，您需要使用键盘选择选项，使用鼠标选择选项会出现选项映射错误导致无法获得正确答案。</div> -->
	`;
	randomOptionLabel.append( reRandomOptionBtnContainer );
	
	// 储存用户选择
	reRandomOptionBtnContainer.addEventListener( 'change', e => {
		localStorage.setItem( 'openRandomOption', ( <HTMLInputElement> e.target ).value );
	} )
}

/** 模拟考试界面：题目选择添加快捷选项 */
function addQuickOption() {
	if ( !urlJudge( /https:\/\/www\.zaixiankaoshi\.com\/mnks\/\?paperid/ ) ) {
		return;
	}
	
	console.info( 'Add quick question choose option. ' );
	
	// 获取题目选择容器
	const tableContainer = document.querySelector( '.custom-table' ) as HTMLTableElement;
	
	// 获取所有行容器
	const colList = tableContainer.querySelectorAll( 'tr:not(:last-of-type)' );
	colList.forEach( col => {
		// 获取列容器
		const row = col.querySelector( 'td:nth-of-type(2)' ) as HTMLInputElement;
		
		// 获取题目选择输入框
		const colInput = row.querySelector( 'input' );
		const { min, max } = colInput;
		
		// 绑定最大值按钮
		const maxBtn = document.createElement( 'button' );
		maxBtn.classList.add( 'el-button' );
		maxBtn.innerText = 'Max';
		maxBtn.addEventListener( 'click', e => {
			e.preventDefault();
			colInput.value = max;
		} );
		// 绑定最小值按钮
		const minBtn = document.createElement( 'button' );
		minBtn.classList.add( 'el-button' );
		minBtn.innerText = 'Min';
		minBtn.addEventListener( 'click', e => {
			e.preventDefault();
			colInput.value = min;
		} );
		// 绑定10%按钮
		const tenPercentBtn = document.createElement( 'button' );
		tenPercentBtn.classList.add( 'el-button' );
		tenPercentBtn.innerText = '10%';
		tenPercentBtn.addEventListener( 'click', e => {
			e.preventDefault();
			colInput.value = String( Math.ceil( parseInt( max ) * 0.1 ) );
		} );
		row.append( maxBtn );
		row.append( minBtn );
		row.append( tenPercentBtn );
	} )
}

functionChainCall.set( addQuickOption )

/** 判断是否为答题界面 */
function isAnswerUI() {
	const localURL = document.URL.split( '/' );
	console.log( localURL[ localURL.length - 2 ] );
	if ( [ 'online', 'simulation' ].indexOf( localURL[ localURL.length - 2 ] ) === -1 ) {
		console.info( '非答题界面，已退出' );
		bindPageReloadEvent();
		return 'stop';
	}
}

/** 使用题目乱序 */
function useRandomOption() {
	// 排除没有选择乱序题目的情况
	if ( localStorage.getItem( 'openRandomOption' ) !== 'true' || !urlJudge( 'https://www.zaixiankaoshi.com/mnks/simulation/' ) ) {
		return;
	}
	
	// 获取随机容器
	console.info( 'Use Random Option.' );
	const optionContainer = document.querySelector( '.select-left' );
	
	// 打乱选项
	const optionList = optionContainer.querySelectorAll( '.option' );
	let optionArray = [];
	optionList.forEach( option => {
		optionArray.push( option );
	} )
	optionArray = optionArray.sort( ( a, b ) => {
		return Math.random() - 0.5;
	} )
	console.log( optionArray );
	
	// 更换打乱后选项的编号
	const upperAlphaList = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];
	for ( let i = 0; i < optionArray.length; i++ ) {
		const option = optionArray[ i ] as HTMLDivElement;
		( <HTMLSpanElement> option.querySelector( '.before-icon' ) ).innerText = upperAlphaList[ i ]
	}
	
	// 放置随机容器
	optionArray.forEach( option => {
		optionContainer.append( option );
	} )
}


/** 更换大字号字体 */
function setLargeFont() {
	if ( !urlJudge( /https:\/\/www\.zaixiankaoshi\.com\/mnks\/\?paperid/ ) ) {
		return;
	}
	const LargeFontBtn = document.querySelector( 'div.clearfix.font-set span:nth-of-type(3)' ) as HTMLElement;
	LargeFontBtn.click();
}

/** 更换题目时重新初始化提交状态 */
function initOption() {
	new OptionObserver( document.querySelector( '.qusetion-box' ), e => {
		console.info( 'Change question' );
		SubmitAnswerStatusChange.fresh();
	} );
}

// @todo fix 在函数内进行状态链接
let optionList;

/** 更换选项Dom
 *  当单选/多选切换时，会更换成另外的容器进行答题，需要重新绑定容器
 * */
function getOptionContainer() {
	optionList = document.querySelectorAll( '.options-w > .option' );
	try {
		new OptionObserver( document.querySelector( '.top-hd' ), e => {
			// console.log( e );
			new OptionObserver( document.querySelector( '.options-w' ), e => {
				console.info( 'Fresh Options: ' );
				// console.log( e );
				optionList = document.querySelectorAll( '.options-w > .option' );
			} )
		} )
	} catch ( e ) {
		// 获取不到题目卡片时刷新页面重新加载
		// location.reload();
	}
}


/** 绑定键盘事件，让键盘点击可以选择选项，跳转题目 */
function bindKeyboardEvent() {
	try {
		/* 绑定键盘按键 */
		window.addEventListener( 'keydown', e => {
			// console.log( e );
			const chosenOptionNumber = parseInt( e.key ) - 1;
			// 选择选项
			// console.log( 'chosenOptionNumber' + chosenOptionNumber );
			// console.log( 'optionLength' + optionList.length );
			if ( chosenOptionNumber >= 0 && chosenOptionNumber < optionList.length ) {
				console.info( 'Enter Option Chosen' );
				( <any> optionList[ chosenOptionNumber ] )?.click();
				return;
			}
			
			/* 跳转题目 */
			const submitAnswer = document.querySelectorAll( '.topic [style="clear: both;"]' );
			if ( submitAnswer.length === 2 && !SubmitAnswerStatusChange.isSubmit && [ 'Enter' ].indexOf( e.key ) !== -1 ) {
				// 提交多选答案
				SubmitAnswerStatusChange.submit();
				( <any> submitAnswer[ 0 ].querySelector( 'button' ) ).click();
				return;
			}
			
			SubmitAnswerStatusChange.fresh();
			// 切换上一题
			if ( [ 'ArrowLeft' ].indexOf( e.key ) !== -1 || [ 'NumpadSubtract' ].indexOf( e.code ) !== -1 ) {
				( <HTMLElement> document.querySelector( '.next-preve > button:nth-of-type(1)' ) ).click();
				
				// 切换下一题
			} else if ( [ 'Enter', '+', 'ArrowRight' ].indexOf( e.key ) !== -1 ) {
				const rightBtn = <HTMLButtonElement> document.querySelector( '.next-preve > button:nth-of-type(2)' );
				
				/* 模拟考试界面最后一题交卷
				* 判断1: `下一题`按钮被禁用时，说明最后一题
				* 判断2: 处于模拟考试界面时，进行提交
				* */
				if ( rightBtn.disabled && urlJudge( 'https://www.zaixiankaoshi.com/mnks/simulation/' ) ) {
					let submitBtn = <HTMLButtonElement> document.querySelector( '.submit-btn' );
					submitBtn.click();
					return;
				}
				
				// 切换下一题
				rightBtn.click();
			}
		} );
	} catch ( e ) {
		console.error( e );
		
		/* 绑定失败时，添加提示框重新刷新页面 */
		const isReloadPage = confirm( `
KeyBoard binding got an error, should fresh this page to reload?
按键绑定失败。是否需要重新刷新页面重新载入脚本？
		` )
		if ( isReloadPage ) {
			location.reload();
		}
	}
}


/** 入口 */
const fnList = [
	// bindPageReloadEvent,    // 当页面通过hash更新路由时，强制页面刷新
	removeExtraElement,     // 通过CSS优化界面UI，移除多余元素
	unlockRandomOption,     // 模拟考试选题界面解锁随机选项
	isAnswerUI,             // 判断是否为答题界面
	useRandomOption,        // 模拟考试界面进行随机选项设置
	setLargeFont,           // 模拟考试界面默认设置最大字体
	initOption,             // 更换题目时重新初始化提交状态
	getOptionContainer,     // 监听选项容器更改，重新绑定选项容器
	bindKeyboardEvent       // 绑定键盘事件
];
functionChainCall.setList( fnList );
window.onload = () => {
	setTimeout( () => {
		functionChainCall.call();
	}, 1000 )
};
