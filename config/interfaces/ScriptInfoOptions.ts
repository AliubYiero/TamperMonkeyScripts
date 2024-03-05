import {
	GlobalScriptsConfigInterface,
} from './GlobalScriptsConfigInterface';

/**
 * 具有辅助信息的脚本配置项接口 (项目名和输出文件名)
 * */
export type ScriptInfoOptions = GlobalScriptsConfigInterface & {
	outputFileName?: string,
}
