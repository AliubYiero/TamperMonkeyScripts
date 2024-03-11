/**
 * MenuMapper.ts
 * created by 2024/3/7
 * @file 油猴菜单配置映射
 * @author  Yiero
 * */
import { GMMenuConfigInterface } from '../interfaces';
import { GMMenuController } from '@yiero/gm-menu-controller';

export const MenuMapper: GMMenuConfigInterface[] = [
	{
		title: '添加样式',
		/**
		 * @todo 弹出 [添加样式] 浮层
		 * */
		onClick: () => {
		
		},
	},
	{
		title: '[开启] 右键选中屏蔽',
		/**
		 * @todo 开启后, 右键将会生成自定义上下文菜单
		 * @todo 将会显示右键点击的元素 id名(优先) / 类名(如果没有id)
		 * @todo 点击后会将对应选择器屏蔽 (display: none;)
		 *
		 * @fixme 点击后本菜单按钮未隐藏
		 * */
		onClick: () => {
			
			/*
			* 隐藏本菜单, 开启 '[关闭] 右键选中屏蔽' 菜单
			* */
			const menuList: GMMenuConfigInterface[] = GMMenuController.getInstance().getProxy();
			const closeMenuIndex = menuList.findLastIndex( item => item.title === '[关闭] 右键选中屏蔽' );
			const openMenuIndex = menuList.findLastIndex( item => item.title === '[开启] 右键选中屏蔽' );
			menuList[ openMenuIndex ].isShow = false;
			menuList[ closeMenuIndex ].isShow = true;
		},
	},
	{
		title: '[关闭] 右键选中屏蔽',
		/**
		 * @todo 点击后, 自定义上下文菜单将关闭
		 *
		 * @todo 点击后本菜单按钮将隐藏, '[开启] 右键选中屏蔽' 菜单将显示
		 * */
		onClick: () => {
			
			/*
			* 隐藏本菜单, 开启 '[开启] 右键选中屏蔽' 菜单
			* */
			const menuList: GMMenuConfigInterface[] = GMMenuController.getInstance().getProxy();
			const closeMenuIndex = menuList.findLastIndex( item => item.title === '[关闭] 右键选中屏蔽' );
			const openMenuIndex = menuList.findLastIndex( item => item.title === '[开启] 右键选中屏蔽' );
			menuList[ openMenuIndex ].isShow = true;
			menuList[ closeMenuIndex ].isShow = false;
		},
		isShow: false,
	},
];
