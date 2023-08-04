/**
 * PageListener.ts
 * created by 2023/8/3
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	judgeVideoPage,
	judgeStudyPage,
	saveStudyPageId,
}


/* 判断是否为视频页面 */
function judgeVideoPage(): boolean {
	return !!document.URL.match( /^https:\/\/pc\.kmelearning\.com\/jxccb\/home\/courseplay\/.*/g );
}

/* 判断是否为观看列表(学习目录) */
function judgeStudyPage(): boolean {
	// print.log( 'judgeStudyPage', document.URL, !!document.URL.match( /^https:\/\/pc.kmelearning.com\/jxccb\/training\/study\/.*/g ) );
	return !!document.URL.match( /^https:\/\/pc\.kmelearning\.com\/jxccb\/home\/training\/study\/.*/g );
}

/* 保存学习目录id */
function saveStudyPageId() {
	return +( <string[]> document.URL.match( /(?<=\/)\d+/g ) )[ 0 ] as number;
}
