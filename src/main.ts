/**
 * main.ts
 * @file 项目入口文件
 * @author  Yiero
 * */

import { chain } from 'radash';
import { findAimWeb } from './modules/findAimWeb/findAimWeb.ts';
import { isLimitTime } from './modules/isLimitTime/isLimitTime.ts';
import { closeWeb } from './modules/closeWeb/closeWeb.ts';

const closeWebChain = chain(
	findAimWeb,
	isLimitTime,
	closeWeb,
);
/*
* Main Entry
* */
;( () => {
	closeWebChain( document.URL );
} )();
