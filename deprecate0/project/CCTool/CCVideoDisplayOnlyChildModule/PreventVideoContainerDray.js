/*
* 阻止视频容器移动
* @description 视频的拖动是miniVideo控制的，但是手动关闭miniVideo却不会删除miniVideo元素，所以视频容器还能够拖动
* @description 模拟点击缺可以关闭，网易CC的开发SoGood
* */
function preventVideoContainerDray() {
	document.querySelector('.auto-pic-in-pic-close').click();

	// 防止miniVideo没有删除，还是需要添加观察者
	const videoContainer = document.querySelector('.cc-h5player-container');
	const observer = new MutationObserver((e) => {
		const element = e[0].target;
		element.style.top = 0;
		element.style.left = 0;
	});

	observer.observe(videoContainer, {
		attributes: true,
	});
}
