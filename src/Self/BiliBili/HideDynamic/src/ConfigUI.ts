/**
 * ConfigUI.ts
 * created by 2023/7/22
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { importLayui } from '../../../../../lib/Layui'
import { addElementToDocument, createElement } from '../../../../../lib/GM_Lib'
import { Sleep } from '../../../../../lib/Base/Sleep'

export type {
	BandData
}
export {
	ConfigUI
}


interface BandData {
	id: string
	isBandLive?: boolean
	isBandDynamic?: boolean
	isBandVideo?: boolean
}

// UI数据类
class Data {
	/** @type {Map<string, {id: string, isBandLive: boolean, isBandDynamic: boolean, isBandVideo: boolean}>} */
	data: Map<string, BandData> | undefined = void 0;
	originData: BandData[] | undefined;
	
	/** @param {array} newData */
	constructor( newData?: BandData[] ) {
		if ( newData ) {
			this.setToLocalStorage( this.arrayToMap( newData ) );
		}
		
		this.getFromLocalStorage();
	}
	
	/** 防止多余数据提交到data中，进行重新赋值 */
	limitValue( obj: BandData ) {
		const { id, isBandLive, isBandDynamic, isBandVideo } = obj;
		return {
			id,
			isBandLive: isBandLive || false,
			isBandDynamic: isBandDynamic || false,
			isBandVideo: isBandVideo || false
		}
	}
	
	/** 添加一个对象 */
	set( newObj: BandData ) {
		// 如果当前数据存在，则返回空
		if ( ( <Map<string, BandData>> this.data ).has( newObj.id ) ) {
			return;
		}
		
		const limitData = this.limitValue( newObj );
		( <Map<string, BandData>> this.data ).set( newObj.id, limitData );
		this.setToLocalStorage();
		return limitData;
	}
	
	/** 更新其中一个对象 */
	update( newObj: BandData ) {
		const limitData = this.limitValue( newObj );
		( <Map<string, BandData>> this.data ).set( newObj.id, limitData );
		this.setToLocalStorage();
	}
	
	/** 删除其中一个对象 */
	delete( newObjOrId: BandData | string ) {
		if ( typeof newObjOrId === 'string' ) {
			( <Map<string, BandData>> this.data ).delete( newObjOrId );
		} else {
			( <Map<string, BandData>> this.data ).delete( newObjOrId.id );
		}
		this.setToLocalStorage();
	}
	
	/** 改变其中一个对象的键（删除原对象，建立新对象） */
	change( newObj: BandData, oldObjOrId: BandData | string ) {
		// 删除原对象
		this.delete( oldObjOrId );
		// 新增对象
		this.set( this.limitValue( newObj ) );
		this.setToLocalStorage();
	}
	
	/** 从localStorage中获取data */
	getFromLocalStorage() {
		this.originData = JSON.parse( localStorage.getItem( 'bandList' ) || '[]' );
		this.data = this.arrayToMap( <BandData[]> this.originData );
	}
	
	/** 将data设置到localStorage中 */
	setToLocalStorage( value: Map<string, BandData> = ( <Map<string, BandData>> this.data ) ) {
		localStorage.setItem( 'bandList', JSON.stringify( this.mapToArray( value ) ) );
	}
	
	/**
	 * 数组转Map
	 * @param {{id: string, [propName: string]: any}[]} array
	 * @return {Map}
	 * */
	arrayToMap( array: BandData[] ) {
		const map = new Map();
		array.forEach( value => {
			value.id = value.id.trim();
			map.set( value.id, value );
		} )
		return map;
	}
	
	/**
	 * Map转数组
	 * @param {Map} map
	 * @return {any[]}
	 * */
	mapToArray( map: Map<string, BandData> ) {
		const array: BandData[] = [];
		for ( let value of map.values() ) {
			array.push( value );
		}
		return array;
	}
}

// UI时间类
class UiEvent {
	data: Data
	treeTable: any
	domList: { main: HTMLElement | undefined }
	
	constructor( data: Data ) {
		this.data = data;
		
		// @ts-ignore
		this.treeTable = layui.treeTable;
		
		// 获取容器Dom
		this.domList = {
			main: void 0,
		}
		this.getMainDom();
	}
	
	/** 添加数据 */
	add( res?: string ) {
		const addData = ( res: string ) => {
			// 去除空白字符
			res = res.trim();
			// 判断是否存在有效输入
			if ( !res ) {
				return;
			}
			
			// 写入新数据
			const newData = this.data.set( { id: res } );
			
			// 当返回空数据时的处理
			// 通常是当前UP已存在
			if ( !newData ) {
				// TODO UP存在时，将该UP提前到前面
				return;
			}
			
			// 将新数据同步到配置菜单中
			this.treeTable.addNodes( 'table-bili-band-config', {
				index: 0,
				data: newData,
			} );
			this.treeTable.reloadData( 'table-bili-band-config' );
		}
		
		// 存在输入数据时，直接添加数据刷新页面，不弹出Prompt框
		if ( res ) {
			addData( res );
			return;
		}
		
		// 弹出输入界面
		// @ts-ignore
		layer.prompt( { title: '输入要屏蔽Up主名' }, ( res: string, index: number ) => {
			// @ts-ignore
			layer.close( index );
			addData( res );
		} );
	}
	
	/**
	 * 删除当前行数据
	 * @param {Object} e layui数据对象
	 * */
	delete( e: { [ propName: string ]: any } ) {
		this.data.delete( e.data );
		e.del();
		this.treeTable.reloadData( 'table-bili-band-config' );
	}
	
	/** 更新当前行的数据
	 * @param {Object} originData
	 * @param {'dynamic' | 'video' | 'live'} type
	 * @param {number} index
	 * */
	update( originData: BandData, type: 'dynamic' | 'video' | 'live', index: number ) {
		let newData = { ...originData };
		switch ( type ) {
			case 'dynamic':
				newData.isBandDynamic = !originData.isBandDynamic;
				break;
			case 'video':
				newData.isBandVideo = !originData.isBandVideo;
				break;
			case 'live':
				newData.isBandLive = !originData.isBandLive;
				break;
		}
		this.treeTable.updateNode( 'table-bili-band-config', index, newData );
		this.data.update( newData );
	}
	
	/** 改变Up主名称（因为需要改变键值，所以不能直接更新） */
	change( e: { [ propName: string ]: any } ) {
		this.data.change( e.data, e.oldValue );
		this.treeTable.reloadData( 'table-bili-band-config' );
	}
	
	/** 展示UI界面 */
	show() {
		if ( !this.domList.main ) {
			this.getMainDom();
		}
		const mainContainer = this.domList.main as HTMLElement;
		// 关闭隐藏
		if ( mainContainer.style.display === 'none' ) {
			mainContainer.style.display = 'block';
		}
		
		// 隐藏渐隐动画，添加渐入动画
		mainContainer.classList.remove( 'layui-anim-fadeout', 'hide' );
		mainContainer.classList.add( 'layui-anim-fadein' );
	}
	
	/** 隐藏UI界面 */
	hide() {
		if ( !this.domList.main ) {
			this.getMainDom();
		}
		
		const mainContainer = this.domList.main as HTMLElement;
		// 隐藏渐隐动画，添加渐入动画
		mainContainer.classList.remove( 'layui-anim-fadein' );
		mainContainer.classList.add( 'layui-anim-fadeout', 'hide' );
	}
	
	getMainDom() {
		this.domList.main = document.querySelector( '.bili-band-config-container' ) as HTMLElement;
	}
	
	submitSearch( input: HTMLInputElement ) {
		
		// 防止空元素访问
		const { value } = input;
		if ( !value.trim() ) {
			return false;
		}
		
		// 清空输入框
		input.value = '';
		
		// 更新数据，match到搜索框中的值时，unshift到数组最前面，否则push到数组后面
		const newData: BandData[] = [];
		let isMatchValue: boolean = false;
		this.data.mapToArray( <Map<string, BandData>> this.data.data ).forEach( bandData => {
			if ( bandData.id.match( value ) ) {
				isMatchValue = true;
				newData.unshift( bandData );
			} else {
				newData.push( bandData );
			}
		} );
		
		// 当没有搜索到数据的时候的返回
		if ( !isMatchValue ) {
			// @ts-ignore
			layer.confirm( `没有搜索到UP主 [${ value }] ，是否新建UP主 \n(2s后自动关闭窗口)`, {
				time: 2000,
				btn: [ '确认', '取消' ]
			}, ( index: number ) => {
				// @ts-ignore
				layer.close( index );
				// 确认新增屏蔽UP主
				this.add( value );
			} )
			return false;
		}
		
		// 更新数据到配置菜单
		this.treeTable.reloadData( 'table-bili-band-config', {
			data: newData,
			page: {
				// 将当前页面设置到第一页，避免看不到搜索结果
				curr: 1
			}
		} );
	}
}

// 配置UI界面类
class ConfigUI {
	// @ts-ignore
	data: Data
	// @ts-ignore
	uiEvent: UiEvent;
	
	constructor() {
		
		// 引入layui
		importLayui();
		
		Sleep.windowLoad().then(
			() => {
				// 初始化数据对象
				this.data = new Data();
				this.uiEvent = new UiEvent( this.data );
				
				// 创建容器框架
				this.createContainer();
				// 填充容器，绑定事件
				this.createElementEvent();
				
				// 向外暴露出show事件
				this.show = () => {
					this.uiEvent.show();
				}
				
				// 向外暴露出hide事件
				this.hide = () => {
					this.uiEvent.hide();
				}
			}
		)
		
	}
	
	/** 创建UI界面框架 */
	createContainer() {
		const container = createElement( {
			tagName: 'main',
			className: [ 'bili-band-config-container', 'layui-anim', 'hide' ],
			innerHTML: `<table class="layui-anim-fadeout" id="ID-table-bili-band-config" lay-filter="show"></table>`
		} )
		
		addElementToDocument( container, `.bili-band-config-container {position: fixed; top: 0; left:calc(50% - 355px);background: #ffffff; z-index: 10003; width: 710px;}`, document.body );
	}
	
	/**
	 * 创建UI内容，创建UI事件
	 * */
	createElementEvent() {
		// @ts-ignore
		layui.use( 'table', () => {
			// @ts-ignore
			const { treeTable, form } = layui;
			
			treeTable.render( {
				elem: '#ID-table-bili-band-config',
				id: 'table-bili-band-config',
				cols: [ [
					{
						field: 'index',
						title: '编号',
						type: 'numbers',
						width: 60,
					},
					{
						field: 'id',
						title: 'UP主',
						width: 200,
						sort: true,
						align: 'center',
						edit: true
					},
					{
						field: 'dynamic',
						title: '动态卡片',
						width: 110,
						sort: true,
						align: 'center',
						
						templet: ( d: BandData ) => `<input type="checkbox" lay-skin="switch" lay-filter="toggleDynamicStatus" ${ d.isBandDynamic ? 'checked' : '' }/>`
					},
					{
						field: 'video',
						title: '视频卡片',
						width: 110,
						sort: true,
						align: 'center',
						templet: ( d: BandData ) => `<input type="checkbox" lay-skin="switch" lay-filter="toggleVideoStatus" ${ d.isBandVideo ? 'checked' : '' }/>`
					},
					{
						field: 'live',
						title: '直播卡片',
						width: 110,
						sort: true,
						align: 'center',
						templet: ( d: BandData ) => `<input type="checkbox" lay-skin="switch" lay-filter="toggleLiveStatus" ${ d.isBandLive ? 'checked' : '' }/>`
					},
					{
						field: 'delete',
						title: '操作',
						width: 110,
						sort: false,
						align: 'center',
						fixed: 'right',
						templet: () => `<button type="button" class="layui-btn layui-btn-sm layui-btn-danger layui-btn-radius" lay-event="delete">Delete</button>`
					}
				] ],
				data: this.data.originData,
				size: 'lg',
				skin: 'line',
				page: {
					layout: [ 'prev', 'page', 'next', 'count', 'skip' ],
				},
				pagebar: `
					<div>
						<button type="button" class="layui-btn layui-btn-sm" lay-event="add">
							Add
						</button>
						<button type="button" class="layui-btn layui-btn-sm layui-btn-warm" lay-event="close">
							Close
						</button>
					</div>
				`,
				toolbar: `
					<div>
						<form class="form-search" style="display: flex;">
							<input type="text" class="layui-input" style="width: 200px;" placeholder="输入需要搜索的UP主"/>
							<button type="button" lay-submit lay-filter="table-search" class="layui-btn" style="margin-left: 20px;">Search</button>
							<button type="button" lay-submit lay-filter="table-clear" class="layui-btn" style="margin-left: 20px;">Clear</button>
						</form>
					</div>
				`,
				width: 710,
				defaultToolbar: ''
			} )
			
			// 删除当前行
			treeTable.on( 'tool(show)', ( e: { [ propName: string ]: any } ) => {
				this.uiEvent.delete( e );
			} )
			
			// 更新Up主名称
			treeTable.on( 'edit(show)', ( e: { [ propName: string ]: any } ) => {
				this.uiEvent.change( e );
			} )
			
			class Checkbox {
				private readonly input: HTMLInputElement
				private domList: { input: HTMLInputElement; tr: HTMLElement }
				
				constructor( input: HTMLInputElement ) {
					this.input = input;
					
					this.domList = {
						input: this.input,
						tr: this.getTrDom() as HTMLElement,
					};
				}
				
				getTrDom(): HTMLElement {
					return this.input?.parentElement?.parentElement?.parentElement as HTMLElement;
				}
				
				getTableDataIndex(): number {
					return parseInt( <string> this.domList.tr.dataset.index );
				}
				
				getTableData( index: number ) {
					index ||= this.getTableDataIndex();
					return treeTable.getNodeDataByIndex( 'table-bili-band-config', index );
				}
			}
			
			// 更新动态卡片的数据
			form.on( 'switch(toggleDynamicStatus)', ( e: { [ propName: string ]: any } ) => {
				const input = new Checkbox( e.elem );
				const index = input.getTableDataIndex()
				const data = input.getTableData( index );
				this.uiEvent.update( data, 'dynamic', index );
			} );
			
			// 更新视频卡片的数据
			form.on( 'switch(toggleVideoStatus)', ( e: { [ propName: string ]: any } ) => {
				const input = new Checkbox( e.elem );
				const index = input.getTableDataIndex()
				const data = input.getTableData( index );
				this.uiEvent.update( data, 'video', index );
			} );
			
			// 更新直播卡片的数据
			form.on( 'switch(toggleLiveStatus)', ( e: { [ propName: string ]: any } ) => {
				const input = new Checkbox( e.elem );
				const index = input.getTableDataIndex()
				const data = input.getTableData( index );
				this.uiEvent.update( data, 'live', index );
			} );
			
			// 底部分页栏事件(关闭UI、添加新屏蔽)
			treeTable.on( 'pagebar(show)', ( e: { [ propName: string ]: any } ) => {
				const { event } = e;
				
				if ( ![ 'add', 'close' ].includes( event ) ) {
					return;
				}
				
				// 添加新屏蔽事件
				if ( event === 'add' ) {
					this.uiEvent.add();
					return;
				}
				
				// 关闭UI事件
				if ( event === 'close' ) {
					this.uiEvent.hide();
				}
			} );
			
			// 顶部搜索栏提交事件
			form.on( 'submit(table-search)', ( res: { [ propName: string ]: any } ) => {
				const input = res.form.querySelector( 'input' ) as HTMLInputElement;
				
				this.uiEvent.submitSearch( input );
				
				// 阻止默认 form 跳转
				return false;
			} );
			
			// 顶部搜索栏清空搜索文本事件
			form.on( 'submit(table-clear)', ( res: { [ propName: string ]: any } ) => {
				// 清空Input输入
				res.form.querySelector( 'input' ).value = '';
				// 阻止默认 form 跳转
				return false;
			} );
			
			
			// input框Enter提交搜索
			const domList = {
				form: document.querySelector( '.form-search' ) as HTMLFormElement,
				input: document.querySelector( '.form-search > input' ) as HTMLInputElement
			}
			domList.form.addEventListener( 'submit', ( e ) => {
				e.preventDefault();
				this.uiEvent.submitSearch( domList.input );
			} )
		} )
	}
	
	// 向外暴露出show事件
	// 初始化声明show函数，具体内容会在构造函数定义
	show() {
	}
	
	// 向外暴露出hide事件
	// 初始化声明hide函数，具体内容会在构造函数定义
	hide() {
	}
	
	
}
