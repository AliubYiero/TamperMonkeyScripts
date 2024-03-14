/**
 * ConfigMenu.ts
 * created by 2023/8/20
 * @file
 * @author  Yiero
 * */
export type {
	ConfigMenu
}

interface ConfigMenu {
	/* 菜单Id */
	menuId: number;
	
	/* 打开菜单 */
	open( title: string, callback: Function ): void;
	
	/* 关闭菜单 */
	close(): void;
}
