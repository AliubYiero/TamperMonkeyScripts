/**
 * GMMenuConfigInterface.ts
 * created by 2024/3/7
 * @file GMMenuConfigInterface 接口
 * @author  Yiero
 * */

export interface GMMenuConfigInterface {
	/**
	 * 配置项名称
	 */
	title: string;
	/**
	 * 配置项点击后的回调函数
	 */
	onClick: ( event: ( MouseEvent | KeyboardEvent ) ) => void;
	/**
	 * 是否展示当前的配置项
	 * @default true
	 */
	isShow?: boolean;
	/**
	 * 快捷键
	 * @default ''
	 */
	accessKey?: string;
}
