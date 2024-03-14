

function setInitSetting() {
	// 获取屏蔽设置
	let disSetting = document.getElementsByClassName('ban-effect-list')[0].querySelectorAll('li')
	
	// 进行屏蔽设置
	for (let i = 1; i < disSetting.length; i++) {
		disSetting[i].className = "selected"
	}
	
	// 删除边栏
	document.body.className = 'collapse'
	
	// 拓展弹幕栏
	document.getElementsByClassName('chat-list')[0].style.height = '100%'
}

function removeExtraInfoContainer() {
	const removeElementList = [
		'.ad-ct', // 删除背景跳转
		'#webChat', // 删除消息
		'#pic-in-pic-btn', // 删除视频弹窗
		'#live_left_bottom_box_wrap', //删除视频弹窗
		'.room-boardcast', // 删除广告栏
		'#float-plugin-container-43751-4', // 删除侧边永劫大厅
		'.room-tabs-container', // 删除贵宾栏
		'#room-tabs', // 删除贵宾栏
		'.ui-dialog', // 删除贵宾栏
	]
	
	
	removeElementList.forEach(elementSelector => {
		console.log('删除' + elementSelector)
		const dom = document.querySelector(elementSelector)
		if (dom) dom.remove()
	})
}
