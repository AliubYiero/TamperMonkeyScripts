import { menuList } from './config.menuList.ts';

/**
 * 注册油猴菜单项及其各自的onClick处理程序。
 */
export const registerMenu = () => {
	menuList.forEach( menuInfo => {
		const { title, onClick } = menuInfo;
		GM_registerMenuCommand( title, onClick );
	} );
};
