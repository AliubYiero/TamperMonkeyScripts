export function showVideoOnly() {
	// 选择主窗口
	const video = document.querySelector('.main-wrapper');	// 获取视频容器
	document.body.innerHTML = '';		// 清空其余容器
	document.body.appendChild(video);	// 添加视频容器
	console.log(document.querySelector('.cc-h5player-container').draggable);
}
