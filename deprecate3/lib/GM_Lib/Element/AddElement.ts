/**
 * AddElement.ts
 * created by 2023/7/14
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	createElement,
	addElementToDocument
}

/** 创建HTMLElement元素 */
const createElement = ( elementConfig: ElementAttribute ) => {
	const { tagName, className, id, innerHTML, innerText } = elementConfig;
	const element = document.createElement( tagName ) as HTMLElement;
	
	// 写入类名
	if ( className && typeof className === 'string' ) {
		element.classList.add( className );
		
	} else if ( className && Array.isArray( className ) ) {
		element.classList.add( ...className );
	}
	
	// 写入id
	if ( id ) {
		element.id = id;
	}
	
	// 写入子元素
	if ( innerHTML ) {
		element.innerHTML = innerHTML;
	}
	
	// 写入文本
	if ( innerText ) {
		element.innerText = innerText;
	}
	
	// 写入其他属性
	for ( let elementConfigKey in elementConfig ) {
		if ( [ 'tagName', 'className', 'id', 'innerHTML', 'innerText' ].indexOf( elementConfigKey ) !== -1 ) {
			continue;
		}
		
		element.setAttribute( elementConfigKey, elementConfig[ elementConfigKey ] );
	}
	
	return element;
}

const addElementToDocument = ( element: Element, cssString: string, fatherElement: HTMLElement = document.body ) => {
	
	// 添加元素到页面
	fatherElement.append( element );
	
	// 写入CSS到页面
	// @ts-ignore
	GM_addStyle( cssString );
}


interface ElementAttribute {
	// 标签名
	tagName: string
	
	// 类名
	className?: string | string[]
	
	// id名
	id?: string
	innerHTML?: string
	
	innerText?: string
	
	[ propName: string ]: any
}
