import { getWaitTimePerMs } from '../utils/getWaitTimePerMs.ts'
import { print } from '../utils/print.ts'
import { AlertYou } from './alertYou.ts'

/**
 * 定期不断提醒用户, 并阻塞页面
 */
export const alertAlways = () => {
	const waitTimePerMs = getWaitTimePerMs();
	print.log( '继续等待 ', waitTimePerMs, ' ms将会进行一次提示.' );
	const timer = setTimeout( () => {
		// 获取当前时间
		const currentTime = new Date();
		
		// 提示提示信息
		AlertYou( {
			text: `现在时间[ ${ currentTime.getHours() }:${ currentTime.getMinutes() }:${ currentTime.getSeconds() }]`,
		} );
		
		// 递归调用
		clearTimeout( timer );
		alertAlways();
		
	}, waitTimePerMs );
};
