/**
 * AddStyle.ts
 * created by 2023/7/25
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { addStyle } from '../../../../../lib/GM_Lib'


export {
	addReadStyle
}

/**
 * 返回通用样式
 * @param {'left' | 'right'} direction
 * @return {string}
 */
const commonReadStyle = ( direction: 'left' | 'right' ) => {
	return `
    font-size: 13px,
    padding: 3px 8px,
    color: #fff,
    font-weight: 700,
    border-radius: 4px,
   ,
    position: absolute,
    z-index: 1,
    top: 5px,
    ${ direction }: 5px;
    `;
}

/**
 * 添加[已看/未看]样式
 * */
function addReadStyle() {
	addStyle( `
    .is-read-left, .is-read-right {
        transition: opacity .25s ease-in-out;
        opacity: 0.3;
    }
    .is-read-left:hover, .is-read-right:hover {
        opacity: 1;
    }
    .is-not-read-left::before {
        content: '未看';
        background-color: rgba(3,169,244,.77);
        ${ commonReadStyle( "left" ) }
    }

	    .is-read-left::before {
	        content: '已看';
	        background-color: hsla(0,0%,60%,.77);
	        ${ commonReadStyle( 'left' ) }
	    }

    .is-not-read-right::before {
        content: '未看';
        background-color: rgba(3,169,244,.77);
        ${ commonReadStyle( "right" ) }
    }

    .is-read-right::before {
        content: '已看';
        background-color: hsla(0,0%,60%,.77);
        ${ commonReadStyle( 'right' ) }
    }
` );
}
