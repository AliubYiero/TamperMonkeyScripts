/**
 * ClearTimestamp.js
 * created by 2023/8/8
 * @file 清空timestamp.json缓存文件
 * @author  Yiero
 * */

import { resolve } from 'path'
import { writeJson } from '../../Fs/index.js'
import { Print } from '../../Console/lib/Print.js'

/* 获取timestamp.json文件地址 */
const prevTimestampFilePath = resolve( 'Config', 'timestamp.json' );

// 写入空白json覆盖时间戳
writeJson( prevTimestampFilePath, {} );

console.log( Print.cyan( '[Info]: 已清空 [timestamp.json] 中所有的时间戳.' ) );
