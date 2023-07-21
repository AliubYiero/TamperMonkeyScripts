/**
 * LoadBandList.ts
 * created by 2023/7/21
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export type {
	BandList
}
export {
	getBandList,
	setBandList
}


/**
 * 从 localStorage 中获取屏蔽列表
 * */
function getBandList(): BandList {
	const bandListString = localStorage.getItem( 'BandList' ) || '{"dynamicUpList": [], "liveUpList": []}, "videoUpList": []';
	return JSON.parse( bandListString );
}

/**
 * 将屏蔽列表储存进 localStorage 中
 * */
function setBandList( bandList: BandList ) {
	localStorage.setItem( 'BandList', JSON.stringify( bandList ) );
}

interface BandList {
	videoUpList: string[]
	dynamicUpList: string[]
	liveUpList: string[]
}
