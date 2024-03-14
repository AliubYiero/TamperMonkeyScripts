import { giveScore } from './src/api_giveScore';
import { getRandomMath } from './src/Score'
import { freshListenerHash } from '../../../lib/Listener/Page/FreshListener'
import { goNextExam } from './src/Submit'
import { Sleep } from '../../../lib/Base/Sleep'

( async () => {
	await Sleep.windowLoad( 5 );
	
	function setScore() {
		const score = getRandomMath( 90, 100 );
		console.info( '获取随机分数' + score );
		console.info( '正在输入分数' );
		giveScore( score ).then(
			res => {
				console.info( '输入分数成功' );
				console.info( res );
				goNextExam();
			}
		);
	}
	
	/* 发送两个分数请求，防止请求超时 */
	function sendScore() {
		setScore();
		setScore();
	}
	
	sendScore();
	freshListenerHash( () => {
		console.info( '页面更新' );
		sendScore();
	} );
	
} )();
