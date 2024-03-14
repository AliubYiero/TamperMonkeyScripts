import { ConfigType } from '../interfaces/configType.ts'
import { website } from '../interfaces/website.ts'

/**
 * Replaces certain patterns in the given question inner text.
 * @param questionInnerText - The question inner text to be processed.
 * @returns The modified question inner text.
 */
const moocReplaceRule = ( questionInnerText: string ): string => {
	// Replace newline characters before options with a custom string "<换行>"
	const replaceNewlines = questionInnerText.replace( /\n([ABCD]\.)/g, "<换行>$1" );
	
	// Replace the "我的答案: ... 正确答案 ..." pattern with "答案 ..."
	const replaceAnswers = replaceNewlines.replace(
		/我的答案: .*正确答案(.*?)\n.*/s,
		"答案$1"
	);
	
	// Replace the custom string "<换行>" with newline characters
	return replaceAnswers.replace( /<换行>/g, "\n" );
};

export const configs: ConfigType[] = [
	// 网站
	{
		// 超星学习通
		website: website.mooc,
		params: {
			radio: {
				selector: '.mark_table > .mark_item:nth-of-type(1) > .questionLi',
				replaceRule: moocReplaceRule
			},
			checkbox: {
				selector: '.mark_table > .mark_item:nth-of-type(2) > .questionLi',
				replaceRule: moocReplaceRule
			},
			judge: {
				selector: '.mark_table > .mark_item:nth-of-type(3) > .questionLi',
				replaceRule: moocReplaceRule
			}
		}
	},
	{
		// 好大学
		website: website.haodaxue,
		params: {
			radio: {
				selector: '.list.radio_list',
				replaceRule: ( questionInnerText: string ) => {
					return questionInnerText
						.replace( /(\n[ABCD]\.)/g, '<换行>$1' )
						.replace( /\n/g, '' )
						.replace( 'ABCD正确答案： ', '\n答案: ' )
						.replace( '您的答案：', '' )
						.replace( /本题解析：.*/, '' )
						.replace( /<换行>/g, '\n' );
				}
			},
			checkbox: {
				selector: '.list.checkbox_list',
				replaceRule: ( questionInnerText: string ) => {
					return questionInnerText
						.replace( /(\n[ABCD]\.)/g, '<换行>$1' )
						.replace( /\n/g, '' )
						.replace( 'ABCD正确答案： ', '\n答案: ' )
						.replace( '您的答案：', '' )
						.replace( /本题解析：.*/, '' )
						.replace( /<换行>/g, '\n' );
				}
			},
			judge: {
				selector: '.list.judge_list',
				replaceRule: ( questionInnerText: string ) => {
					return questionInnerText
						.replace( /\n\n 正确\n 错误/, '' )
						.replace( /\n/g, '' )
						.replace( '正确答案：', '\n答案: ' )
						.replace( '您的答案：', '' )
						.replace( /本题解析：.*/, '' );
				}
			},
			QA: {
				selector: '.list.blanks_list',
				replaceRule: ( questionInnerText: string ) => {
					return questionInnerText
						.replace( '正确答案：', '<换行>答案: ' )
						.replace( '\n答：', '' )
						.replace( '您的答案：', '' )
						.replace( /\n/g, '' )
						.replace( /<换行>/g, '\n' );
				}
			}
		}
	}
]
