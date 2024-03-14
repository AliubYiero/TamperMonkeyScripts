/**
 * config.ts
 * created by 2023/9/18
 * @file 配置文件
 * @author  Yiero
 * */
import { getBootcdnLibrary } from '../src/requestBootcdn.ts'
import { getJsDelivrLibrary } from '../src/requestJsDelivr.ts'

export const urlList: Map<string, HTMLElement> = new Map();

export const currentCdnLibMap = {
	bootcdn: getBootcdnLibrary,
	jsdilivr: getJsDelivrLibrary
} 
