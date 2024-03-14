import { checkbox, input, select } from '@inquirer/prompts'
import { createSelectBoxConfig } from './utils/CreateSelectBoxConfig.js'
import { createSelectChoice } from './utils/CreateSelectChoice.js'
import { createInputConfig } from './utils/CreateInputConfig.js'
import { createCheckboxChoice } from './utils/CreateCheckboxChoice.js'

export { isUseScriptCatUserinfoCrontabConfig }

/**
 * 定时配置输入层级嵌套
 * */
const scriptCatCrontab = [
	// 第一层
	{
		/** 选项: 是否直接输入cron表达式, 或者使用内置配置项 */
		isUse() {
			return select(
				new createSelectBoxConfig( '选择定时脚本的定时设置: ', [
					new createSelectChoice( '直接输入cron表达式', true, '直接书写cron表达式. ' ),
					new createSelectChoice( '通过内置cron选项', false, '通过一些选项规定cron表达式, 适用于不熟悉cron表达式的开发者. ' ),
				] )
			)
		}
	},
	
	// 第二层
	{
		/** 输入: 直接输入cron表达式 */
		getCronString() {
			return input(
				new createInputConfig( '输入cron表达式: ' )
			)
		},
		/** 选项: 选择内置配置项 */
		defineAll() {
			return checkbox(
				new createSelectBoxConfig(
					'选择内置配置项(可以选择多项分别配置)', [
						new createCheckboxChoice( '秒级调用', 'second' ),
						new createCheckboxChoice( '分钟级调用', 'minute' ),
						new createCheckboxChoice( '小时级调用', 'hour' ),
						new createCheckboxChoice( '天级调用', 'day' ),
						new createCheckboxChoice( '月级调用', 'month' ),
						new createCheckboxChoice( '星期级调用', 'week' ),
					]
				)
			)
		}
	},
	// 第三层
	{
		defineType: {
			'second': '秒',
			'minute': '分钟',
			'hour': '小时',
			'day': '天',
			'month': '月',
			'week': '星期',
		},
		/** 选项: 输入调用的方式 */
		define( type ) {
			const defineType = scriptCatCrontab[2].defineType[type];
			return select(
				new createSelectBoxConfig(
					`选择${ defineType }级内置配置项`, [
						new createSelectChoice( `每${ defineType }调用一次`, `${ type === 'second' ? '*' : 'once' }`, `每${ defineType }调用一次` ),
						new createSelectChoice( '间隔调用', 'interval', `选择后, 输入每隔多少${ defineType }调用一次` ),
						new createSelectChoice( '固定时间调用', 'fixed', `选择后, 输入固定的${ defineType }时间调用一次` ),
					]
				)
			)
		},
	},
	// 第四层
	{
		define( timeDurationType, timeType ) {
			const defineType = scriptCatCrontab[2].defineType[timeType];
			
			// 只调用一次
			if ( [ 'once', '*' ].includes( timeDurationType ) ) {
				return timeDurationType;
			}
			// 间隔调用
			else if ( timeDurationType === 'interval' ) {
				return input(
					new createInputConfig(
						`${ defineType }级间隔时间调用`,
						'每隔多少时间运行一次, 如输入 15 表示每个15个时间段(秒 / 分钟 / 小时)运行一次',
					)
				).then( content => {
					return `${ content }/*`
				} )
			}
			// 固定时间调用
			else if ( timeDurationType === 'fixed' ) {
				return input(
					new createInputConfig(
						`${ defineType }级固定时间调用`,
						'每个时间段的什么时间运行一次. \n如输入 15 表示每个时间段的15(秒 / 分钟 / 小时)运行一次, \n支持多时间段(以逗号分割), 如输入 1, 3, 5 表示每个时间段的1, 3, 5(秒 / 分钟 / 小时)运行一次',
					)
				).then(
					// 删除空格
					( content ) => content.split( ',' ).map( number => number.trim() ).join( ',' )
				)
			}
		}
	}
];

/**
 * 选项: [脚本猫脚本配置项信息] 获取后台脚本的定时配置
 * @return { Promise<string> } 返回一个Cron表达式字符串
 * */
function isUseScriptCatUserinfoCrontabConfig() {
	// TODO 添加Cron表达式验证
	return scriptCatCrontab[0].isUse().then(
		( isUseCron ) => {
			// 如果用户直接输入cron表达式:
			if ( isUseCron ) {
				return scriptCatCrontab[1].getCronString();
			}
			// 如果用户使用cron选项
			else {
				return scriptCatCrontab[1].defineAll().then(
					/** @typedef { ('second' | 'minute' | 'hour' | 'day' | 'month' | 'week')[] } typeList */
					async ( typeList ) => {
						// 空选择, 使用默认
						if ( typeList.length === 0 ) {
							console.log( '无选择, 默认每天调用一次. ' );
						}
						
						// 默认每天调用一次
						let cronString = [ '*', '*', 'once', '*', '*' ];
						
						let cronCounter = 0;
						for ( const type of typeList ) {
							if ( type === 'second' ) {
								cronString.unshift( '*' );
							}
							cronString[cronCounter++] = await scriptCatCrontab[3].define( await scriptCatCrontab[2].define( type ), type );
						}
						
						return cronString.join( ' ' );
					} )
			}
		} )
}
