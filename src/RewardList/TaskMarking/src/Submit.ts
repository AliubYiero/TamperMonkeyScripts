/**
 * Submit.ts
 * created by 2023/7/12
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

export {
	goNextExam
}

function goNextExam() {
	const submitBtn = document.querySelector( '[ng-class="nextOne()"]' ) as HTMLSpanElement;
	if ( submitBtn.className.match( 'unclickable' ) ) {
		console.warn( '已经是最后一项了，请等待1分钟后，重新检查未提交的分数' );
	}
	submitBtn.click();
}
