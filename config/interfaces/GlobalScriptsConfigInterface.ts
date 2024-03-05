/**
 * GlobalScriptsConfigs.ts
 * created by 2024/3/5
 * @file 脚本的全局配置文件
 * @author  Yiero
 * */

import { GrantFunctionInterface } from './GrantFunctionInterface';

/**
 * 配置接口
 * */
export interface GlobalScriptsConfigInterface {
	/**
	 * 脚本名称
	 * */
	name: string;
	
	/**
	 * 项目名
	 *
	 * @default 脚本名 (name 属性)
	 * */
	projectName?: string;
	
	/**
	 * 脚本命名空间
	 *
	 * 如果 namespace 是一个网址链接, 则该链接也会被当做作者主页
	 *
	 * @default https://www.tampermonkey.net
	 * */
	namespace: string;
	
	/**
	 * 脚本简介
	 * */
	description: string;
	
	/**
	 * 脚本作者
	 * */
	author: string;
	
	/**
	 * 许可证
	 *
	 * @default MIT
	 * */
	license: string;
	
	/**
	 * 脚本版本号
	 * */
	version: string;
	
	/**
	 * 脚本作用网站 (作用域)
	 * */
	match: string[];
	
	/**
	 * 脚本显示图标(链接)
	 *
	 * @default
	 * 第一个作用域 (match[0]) 的图标
	 * or https://www.tampermonkey.net/favicon.ico
	 * */
	icon?: string;
	
	/**
	 * 脚本授权函数
	 * */
	grant?: GrantFunctionInterface[];
	
	/**
	 * 脚本作用网站黑名单
	 * */
	exclude?: string[];
	
	/**
	 * 脚本运行时机
	 * */
	'run-at'?: 'document-start' | 'document-idle' | 'document-end' | 'document-body' | 'context-menu';
	
	/**
	 * 脚本授权跨域域名
	 * */
	connect?: string[];
	
	/**
	 * 64 * 64 的图标
	 * */
	icon64?: string;
	
	/**
	 * 作者主页
	 *
	 * 效果同 namespace 一样 (如果 namespace 是一个网址)
	 * */
	homepage?: string;
	
	/**
	 * 当前脚本的收益化标记,
	 * 如果脚本中存在 广告 / 行为追踪 / 挖矿行为,
	 * 必须开启此选项标注
	 *
	 * [0] 元组的第一项是当前的收益化行为;
	 *
	 * [1] 元组的第二项是给用户的提示;
	 * */
	antifeature?: [ 'ads' | 'tracking' | 'miner', string ][];
	
	/**
	 * 当前脚本的第三方依赖脚本库(链接)
	 * */
	require?: string[];
	
	/**
	 * 当前脚本的第三方依赖资源库 (css资源 / 图片资源...)
	 *
	 * [0] 元组的第一项是变量名;
	 *
	 * [1] 元组的第二项是第三方链接;
	 * */
	resource?: [ string, string ][];
	
	/**
	 * 脚本沙盒环境
	 * */
	sandbox?: 'raw' | 'JavaScript' | 'DOM';
	
	/**
	 * 检测到更新时, 触发更新下载的链接
	 * */
	downloadURL?: string;
	
	/**
	 * 检测到更新时, 触发更新下载的链接
	 * */
	updateURL?: string;
	
	/**
	 * 任意键
	 * */
	[ propName: string ]: any;
}
