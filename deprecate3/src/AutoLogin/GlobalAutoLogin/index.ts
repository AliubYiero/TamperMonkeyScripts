/* entry */
import { EntryBranch } from '../../../lib/Base/EntryBranch';
import { isMatchURL } from '../../../lib/Base/IsMatchURL'
import { inputEvent } from '../../../lib/Event'
import { elementWaiter } from '../../../lib/Listener/ElementAdd'
import { getEl } from '../../../lib/Shorten'
import { loginInfoConfig } from './config/loginInfo.config'
import { LoginInfo } from './src/interfaces/LoginInfo'

function autoLogin( config: LoginInfo ) {
	/* 获取输入框 */
	const usernameInput = getEl( config.selector.username ) as HTMLInputElement;
	const passwordInput = getEl( config.selector.password ) as HTMLInputElement;
	const loginBtn = getEl( config.selector.login ) as HTMLElement;
	
	/* 建立分支选择器 */
	const loginBranch = new EntryBranch();
	
	loginBranch
		// 如果账号和密码存在值, 那么自动点击登录按钮 (浏览器自动填写)
		.add(
			() => Boolean( usernameInput.value && passwordInput.value ),
			loginBtn.click,
		)
		
		// 如果不存在, 那么尝试填写账号和密码
		.add(
			() => Boolean( config.userinfo.username && config.userinfo.password ),
			() => {
				// 防止ts报错
				if ( !( config.userinfo.username && config.userinfo.password ) ) {
					return;
				}
				
				inputEvent( usernameInput, config.userinfo.username );
				inputEvent( passwordInput, config.userinfo.password );
				loginBtn.click();
			}
		)
		
		// 没有输入账号密码, 延时1s尝试再次点击按钮, 查看浏览器是否自动填入
		.add(
			() => true,
			() => {
				setTimeout( () => {
					loginBtn.click();
				}, 3000 );
			}
		)
		
		.run();
}

( async () => {
	const entryBranch = new EntryBranch();
	
	/* 遍历配置项, 获取所有输入 */
	for ( let loginInfoConfigKey in loginInfoConfig ) {
		const loginInfo = loginInfoConfig[ loginInfoConfigKey ];
		
		entryBranch.add(
			() => {
				if ( Array.isArray( loginInfo.matchUrl ) ) {
					return isMatchURL( ...loginInfo.matchUrl );
				}
				else {
					return isMatchURL( loginInfo.matchUrl );
				}
			},
			async () => {
				await elementWaiter( loginInfo.info.selector.login );
				
				autoLogin( loginInfo.info );
			}
		)
	}
	
	entryBranch.run();
} )();
