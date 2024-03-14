import { readFileInDir } from '../../../../Fs/index.js'
import { basename, dirname } from 'path'

/**
 * 获取所有项目的绝对值地址
 * @param { string } projectSrcDirPath src的绝对路径
 * @return { string[] } EntityDirList 项目实体的工作路径(绝对) 数组
 * */
export function getAllProjectPath( projectSrcDirPath ) {
	const EntityDirList = [];
	readFileInDir( projectSrcDirPath ).forEach( file => {
		if ( basename( file ) === 'index.ts' || basename( file ) === 'index.ts' ) {
			EntityDirList.push( dirname( file ) );
		}
	} );
	return EntityDirList;
}
