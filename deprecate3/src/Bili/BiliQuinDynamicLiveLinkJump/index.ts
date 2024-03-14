/* entry */
import { EntryBranch } from '../../../lib/Base/EntryBranch'
import { isMatchURL } from '../../../lib/Base/IsMatchURL'
import { handlerBindQuinLiveBtn } from './src/handlerBindQuinLiveBtn.ts'

( async () => {
	new EntryBranch()
		.add(
			isMatchURL( '^https://t.bilibili.com/' ),
			handlerBindQuinLiveBtn
		)
		.run();
} )(); 
