/**
 * isLimitTime.spec.ts
 *
 * created by 2024/5/17
 * @file 测试 isLimitTime
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
import { isLimitTime } from '../modules/isLimitTime/isLimitTime.ts';
import {
	parseTime,
} from '../modules/findAimWeb/parseLimitTimeString.ts';
import {
	LimitTime,
	LimitWay,
} from '../modules/findAimWeb/findAimWeb.ts';

describe( '测试 isLimitTime 模块', () => {
	beforeEach( () => {
		// 告诉 vitest 使用模拟时间
		vi.useFakeTimers();
	} );
	
	afterEach( () => {
		// 每次测试运行后恢复日期
		vi.useRealTimers();
	} );
	
	it( 'get undefined', () => {
		expect( isLimitTime( undefined ) ).toBe( false );
	} );
	
	it( 'test `open` limit way inside limit time', () => {
		const date = new Date( 2024, 4, 17, 18, 29 );
		vi.setSystemTime( date );
		const limitTime: LimitTime = {
			url: /^https?:\/\/www\.bilibili\.com\/$/,
			startTime: Date.parse( parseTime( '18:28:49' ) ),
			endTime: Date.parse( parseTime( '20:20:39' ) ),
			limitWay: LimitWay.open,
		};
		expect( isLimitTime( limitTime ) ).toBe( false );
	} );
	
	it( 'test `open` limit way outside limit time', () => {
		const date = new Date( 2024, 4, 17, 18, 28 );
		vi.setSystemTime( date );
		const limitTime: LimitTime = {
			url: /^https?:\/\/www\.bilibili\.com\/$/,
			startTime: Date.parse( parseTime( '18:28:49' ) ),
			endTime: Date.parse( parseTime( '20:20:39' ) ),
			limitWay: LimitWay.open,
		};
		expect( isLimitTime( limitTime ) ).toBe( true );
	} );
	
	
	it( 'test `limit` limit way inside limit time', () => {
		const date = new Date( 2024, 4, 17, 18, 29 );
		vi.setSystemTime( date );
		const limitTime: LimitTime = {
			url: /^https?:\/\/www\.bilibili\.com\/$/,
			startTime: Date.parse( parseTime( '18:28:49' ) ),
			endTime: Date.parse( parseTime( '20:20:39' ) ),
			limitWay: LimitWay.limit,
		};
		expect( isLimitTime( limitTime ) ).toBe( true );
	} );
	
	it( 'test `limit` limit way outside limit time', () => {
		const date = new Date( 2024, 4, 17, 18, 28 );
		vi.setSystemTime( date );
		const limitTime: LimitTime = {
			url: /^https?:\/\/www\.bilibili\.com\/$/,
			startTime: Date.parse( parseTime( '18:28:49' ) ),
			endTime: Date.parse( parseTime( '20:20:39' ) ),
			limitWay: LimitWay.limit,
		};
		expect( isLimitTime( limitTime ) ).toBe( false );
	} );
	
} );
