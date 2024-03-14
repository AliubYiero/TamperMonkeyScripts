/**
 * AutoScroll.ts
 * created by 2023/8/19
 * @file
 * @author  Yiero
 * */
import { AutoScroll } from '../interfaces/AutoScroll'

export {
	GlobalAutoScroll
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

// @ts-ignore 忽略未使用的类
class GlobalAutoScroll implements AutoScroll {
	/** 计时器 */
	private timer: number | undefined;
	private readonly options: {
		movementDistancePerFrame: number;
		movementDistancePerSecond: number;
		framePerSecond: number;
		frameDuration: number;
		delayPerMs: number
	};
	
	/**
	 * @constructor
	 * @param { number } movementDistancePerSecond 每秒移动的距离
	 * @param { number = } [delayPerMs = 0] 延时触发滚动的时间(ms), 0为不进行延时触发滚动
	 * @param { number } [framePerSecond = 60]
	 * */
	constructor( movementDistancePerSecond: number, delayPerMs: number | 'auto' = 'auto', framePerSecond: number = 60 ) {
		// @ts-ignore
		this.options = {};
		
		let _movementDistancePerSecond: number = 0;
		let _delayPerMs: number = 0;
		let _framePerSecond: number = 60;
		
		/** 每秒移动的距离 */
		Object.defineProperty( this.options, 'movementDistancePerSecond', {
			get(): number {
				return _movementDistancePerSecond;
			},
			set( value: number ) {
				_movementDistancePerSecond = value;
			}
		} );
		
		/** 每秒滚动的帧数 */
		Object.defineProperty( this.options, 'framePerSecond', {
			get() {
				return _framePerSecond;
			},
			set( value: number ) {
				_framePerSecond = value;
			}
		} );
		
		/** 每一帧的持续时间 */
		Object.defineProperty( this.options, 'frameDuration', {
			get() {
				return MathCeilFloat( 1000 / this.options.framePerSecond );
			}
		} );
		
		/** 每帧移动的距离, movementDistancePerSecond 和 framePerSecond 的计算数值 */
		Object.defineProperty( this.options, 'movementDistancePerFrame', {
			get(): number {
				return MathCeilFloat( this.options.movementDistancePerSecond / this.options.framePerSecond, 3 );
			}
		} );
		
		/**  延时开启滚动的时间 */
		Object.defineProperty( this.options, 'delayPerMs', {
			get(): number {
				return _delayPerMs;
			},
			set( value: number | 'auto' ) {
				if ( value === 'auto' ) {
					// 自动计算滚动一页需要的时间, 等待该时间
					_delayPerMs = window.innerHeight / this.options.movementDistancePerSecond * 1000;
				}
				else {
					_delayPerMs = value;
				}
			}
		} );
		
		this.options.movementDistancePerFrame = movementDistancePerSecond;
		// 强制类型推断为number, 因为ts不识别Object setter中的参数类型
		this.options.delayPerMs = <number> delayPerMs;
		this.options.framePerSecond = framePerSecond;
	}
	
	
	/**
	 * 开启滚动
	 * */
	open(): void {
		/** 延时this.delayPerMs的时间再触发滚动 */
		this.timer = window.setInterval( () => {
			setTimeout( this.scroll, this.options.delayPerMs );
		}, this.options.framePerSecond );
	}
	
	/**
	 * 关闭滚动
	 * */
	close(): void {
		clearInterval( this.timer );
		this.timer = void 0;
	}
	
	/** 滚动函数 */
	private scroll() {
		scrollBy( 0, this.options.movementDistancePerFrame );
	}
}
