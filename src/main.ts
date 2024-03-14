/**
 * main.ts
 * created by 2024/3/5
 * @file 项目入口文件
 * @author  Yiero
 * */

import { FunctionChainCall } from './utils';
import {
	addQuickOption,
	bindKeyboardEvent,
	getOptionContainer,
	initOption,
	isAnswerUI,
	removeExtraElement,
	setLargeFont,
	unlockRandomOption,
	useRandomOption,
} from './module';


const functionChainCall = new FunctionChainCall();
functionChainCall.set( addQuickOption );

/** 入口 */
const fnList = [
	// bindPageReloadEvent,    // 当页面通过hash更新路由时，强制页面刷新
	removeExtraElement,     // 通过CSS优化界面UI，移除多余元素
	unlockRandomOption,     // 模拟考试选题界面解锁随机选项
	isAnswerUI,             // 判断是否为答题界面
	useRandomOption,        // 模拟考试界面进行随机选项设置
	setLargeFont,           // 模拟考试界面默认设置最大字体
	initOption,             // 更换题目时重新初始化提交状态
	getOptionContainer,     // 监听选项容器更改，重新绑定选项容器
	bindKeyboardEvent,       // 绑定键盘事件
];
functionChainCall.setList( fnList );
window.onload = () => {
	setTimeout( () => {
		functionChainCall.call();
	}, 1000 );
};
