/**
 * dev.js
 * created by 2023/7/20
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { buildFiles } from '../Plugins/Build/BuildFiles.js'

const buildCommand = 'tsc && vite build --mode development';
buildFiles( buildCommand );
