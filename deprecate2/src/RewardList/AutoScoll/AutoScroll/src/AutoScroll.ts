import { config } from './Storage'

export { autoScroll }


class AutoScroll {
	timer?: NodeJS.Timer
	
	open() {
		this.timer = setInterval( () => {
			console.log( '滚动', config.scrollSpeed );
			scrollBy( {
				top: config.scrollSpeed,
				behavior: 'smooth'
			} )
		}, 16 );
	}
	
	close() {
		clearInterval( this.timer );
	}
}

const autoScroll = new AutoScroll();
