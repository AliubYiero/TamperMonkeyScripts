/**
 * LoginInfo.ts
 * created by 2023/8/29
 * @file
 * @author  Yiero
 * */

export type {
	LoginInfo
}

interface LoginInfo {
	selector: {
		username: string,
		password: string,
		login: string,
	},
	userinfo: {
		username?: string,
		password?: string,
	}
}
