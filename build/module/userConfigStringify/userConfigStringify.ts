/**
 * userConfigStringify.ts
 * created by 2024/3/13
 * @file 用户配置信息yml字符串序列化
 * @author  Yiero
 * */
import { UserConfigGroupInterface } from '../../../config/interfaces';
import YAML from 'yamljs';

/**
 * @tutorial [ScriptCat UserConfig](https://docs.scriptcat.org/docs/dev/config/)
 * */
export const userConfigStringify = ( userConfig: UserConfigGroupInterface ): string => {
	const userinfoYamlString = YAML.stringify( userConfig, 4, 4 );
	const userinfoHeader = '/* ==UserConfig==';
	const userinfoFooter = ' ==/UserConfig== */';
	return [ userinfoHeader, userinfoYamlString, userinfoFooter ].join( '\n' );
};
