/**
 * findAimWeb.spec.ts
 *
 * created by 2024/5/17
 * @file 测试 findAimWeb
 * @author  Yiero
 * */

import { describe, expect, it, vi } from 'vitest';
import {
	parseLimitTimeString,
} from '../modules/findAimWeb/parseLimitTimeString.ts';
import {
	findAimWeb,
	LimitTime,
	LimitWay,
} from '../modules/findAimWeb/findAimWeb.ts';


describe( '测试 findAimWeb 函数是否能够正确 find', () => {
	it( 'correct parse limitTimeString', () => {
		const limitTimeList = parseLimitTimeString( `www.bilibili.com/, 22, 24, open\n/https:\\/\\/blog\\.csdn\\.net\\/.*/, 0, 24, limit` );
		expect( limitTimeList[ 0 ] ).toEqual( {
			url: /^https?:\/\/www\.bilibili\.com\/$/,
			startTime: 50400000,
			endTime: 57600000,
			limitWay: LimitWay.open,
		} );
		expect( limitTimeList[ 1 ] ).toEqual( {
			url: /https:\/\/blog\.csdn\.net\/.*/,
			startTime: -28800000,
			endTime: 57600000,
			limitWay: LimitWay.limit,
		} );
	} );
	
	it( 'correct match url', () => {
		const limitList: LimitTime[] = [
			{
				url: /^https?:\/\/www\.bilibili\.com\/$/,
				startTime: 50400000,
				endTime: 57600000,
				limitWay: 1,
			}, {
				url: /https:\/\/((blog)|(www))\.csdn\.net\/.*/,
				startTime: -28800000,
				endTime: 57600000,
				limitWay: 0,
			},
		];
		
		expect( Boolean( limitList.find( l => ( 'https://www.bilibili.com/' ).match( l.url ) ) ) ).toBe( true );
		expect( !!limitList.find( l => ( 'https://www.bilibili.com' ).match( l.url ) ) ).toBe( false );
		expect( !!limitList.find( l => ( 'https://www.csdn.net/' ).match( l.url ) ) ).toBe( true );
		expect( !!limitList.find( l => ( 'https://blog.csdn.net/sunbaigui/article/details/138916754' ).match( l.url ) ) ).toBe( true );
	} );
	
	it( 'test findAimWeb function', () => {
		vi.stubGlobal( 'GM_getValue', () => {
			return `www.bilibili.com/, 22, 24, open\n/https:\\/\\/((blog)|(www))\\.csdn\\.net\\/.*/, 0, 24, limit`;
		} );
		
		expect( Boolean( findAimWeb( 'https://www.bilibili.com/' ) ) ).toBe( true );
		expect( Boolean( findAimWeb( 'https://www.bilibili.com' ) ) ).toBe( false );
		expect( Boolean( findAimWeb( 'https://www.csdn.net/' ) ) ).toBe( true );
		expect( Boolean( findAimWeb( 'https://blog.csdn.net/sunbaigui/article/details/138916754' ) ) ).toBe( true );
	} );
	
} );
