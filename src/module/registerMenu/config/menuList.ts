/**
 * menuList.ts
 * created by 2024/3/12
 * @file 菜单配置列表数组
 * @author  Yiero
 * */
import {
	getFavouriteTitle,
	getUserUid,
	hasFavouriteTitle,
	setFavouriteTitle,
	setUserUid,
} from '../../../utils';

export const menuList = [
	{
		title: '输入您的uid',
		onClick: async () => {
			const uid = prompt(
				'请输入您的用户uid ' + '(默认将从页面中获取uid)\n' +
				'如果设置了用户uid会让脚本响应速度更快, 不用等待页面载入获取uid\n' +
				'(如果您不知道uid是什么, 请不要随意输入)\n' +
				'(用户uid是您的主页上网址的一串数字 \'https://space.bilibili.com/<uid>\')',
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
			if ( hasFavouriteTitle() ) {
				setFavouriteTitle( getFavouriteTitle() );
			}
			
			
			// 获取用户输入的收藏夹标题
			const title = prompt(
				'请输入收藏夹标题 ' + '(默认使用 \'fun\'作为收藏夹标题)\n',
				getFavouriteTitle() );
			
			// 用户取消输入
			if ( !title ) {
				return;
			}
			
			// 设置收藏夹标题
			setFavouriteTitle( title );
		},
	},
];
