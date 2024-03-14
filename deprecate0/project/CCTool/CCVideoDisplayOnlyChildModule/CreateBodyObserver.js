/*
* 创建检测器，阻止广告弹出
* */
function createObserver() {
	const bodyElement = document.querySelector('body');
	const observer = new MutationObserver((e) => {
		console.log(e);
	});
	observer.observe(bodyElement, {
		childList: true,
	})
}
