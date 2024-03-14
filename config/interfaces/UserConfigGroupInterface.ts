import {
	UserConfigItemInterface,
} from './UserConfigItemInterface.ts';

/**
 * 用户配置组接口
 * */
export interface UserConfigGroupInterface {
	[ groupName: string ]: {
		[ configKey: string ]: UserConfigItemInterface
	};
}
