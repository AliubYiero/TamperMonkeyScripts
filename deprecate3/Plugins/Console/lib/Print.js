/**
 * Print.js
 * created by 2023/8/8
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	Print
}

/**
 * @class
 * @property {string} grey 输出灰色字符串
 * @property {string} red 输出红色字符串
 * @property {string} cyan 输出青色字符串
 * @property {string} green 输出绿色字符串
 * @property {string} yellow 输出黄色字符串
 * @property {string} blue 输出蓝色字符串
 * @property {string} black 输出黑色字符串
 * @property {string} white 输出白色字符串
 * */
class Print {
	/** @param {string} content */
	static grey( ...content ) {
		return `\x1B[2m${ this.#joinContent( ...content ) }\x1B[0m`
	}
	
	/** @param {string} content */
	static black( ...content ) {
		return `\x1B[30m${ this.#joinContent( ...content ) }\x1B[0m`
	}
	
	/** @param {string} content */
	static red( ...content ) {
		return `\x1B[31m${ this.#joinContent( ...content ) }\x1B[0m`
	}
	
	/** @param {string} content */
	static green( ...content ) {
		return `\x1B[32m${ this.#joinContent( ...content ) }\x1B[0m`
	}
	
	/** @param {string} content */
	static yellow( ...content ) {
		return `\x1B[33m${ this.#joinContent( ...content ) }\x1B[0m`
	}
	
	/** @param {string} content */
	static blue( ...content ) {
		return `\x1B[34m${ this.#joinContent( ...content ) }\x1B[0m`
	}
	
	/** @param {string} content */
	static cyan( ...content ) {
		return `\x1B[36m${ this.#joinContent( ...content ) }\x1B[0m`
	}
	
	/** @param {string} content */
	static white( ...content ) {
		return `\x1B[37m${ this.#joinContent( ...content ) }\x1B[0m`
	}
	
	// 链接字符串
	static #joinContent( ...content ) {
		return content.join( '' );
	}
}
