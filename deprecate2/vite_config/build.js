/**
 * build.js
 * created by 2023/8/7
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */
import { buildFiles } from '../Plugins/Build/BuildFiles.js'

const buildCommand = 'tsc && vite build --mode production';
buildFiles( buildCommand );
