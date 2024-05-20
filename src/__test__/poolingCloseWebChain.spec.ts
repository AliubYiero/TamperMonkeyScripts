/**
 * poolingCloseWebChain.spec.ts
 *
 * created by 2024/5/20
 * @file 测试轮询功能
 * @author  Yiero
 * */

import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest';
import {
	LimitTime,
	LimitWay,
} from '../modules/findAimWeb/findAimWeb.ts';
import {
	parseTime,
} from '../modules/findAimWeb/parseLimitTimeString.ts';
import { isLimitTime } from '../modules/isLimitTime/isLimitTime.ts';
import { closeWeb } from '../modules/closeWeb/closeWeb.ts';
import { chain } from 'radash';
import { polling } from '../utils/polling.ts';

describe( '', () => {
	beforeEach( () => {
		// 告诉 vitest 使用模拟时间
		vi.useFakeTimers();
	} );
	
	afterEach( () => {
		// 每次测试运行后恢复日期
		vi.restoreAllMocks();
	} );
	
	it( '监听 polling 函数调用后是否会立即执行一次', () => {
		const spy = vi.spyOn( window, 'close' );
		
		// 模拟时间为 2024/5/17 18:29:00
		const beginDate = new Date( 2024, 4, 17, 18, 29 );
		vi.setSystemTime( beginDate );
		
		// 设置限制访问时间为 [18:28:30, 20:20:39]
		const limitTime: LimitTime = {
			url: /^https?:\/\/www\.bilibili\.com\/$/,
			startTime: Date.parse( parseTime( '18:28:30' ) ),
			endTime: Date.parse( parseTime( '20:20:39' ) ),
			limitWay: LimitWay.limit,
		};
		
		// 设置轮询函数
		const closeChain = polling( chain(
			isLimitTime,
			closeWeb,
		), 60_000 );
		closeChain( limitTime );
		
		expect( spy ).toHaveBeenCalledTimes( 1 );
	} );
	
	it( '监听是否能够轮询关闭网页', () => {
		let counter = 1;
		const spy = vi.spyOn( window, 'close' ).mockImplementation( () => {
			console.log( counter++ );
		} );
		
		// 模拟时间为 2024/5/17 18:28:00
		const beginDate = new Date( 2024, 4, 17, 18, 28 );
		vi.setSystemTime( beginDate );
		
		// 设置限制访问时间为 [18:28:30, 20:20:39]
		const limitTime: LimitTime = {
			url: /^https?:\/\/www\.bilibili\.com\/$/,
			startTime: Date.parse( parseTime( '18:28:30' ) ),
			endTime: Date.parse( parseTime( '20:20:39' ) ),
			limitWay: LimitWay.limit,
		};
		
		// 设置轮询函数
		const closeChain = polling( chain(
			isLimitTime,
			closeWeb,
		), 60_000 );
		closeChain( limitTime );
		
		/* 监听 window.close() 的运行 */
		// 第一次监听, 不在限制时间内, 不应该执行 `window.close()`
		expect( spy ).not.toBeCalled();
		
		// 时间加速 60s , 目前是 18:29:00
		vi.advanceTimersByTime( 60_000 );
		// 第二次监听, 此时第一次轮询已经过去. 在限制时间内, 应该执行过1次 `window.close()`
		expect( spy ).toHaveBeenCalledTimes( 1 );
		
		// 时间加速 60s , 目前是 18:30:00
		vi.advanceTimersByTime( 60_000 );
		// 第三次监听, 此时第二次轮询已经过去. 在限制时间内, 应该执行过2次 `window.close()`
		expect( spy ).toHaveBeenCalledTimes( 2 );
		
		// 时间加速 20s , 目前是 18:30:20
		vi.advanceTimersByTime( 20_000 );
		// 第四次监听, 此时第二次轮询已经过去, 第三次监听还没到来.
		// 在限制时间内, 应该执行和上一次监听一样执行了2次 `window.close()`
		expect( spy ).toHaveBeenCalledTimes( 2 );
	} );
} );
