/**
 * 滚动控制类
 * */
export class Scroll {
	/**
	 * 当前滚动状态
	 * */
	static isScroll: boolean = false;
	
	/**
	 * 开启滚动
	 * */
	static open() {
		// 如果当前已经是滚动状态, 则不进行操作
		if ( this.isScroll ) {
			return;
		}
		// 设置滚动状态为开启状态
		this.isScroll = true;
		
		// 进行滚动
		this.scroll();
		
		// @todo 提示开启滚动
		console.log( '开启滚动, 当前的滚动速度是: ', 1 );
	}
	
	/**
	 * 关闭滚动
	 * */
	static close() {
		// 设置滚动状态为关闭状态
		this.isScroll = false;
		
		// @todo 提示关闭滚动
		console.log( '关闭滚动' );
	}
	
	/**
	 * 切换滚动
	 * */
	static toggle() {
		// 如果当前已经是滚动状态, 则关闭滚动
		// 否则开启滚动
		this.isScroll
			? this.close()
			: this.open();
	}
	
	/**
	 * 滚动
	 * */
	private static scroll() {
		// 动画上一帧的时间
		// let latestTime: number;
		
		const step = () => {
			// // 初始化上一帧的时间
			// if ( !latestTime ) {
			// 	latestTime = e;
			// }
			//
			// // 获取当前帧的时间
			// const currentTime = e;
			//
			// // 计算帧步长
			// const deltaTime = currentTime - latestTime;
			//
			// // 计算每一帧的滚动距离
			// const scrollDistance = deltaTime;
			//
			// // 更新上一帧的时间
			// latestTime = currentTime;
			
			// 进行滚动
			window.scrollBy( 0, 1 );
			console.log( 'scrollDistance', 1 );
			
			// 继续帧循环
			this.isScroll && requestAnimationFrame( step );
		};
		
		// 进行滚动
		requestAnimationFrame( step );
	}
}
