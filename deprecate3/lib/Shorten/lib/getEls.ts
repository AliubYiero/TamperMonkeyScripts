/**
 * getEls.ts
 * created by 2023/8/27
 * @file
 * @author  Yiero
 * */

export {
	getEls
}

/* 获取元素集合 */
const getEls: ( selector: string ) => NodeList | null = document.querySelectorAll.bind( document );
