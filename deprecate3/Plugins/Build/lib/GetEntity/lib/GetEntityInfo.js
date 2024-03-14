/**
 * @typedef { {} } EntityInfo
 * @type { EntityInfo }
 * @property { string } projectName 项目名
 * @property { string } projectPath 项目的绝对路径地址
 * @property { string } projectRelativePath 项目的相对路径地址(相对于src目录)
 * @property { string } projectEntryPath 项目的入口文件绝对路径地址
 * @property { string } projectDevelopmentOutputPath 项目的开发环境输出地址(相对)
 * @property { string } projectProductionOutputPath 项目的生产环境输出地址(相对)
 * @property { UserInfo } userinfo 用户信息
 * @property { string } version 最后一次构造(build)的版本号
 * @property { EntityTimestampInfo } timestamp 项目中所有文件的时间戳
 * */
import { getCtimeInDir, readFileContent, readFileInDir, readJson } from '../../../../Fs/index.js'
import { basename, normalize, relative, resolve } from 'path'
import YAML from 'yamljs'
import { Print } from '../../../../Console/lib/Print.js'
import { GlobalConfig } from '../../../../../Config/config.global.js'

/**
 * 获取指定目录下的所有文件信息
 * @return { EntityInfo }
 * @param { string } entityDirPath 项目实体地址
 * */
export function getEntityInfo( entityDirPath ) {
	
	/**
	 * 获取项目的所有文件对象
	 * @type { {[fileName: string]: string} }
	 * */
	const filePathObj = ( () => {
		// 文件路径对象
		/** @type { {[fileName: string]: string} } */
		const filePathObj = {};
		
		// 获取项目中所有的文件路径
		// 遍历所有文件路径数组, 获取以项目名为键, 文件路径为值的对象
		const filePathList = readFileInDir( entityDirPath );
		filePathList.forEach( filePath => {
			filePathObj[basename( filePath )] = filePath;
		} );
		
		return filePathObj;
	} )();
	
	// 获取项目实体信息
	/** @type { EntityInfo } */
	const entityInfo = {};
	
	/* 声明项目的项目名 */
	Object.defineProperty( entityInfo, 'projectName', {
		get() {
			return basename( entityDirPath );
		}
	} )
	
	/* 声明项目的项目地址 */
	Object.defineProperty( entityInfo, 'projectPath', {
		get() {
			return entityDirPath;
		}
	} )
	
	/* 声明项目的相对路径地址(相对于src目录) */
	Object.defineProperty( entityInfo, 'projectRelativePath', {
		get() {
			return relative( resolve( 'src' ), entityDirPath );
		}
	} )
	
	/* 声明项目的输出地址(含后缀)(开发环境) */
	Object.defineProperty( entityInfo, 'projectDevelopmentOutputPath', {
		get() {
			return `${ entityInfo.projectRelativePath }\\${ basename( entityInfo.projectRelativePath ) }.js`;
		}
	} )
	
	/* 声明项目的输出地址(生产环境) */
	Object.defineProperty( entityInfo, 'projectProductionOutputPath', {
		get() {
			return `${ entityInfo.projectRelativePath }\\${ basename( entityInfo.projectRelativePath ) }.user.js`;
		}
	} )
	
	/* 声明项目的入口文件 */
	Object.defineProperty( entityInfo, 'projectEntryPath', {
		get() {
			if ( filePathObj['index.ts'] ) {
				return filePathObj['index.ts'];
			}
			else if ( filePathObj['index.js'] ) {
				return filePathObj['index.js'];
			}
		}
	} )
	
	/* 声明项目的入口文件 */
	Object.defineProperty( entityInfo, 'userinfo', {
		get() {
			// 读取userinfo.json文件
			if ( filePathObj['userinfo.json'] ) {
				return readJson( filePathObj['userinfo.json'] );
			}
			else if ( filePathObj['userinfo.yml'] ) {
				// 调用fs读取文件文本之后再使用yamljs解析文本,
				// 否则如果直接调用YAML.load只能使用Promise同步信息, 无法同步更新数据
				const userinfoYamlString = readFileContent( filePathObj['userinfo.yml'] );
				return YAML.parse( userinfoYamlString );
			}
			
			// 读取不到userinfo文件时, 报错
			console.error( Print.cyan( `在当前项目中无法读取到userinfo文件: ${ entityDirPath }` ) );
			throw new Error( `Cannot found userinfo file (userinfo.json | (userinfo.yml) in project: ${ entityDirPath }` );
		}
	} )
	
	/* 获取项目的版本号 */
	Object.defineProperty( entityInfo, 'version', {
		get() {
			return entityInfo.userinfo.version
		}
	} )
	
	/* 声明项目中所有文件的时间戳 */
	Object.defineProperty( entityInfo, 'timestamp', {
		get() {
			const timestampObj = getCtimeInDir( entityDirPath );
			
			GlobalConfig.ignore.project.forEach( ignoreFile => {
				/*
				* 格式化输入
				* 1. 斜杠转反斜杠
				* 2. 清除相对路径 './'
				*  */
				ignoreFile = normalize( ignoreFile
					.replace( '/', '\\' )
					.replace( /^\.\\/, '' )
				);
				
				/* 如果输入的忽略是路径目录, 删除所有该路径下的时间戳读取 */
				if ( ignoreFile.endsWith( '\\' ) ) {
					for ( let timestampObjKey in timestampObj ) {
						if ( !timestampObjKey.startsWith( ignoreFile ) ) {
							delete timestampObj[timestampObjKey];
						}
					}
				}
				else {
					delete timestampObj[ignoreFile];
				}
			} );
			
			return timestampObj;
		}
	} );
	
	return entityInfo;
}
