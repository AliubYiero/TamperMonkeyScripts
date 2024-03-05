/**
 * console.ts
 * created by 2024/3/6
 * @file 控制台日志输出 (颜色)
 * @author  Yiero
 * */

export const warn = console.warn.bind( console, '\x1b[33m%s\x1b[0m' );
export const info = console.warn.bind( console, '\x1b[36m%s\x1b[0m' );
