class MapJSON {
	private static replacer( key: string, value: unknown ) {
		if ( value instanceof Map ) {
			return {
				dataType: 'Map',
				value: Array.from( value.entries() ), // or with spread: value: [...value]
			};
		} else {
			return value;
		}
	}
	
	private static reviver( key: string, value: { dataType: string, value: Array<[ string, unknown ]> } ) {
		if ( typeof value === 'object' && value !== null ) {
			if ( value.dataType === 'Map' ) {
				return new Map( value.value );
			}
		}
		return value;
	}
	
	static stringify( values: Map<any, any> ) {
		return JSON.stringify( values, this.replacer );
	}
	
	static parse( value: string ) {
		return JSON.parse( value, this.reviver );
	}
}

/**
 * @class
 * */
class LocalStorage {
	// 实例属性`key`
	private readonly key: string;
	private readonly valueType: "String" | "Array" | "Object";
	
	constructor( key: string, valueType: 'String' | 'Array' | 'Object' = 'String' ) {
		this.key = key;
		this.valueType = valueType;
		
		if ( !this.get() ) {
			switch ( valueType ) {
				case 'String':
					this.set( '' );
					break;
				case 'Array':
					this.set( '[]' );
					break;
				case 'Object':
					this.set( '{}' );
					break;
			}
		}
	}
	
	set( value: string ) {
		localStorage.setItem( this.key, value );
	}
	
	get(): string | null {
		return localStorage.getItem( this.key );
	}
	
	private checkRepeat( values: Array<unknown> | Object ) {
		let map = new Map();
		
		// 写入Map对象去重
		for ( const key in values ) {
			map.set( values[ key as keyof Object ], key );
		}
		
		let newReturn;
		if ( Array.isArray( values ) ) {
			newReturn = [];
			for ( let value of map.keys() ) {
				newReturn.push( value )
			}
		} else {
			newReturn = {};
			for ( let key of map.keys() ) {
				newReturn[ key as keyof Object ] = map.get( key );
			}
		}
		return newReturn;
	}
	
	append( values: Object | String ): void {
		let localhostStorage = JSON.parse( <string> this.get() );
		if ( this.valueType === 'String' && typeof values === 'string' ) {
			this.set( values );
			return;
		}
		
		
		switch ( this.valueType ) {
			case 'String':
				localhostStorage = values;
				break;
			case 'Array':
				localhostStorage.push( values );
				break;
			case 'Object':
				for ( let key in ( <Object> values ) ) {
					localhostStorage[ key ] = values[ key as keyof Object ];
				}
				break;
		}
		localhostStorage = this.checkRepeat( localhostStorage );
		this.set( JSON.stringify( localhostStorage ) );
	}
	
	static set( key: string, value: string ): void {
		localStorage.setItem( key, value );
	}
	
	static get( key: string ): string | null {
		return localStorage.getItem( key );
	}
}

/**
 * 函数入口
 * */
window.addEventListener( 'load', (): void => {
	/**
	 * 绑定关闭容器事件
	 * */
	function bindCloseContainerEvent(): void {
		document.querySelector( '.close-icon' )?.addEventListener( 'click', () => {
			document.querySelector( '.dialog-container' )?.classList.add( 'enable-display' );
		} );
	}
	
	/**
	 * 绑定输入配置事件
	 * */
	function bindConfigSubmitEvent(): void {
		const storage = new LocalStorage( 'liveID', 'Array' );
		
		/**
		 * 获取input输入内容，并写入储存中
		 * */
		function submitContent(): void {
			// 获取input输入内容
			const inputBtn = document.querySelector( '.config-input' ) as HTMLInputElement;
			if ( inputBtn.value === '' ) {
				return;
			}
			// 写入储存
			storage.append( inputBtn.value );
			// 清空输入框
			inputBtn.value = '';
		}
		
		// 确定按钮提交
		document.querySelector( '.submit-config' )?.addEventListener( 'click', e => {
			// 阻止默认提交事件
			e.preventDefault();
			// 获取input输入内容
			submitContent();
		} );
		
		document.querySelector( '.input-area' )?.addEventListener( 'keydown', e => {
			// 阻止非Enter键输入
			if ( [ 'Enter' ].indexOf( ( <KeyboardEvent> e ).key ) === -1 ) {
				return;
			}
			
			// 获取input输入内容
			submitContent();
		} );
	}
	
	
	/**
	 * 获取配置缓存
	 * */
	function getConfig() {
		const configList = JSON.parse( <string> LocalStorage.get( 'liveID' ) );
		
		/**
		 * 创建p标签
		 * */
		function createPElement( content: string ): Node {
			const pNode = document.createElement( 'p' );
			pNode.className = 'config-item';
			pNode.innerText = content;
			return pNode;
		}
		
		/**
		 * 将配置信息写入详情
		 * */
		function writeConfigsToContainer() {
			const mainDetailContainer = document.querySelector( '.config-detail' );
			configList.forEach( ( liveID: string ) => {
				mainDetailContainer?.appendChild( createPElement( liveID ) );
			} );
		}
		
		writeConfigsToContainer();
	}
	
	
	const functionChain: Array<Function | [ Function, Array<any> ]> = [
		bindCloseContainerEvent,
		bindConfigSubmitEvent,
		getConfig,
	];
	while ( functionChain.length > 0 ) {
		if ( Array.isArray( functionChain ) ) {
			( <Function> functionChain[ 0 ] ).apply( null, <Array<any>> functionChain[ 1 ] );
		} else {
			( <Function> functionChain ).apply( null );
		}
		functionChain.shift();
	}
} );
