/**
 * loginInfo.config.ts
 * created by 2023/8/29
 * @file
 * @author  Yiero
 * */

import { CreateLoginInfo } from '../src/implements/LoginInfo'
import { LoginInfo } from '../src/interfaces/LoginInfo'

export {
	loginInfoConfig
}

const loginInfoConfig: {
	[ propName: string ]: {
		matchUrl: string | RegExp | ( string | RegExp )[],
		info: LoginInfo,
	},
} = {
	jd: {
		matchUrl: [ '^https://passport.jd.com/new/login.aspx', '^https://passport.jd.com/uc/login' ],
		info: new CreateLoginInfo(
			'#loginname',
			'#nloginpwd',
			'#loginsubmit'
		),
	},
	taobao: {
		matchUrl: 'https://login.taobao.com/member/login.jhtml',
		info: new CreateLoginInfo(
			'#fm-login-id',
			'#fm-login-password',
			'.fm-submit.password-login',
		)
	},
	gdkmAic: {
		matchUrl: '^https://aic.gdkmxy.cn/xsgl/xs/login/login.aspx',
		info: new CreateLoginInfo(
			'#signupInputUserName',
			'#signupInputPassword',
			'#login_new',
			'22060201302',
			'9512635748.Sqy'
		),
	}
}
