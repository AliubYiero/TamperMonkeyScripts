/**
 * 1. 输入数据
 * 2. 将数据中的 name 字段 和 onClick 方法 变成一个类
 * */

const data = [
	{
		name: 'First-One',
		onClick() {
			console.log( this.name );
		},
		children: [
			{
				name: 'First-One-First',
				onClick() {
					console.log( this.name );
				}
			}
		]
	},
	{
		name: 'First-Two',
		onClick() {
			console.log( this.name );
		},
	}
]

class GMMenu {
	name: string;
	onClick: Function;
	
	constructor( name: string, onClick: Function ) {
		this.name = name;
		this.onClick = onClick;
	}
}


// 递归遍历 data 数据
function tree( children: any[], parse?: Function ) {
	children && children.length && children.map( item => {
		item = ( parse && parse( item ) ) || item;
		item.children = tree( item.children, parse );
		return item;
	} );
	return children;
}

const a = tree( data, ( item: any ) => {
	return new GMMenu( item.name, item.onClick );
} );
console.log( a );
