/* entry */
import { EntryBranch } from '../../../lib/Base/EntryBranch';
import { isMatchURL } from '../../../lib/Base/IsMatchURL'
import { styleConfig } from './config/style.config'
import { elementWaiter } from '../../../lib/Listener/ElementAdd'
import { Info } from '../../../lib/Base/Info'
import { addHideStyle } from '../CssStyleClass/AddStyle'

export {
	print
}
const print = new Info( 'ChaoxingClean' );
( async () => {
	const entryBranch: EntryBranch = new EntryBranch()
	
	entryBranch
		.add(
			isMatchURL( '^https?://i.chaoxing.com/base' ),
			() => {
				addHideStyle( styleConfig.hide.main );
			}
		)
		.add(
			isMatchURL( 'mooc2-ans.chaoxing.com/visit/' ),
			() => {
				/* 自动跳转都课程界面 */
				async function autoJumpCourse() {
					/* 监听 */
					const courseLinkBtn = await elementWaiter( '#myLearn' ) as HTMLElement;
					courseLinkBtn.click();
				}
				
				addHideStyle( styleConfig.hide.course );
				autoJumpCourse();
			}
		)
		.run();
} )();
