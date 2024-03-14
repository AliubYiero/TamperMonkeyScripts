/**
 * GlobalAutoScroll.ts
 * created by 2023/8/19
 * @file
 * @author  Yiero
 * */
import { AutoScroll } from './interfaces/AutoScroll'
import { print, scrollStatusStorage } from '../../index'
import { elementWaiter } from '../../../../../lib/Listener/ElementAdd'

export {
	GlobalAutoScroll,
	isReachedPageBottom
}

/**
 * 小数位向上取整
 * @param { number } number
 * @param { number } [decimal = 0]
 * @return { number }
 * */
function MathCeilFloat( number: number, decimal = 0 ) {
	decimal = Math.pow( 10, decimal );
	return Math.ceil( number * decimal ) / decimal;
}

/**
 * 页面触底判断函数
 * @return { boolean }
 * */
function isReachedPageBottom() {
	const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
	return scrollTop + clientHeight >= scrollHeight;
}


interface ScrollOptions {
	
	movementDistancePerFrame: number;
	movementDistancePerSecond: number;
	framePerSecond: number;
	frameDuration: number;
	delayPerMs: number
}

class ScrollOptionsImpl implements ScrollOptions {
	/**  延时开启滚动的时间 */
	private _delayPerMs: number = 0;
	
	get delayPerMs(): number {
		return this._delayPerMs
	}
	
	set delayPerMs( value: number | string ) {
		if ( typeof value === 'string' ) {
			// 自动计算滚动一页需要的时间, 等待该时间
			const scrollPageDuration = window.innerHeight / this.movementDistancePerSecond * 1000;
			
			print.log( scrollPageDuration, this.movementDistancePerSecond );
			try {
				this._delayPerMs = eval( value.replace( 'auto', String( scrollPageDuration ) ) );
			} catch ( e ) {
				this._delayPerMs = scrollPageDuration;
			}
		}
		else {
			this._delayPerMs = value;
		}
	}
	
	/** 每帧移动的距离, movementDistancePerSecond 和 framePerSecond 的计算数值 */
	get movementDistancePerFrame(): number {
		return MathCeilFloat( this.movementDistancePerSecond / this.framePerSecond, 3 );
	}
	
	/** 每一帧的持续时间 */
	private _frameDuration: number = 0;
	
	get frameDuration(): number {
		return MathCeilFloat( 1000 / this._frameDuration );
	}
	
	/** 每秒滚动的帧数 */
	private _framePerSecond: number = 0;
	
	get framePerSecond(): number {
		return this._framePerSecond;
	}
	
	set framePerSecond( animationFramePerMs: number ) {
		this._framePerSecond = Math.ceil( 1000 / animationFramePerMs );
	}
	
	/** 每秒移动的距离 */
	private _movementDistancePerSecond: number = 0;
	
	get movementDistancePerSecond(): number {
		return this._movementDistancePerSecond;
	}
	
	set movementDistancePerSecond( value: number ) {
		this._movementDistancePerSecond = value;
	}
}

// @ts-ignore 忽略未使用的类
class GlobalAutoScroll implements AutoScroll {
	options: ScrollOptions = new ScrollOptionsImpl();
	/** 计时器 */
	private timer: number | undefined;
	
	/**
	 * @constructor
	 * @param { number } movementDistancePerSecond 每秒移动的距离
	 * @param { number | string = } [delayPerMs = 'auto'] 延时触发滚动的时间(ms), 0为不进行延时触发滚动, 特殊值 auto 表示滚动一页的时间, 支持四则运算
	 * @param { number } [framePerSecond = 60]
	 * */
	constructor( movementDistancePerSecond: number, delayPerMs: number | string = 'auto', framePerSecond: number = 17 ) {
		this.options.movementDistancePerSecond = movementDistancePerSecond;
		this.options.delayPerMs = <number> delayPerMs;
		this.options.framePerSecond = framePerSecond;
	}
	
	
	/**
	 * 开启滚动
	 * */
	async open(): Promise<void> {
		/* 如果处于滚动状态, 则先关闭滚动 */
		if ( this.timer ) {
			this.close();
		}
		
		/* 监听文章是否载入 */
		await elementWaiter( '.chapterTitle', void 0, 0, 0.1 );
		
		/* 滚动状态记录 - 滚动中 */
		scrollStatusStorage.set( 'scrolling' );
		
		/* 先延时, 在开启滚动 */
		print.info( '等待滚动: ', this.options.delayPerMs );
		this.timer = window.setTimeout( () => {
			
			/*  时间戳延时 */
			let prevTimestamp: number = 0;
			
			const scrollStep = ( timestamp: DOMHighResTimeStamp ) => {
				if ( prevTimestamp ) {
					this.options.framePerSecond = timestamp - prevTimestamp;
				}
				// 保存timestamp
				prevTimestamp = timestamp;
				
				this.scroll();
				
				/* 如果触底, 关闭滚动 */
				if ( isReachedPageBottom() ) {
					this.close();
					return;
				}
				
				console.log( this.options );
				
				this.timer = window.requestAnimationFrame( scrollStep );
			}
			
			this.timer = window.requestAnimationFrame( scrollStep );
		}, this.options.delayPerMs );
	}
	
	/**
	 * 关闭滚动
	 * */
	close(): void {
		/* 滚动状态更新 - 结束 */
		scrollStatusStorage.set( 'scroll-end' );
		
		/* 结束所有计时器 */
		if ( this.timer ) {
			window.clearTimeout( this.timer );
			window.cancelAnimationFrame( this.timer );
		}
		
		/* 清空计时器Id记录 */
		this.timer = void 0;
	}
	
	/** 滚动函数 */
	private scroll() {
		const movementDistancePerFrame = this.options.movementDistancePerFrame;
		scrollBy( 0, movementDistancePerFrame );
	}
}
