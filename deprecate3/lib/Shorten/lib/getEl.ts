/**
 * getEl.ts
 * created by 2023/8/27
 * @file
 * @author  Yiero
 * */

export {
	getEl
}

/* 获取元素  */
const getEl: ( selector: string ) => HTMLElement | null = document.querySelector.bind( document );
