/*
* 检查应用独立视频的直播间
* */
const checkLiveAddress = (function () {
	const applyLiveAddressList = ['361433'];
	return function () {
		const liveAddress = location.pathname.split('/')[1];
		for (let i = 0; i < applyLiveAddressList.length; i++) {
			const applyLiveAddress = applyLiveAddressList[i];
			if (applyLiveAddress === liveAddress) {
				return true;
			}
		}
	};
})();
