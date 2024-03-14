import { Info } from '../../../../lib/Base/Info'
import { config } from '../config/global.config'

/**
 * Info.ts
 * created by 2023/7/14
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	print
}

const print = new Info( config.projectName );
