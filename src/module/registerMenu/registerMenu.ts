import { GMMenuController } from '@yiero/gm-menu-controller';
import {
	getUserUid,
	setFavouriteTitle,
	setUserUid,
} from '../../utils';


/**
 * 注册油猴菜单项及其各自的onClick处理程序。
 */
export const registerMenu = () => {
	const menuList = GMMenuController.getInstance().getProxy();
	menuList.push(
		{
			title: '设置uid',
			onClick: async () => {
				const uid = prompt(
					'请输入您的uid\n' +
					'如果设置了uid会让脚本响应速度更快, 不用等待页面载入获取uid',
					await getUserUid(),
				);
				
				if ( !uid ) {
					return;
				}
				
				// 设置uid
				setUserUid( uid );
			},
		},
		{
			title: '设置收藏夹标题',
			onClick: () => {
				const title = prompt( '请输入收藏夹标题', '' );
				if ( !title ) {
					return;
				}
				
				// 设置收藏夹标题
				setFavouriteTitle( title );
			},
		},
	);
	console.log( menuList );
};
