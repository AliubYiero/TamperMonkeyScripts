/**
 * RegisterMenu.ts
 * created by 2024/3/7
 * @file 注册油猴菜单
 * @author  Yiero
 * */
import { GMMenuController } from '@yiero/gm-menu-controller';
import { GMMenuConfigInterface } from './interfaces';
import { MenuMapper } from './config/MenuMapper.ts';

/*
* 注册油猴菜单
* */
export const registerMenu = (): GMMenuConfigInterface[] => {
	const menuList: GMMenuConfigInterface[] = GMMenuController.getInstance().getProxy();
	menuList.push(
		...MenuMapper,
	);
	return menuList;
};
