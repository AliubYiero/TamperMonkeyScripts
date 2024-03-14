import { GMConfigMenu } from '../../../lib/GM_Lib'
import { getFlomeApi } from './src/getFlomeApi.ts'
import { inputPrevTags } from './src/inputPrevTags.ts'
import { flomeInput } from './src/flomeInput.ts'
import { getDefaultContent } from './src/getDefaultContent.ts'

/* entry */
( async () => {
	const configApiMenu: GMConfigMenu = new GMConfigMenu( getFlomeApi );
	configApiMenu.open( '输入 Flome APi' );
	
	const configTagsMenu: GMConfigMenu = new GMConfigMenu( inputPrevTags );
	configTagsMenu.open( '输入默认标签' );
	
	const openFlomeMenu: GMConfigMenu = new GMConfigMenu( flomeInput.bind( null, getDefaultContent() ) );
	openFlomeMenu.open( '输入 Flome 笔记' );
} )(); 
