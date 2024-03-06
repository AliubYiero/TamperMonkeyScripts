/**
 * main.ts
 * created by 2024/3/5
 * @file 项目入口文件
 * @author  Yiero
 * */

import { CSSStyleController } from './utils/addStyle/addStyle.ts';

const test = new CSSStyleController( `
#app {
background: #f5f5f5;
width: 100%;
height: 300px;
}
` );

test.replace( `
#app {
background: #000;
width: 100%;
height: 100px;
}
` );
