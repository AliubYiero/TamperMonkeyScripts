/**
 * setUserUid.ts
 * created by 2024/3/11
 * @file 设置用户Uid到本地存储中
 * @author  Yiero
 * */

import { userUidConfig } from './config/userUidConfig.ts';
import { GMStorage } from '../../../lib';

/**
 * 设置本地存储中的用户UID。
 *
 * @param {string} uid - 要存储的用户UID。
 */
export const setUserUid = ( uid: string ) => {
	GMStorage.setItem( userUidConfig.key, uid );
};
