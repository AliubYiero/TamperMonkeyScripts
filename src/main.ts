/**
 * main.ts
 * created by 2024/3/5
 * @file 项目入口文件
 * @author  Yiero
 * */

import { CSSStyleController } from './utils';

// const a = `
// .b_algo .b_deep h3{font-size:20px;line-height:24px}.b_algo .b_deep h3{padding-bottom:3px;line-height:1.2em}.b_deep p{display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;-webkit-line-clamp:2;height:40px;line-height:20px}#tabcontrol_53_B02FF1 .tab-head { height: 40px; } #tabcontrol_53_B02FF1 .tab-menu { height: 40px; } #tabcontrol_53_B02FF1_menu { height: 40px; } #tabcontrol_53_B02FF1_menu>li { background-color: #ffffff; margin-right: 0px; height: 40px; line-height:40px; font-weight: 700; color: #767676; } #tabcontrol_53_B02FF1_menu>li:hover { color: #111; position:relative; } #tabcontrol_53_B02FF1_menu .tab-active { box-shadow: inset 0 -3px 0 0 #111; background-color: #ffffff; line-height: 40px; color: #111; } #tabcontrol_53_B02FF1_menu .tab-active:hover { color: #111; } #tabcontrol_53_B02FF1_navr, #tabcontrol_53_B02FF1_navl { height: 40px; width: 32px; background-color: #ffffff; } #tabcontrol_53_B02FF1_navr .sv_ch, #tabcontrol_53_B02FF1_navl .sv_ch { fill: #444; } #tabcontrol_53_B02FF1_navr:hover .sv_ch, #tabcontrol_53_B02FF1_navl:hover .sv_ch { fill: #111; } #tabcontrol_53_B02FF1_navr.tab-disable .sv_ch, #tabcontrol_53_B02FF1_navl.tab-disable .sv_ch { fill: #444; opacity:.2; }#slideexp1_B42088 .slide { width: 280px; margin-right: 8px; }#slideexp1_B42088c .b_slidebar .slide { border-radius: 6px; }#slideexp1_B42088 .slide:last-child { margin-right: 1px; }#slideexp1_B42088c { margin: -4px; } #slideexp1_B42088c .b_viewport { padding: 4px 1px 4px 1px; margin: 0 3px; } #slideexp1_B42088c .b_slidebar .slide { box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05); -webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05); } #slideexp1_B42088c .b_slidebar .slide.see_more { box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.00); -webkit-box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.00); } #slideexp1_B42088c .b_slidebar .slide.see_more .carousel_seemore { border: 0px; }#slideexp1_B42088c .b_slidebar .slide.see_more:hover { box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.00); -webkit-box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.00); }
// `;

const test = new CSSStyleController( `
#app {
background: #f5f5f5;
width: 100%;
height:100px;
}

#app1{
background: #f5aaf5;
height: 100px;
border: 1px solid #000;
}
` );

// console.log( test.cssRules );
// console.log( test.delete( '#app1' ) );
console.log( test.cssRules );

setTimeout( () => {
	test.push( `
		#app {
		background: #f5f5f5;
		width: 100%;
		height: 500px;
		color: red;
		}
		
		#app4{
		background: #f5aaf5;
		height: 100px;
		border: 1px solid #000;
		}
	` );
}, 2000 );
