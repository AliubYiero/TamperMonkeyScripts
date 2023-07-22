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
		console.log( this.data )
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
	add() {
		// 弹出输入界面
		// @ts-ignore
		layer.prompt( { title: '输入要屏蔽Up主名' }, ( res: string, index: number ) => {
			// @ts-ignore
			layer.close( index );
			
			if ( !res.trim() ) {
				return;
			}
			
			const newData = this.data.set( { id: res } );
			this.treeTable.addNodes( 'table-bili-band-config', {
				index: 0,
				data: newData,
			} );
			this.treeTable.reloadData( 'table-bili-band-config' );
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
			className: [ 'bili-band-config-container', 'layui-anim' ],
			style: 'display:none; position: fixed; top: 0; left: 50%; transform: translateX(-50%);background: #ffffff; z-index: 10003;width: 710px',
			innerHTML: `<table class="layui-anim-fadeout" id="ID-table-bili-band-config" lay-filter="show"></table>`
		} )
		
		addElementToDocument( container, ``, document.body );
	}
	
	/**
	 * 创建UI内容，创建UI事件
	 * */
	createElementEvent() {
		// @ts-ignore
		layui.use( 'table', () => {
			// @ts-ignore
			const { treeTable, form } = layui;
			
			console.log( this.data, this.data.originData );
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
			</div>`,
				width: 710,
				defaultToolbar: ''
			} )
			
			// 删除当前行
			treeTable.on( 'tool(show)', ( e: { [ propName: string ]: any } ) => {
				const { index } = e;
				console.log( '删除当前行', index, e.data );
				this.uiEvent.delete( e );
			} )
			
			// 更新Up主名称
			treeTable.on( 'edit(show)', ( e: { [ propName: string ]: any } ) => {
				console.log( e );
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
			
			// 底部分页栏事件
			treeTable.on( 'pagebar(show)', ( e: { [ propName: string ]: any } ) => {
				const { event } = e;
				
				if ( [ 'add', 'close' ].indexOf( event ) === -1 ) {
					return;
				}
				
				if ( event === 'add' ) {
					this.uiEvent.add();
					return;
				}
				
				if ( event === 'close' ) {
					this.uiEvent.hide();
				}
			} );
			
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
