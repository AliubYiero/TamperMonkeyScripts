/**
 * LoginInfo.ts
 * created by 2023/8/29
 * @file
 * @author  Yiero
 * */

import { LoginInfo } from '../interfaces/LoginInfo'

export {
	CreateLoginInfo
}

// 新建LoginInfo
class CreateLoginInfo implements LoginInfo {
	selector: {
		username: string,
		password: string,
		login: string,
	} = { username: '', password: '', login: '' }
	
	userinfo: {
		username?: string,
		password?: string,
	} = {}
	
	constructor( usernameSelector: string,
	             passwordSelector: string,
	             loginBtnSelector: string,
	             username?: string,
	             password?: string,
	) {
		this.selector = {
			username: usernameSelector,
			password: passwordSelector,
			login: loginBtnSelector,
		};
		
		if ( username && password ) {
			this.userinfo = {
				username,
				password
			}
		}
	}
}
