/**
 * closeWeb.spec.ts
 *
 * created by 2024/5/17
 * @file 测试 closeWeb 模块
 * @author  Yiero
 * */
import { describe, expect, it, vi } from 'vitest';
import { closeWeb } from '../modules/closeWeb/closeWeb.ts';

describe( '测试 closeWeb 模块', () => {
	it( '关闭网页', () => {
		const spy = vi.spyOn( window, 'close' );
		closeWeb( true );
		expect( spy ).toBeCalled();
	} );
	
	it( '不关闭网页', () => {
		const spy = vi.spyOn( window, 'close' );
		closeWeb( false );
		expect( spy ).not.toBeCalled();
	} );
} );
