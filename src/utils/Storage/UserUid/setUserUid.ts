/**
 * setUserUid.ts
 * created by 2024/3/11
 * @file 设置用户Uid到本地存储中
 * @author  Yiero
 * */

import { userUidConfig } from './config/userUidConfig.ts';
import {
	GMStorageExtra,
} from '../../../lib/Storage/GMStorageExtra.ts';

/**
 * 设置本地存储中的用户UID。
 *
 * @param {string} uid - 要存储的用户UID。
 */
export const setUserUid = ( uid: string ) => {
	GMStorageExtra.setItem( userUidConfig.key, uid );
};
