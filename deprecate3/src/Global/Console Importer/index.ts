import { Info } from '../../../lib/Base/Info.ts'
import { installLibrary } from './src/installLibrary.ts';
import { uninstallLibrary } from './src/uninstallLibrary.ts'
import { currentCdnLibMap } from './config/config.ts'
import { GMStorage } from '../../../lib/GM_Lib'
import { changeRequestLib } from './src/changeRequestLib.ts'

export {
	print,
	libStorage,
}

const libStorage = new GMStorage( 'lib' );
const print = new Info( 'Console Importer' );
( () => {
	// @ts-ignore -
	// 下载库到页面中
	unsafeWindow.$i = installLibrary;
	
	// @ts-ignore
	unsafeWindow.$set = changeRequestLib;
	
	// @ts-ignore
	// 从 bootcdn 中获取链接
	unsafeWindow.$o = currentCdnLibMap[ libStorage.get( 'bootcdn' ) ];
	
	// @ts-ignore -
	// 从页面中卸载库
	unsafeWindow.$ui = uninstallLibrary;
} )();
