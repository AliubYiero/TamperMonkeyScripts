import { Info } from '../ProjectInfo/Info';
export { getRoomStatus, getLivePlayUrl, requestLivePlayUrl, };
function getRoomStatus(res) {
    let { roomId } = res;
    Info.info(`正在获取直播间 ${roomId} 的房间页初始化信息`);
    GM_xmlhttpRequest({
        method: "GET",
        url: `https://api.live.bilibili.com/room/v1/Room/room_init?id=${roomId}`,
        headers: {
            "Content-Type": "application/json"
        },
        onload: function (response) {
            let { code, data } = JSON.parse(response.responseText);
            if (code === 60004) {
                Info.error('直播间不存在');
                return;
            }
            const { live_status, is_hidden, is_locked, encrypted, room_id, live_time } = data;
            if (live_status !== 1) {
                Info.error('当前直播间没有开播');
                return;
            }
            else if (is_hidden || is_locked || encrypted) {
                Info.error('无法访问当前直播间(隐藏/上锁/加密)');
                return;
            }
            Info.info(`成功获取直播间 ${room_id} 初始信息，当前直播间已直播的时间为 ${live_time} `);
            return { roomId: room_id };
        }
    });
}
function getLivePlayUrl(res) {
    let { roomId, quality } = res;
    quality ||= 4;
    Info.info(`正在获取直播间 ${roomId} 的房间页初始化信息`);
    GM_xmlhttpRequest({
        method: "GET",
        url: `https://api.live.bilibili.com/room/v1/Room/playUrl?cid=${roomId}&quality=${quality}`,
        headers: {
            "Content-Type": "application/json"
        },
        onload: function (response) {
            let { code, data } = JSON.parse(response.responseText);
            if (code === -400) {
                Info.error('参数错误');
                return;
            }
            else if (code === 19002003) {
                Info.error('房间信息不存在');
                return;
            }
            console.log(data);
            let { accept_quality, quality_description, current_quality, durl } = data;
            quality_description.forEach((quality_description) => {
                let { qn, desc } = quality_description;
                if (qn === current_quality) {
                    Info.info(`当前选中路线画质为 ${desc} `);
                }
            });
            let highestQuality = parseInt(accept_quality[0]);
            if (current_quality !== highestQuality) {
                Info.info('当前选中路线不是最高画质，正在重新获取链接');
                return getLivePlayUrl({ roomId: roomId, quality: highestQuality });
            }
            durl.forEach((url) => {
                let liveUrl = url.url;
                Info.info('已获取直播流');
                console.log(liveUrl);
                return { liveUrl };
            });
            if (durl.length === 0) {
                Info.warn('没有可用直播流');
            }
        }
    });
}
function requestLivePlayUrl(res) {
    let { liveUrl } = res;
    GM_xmlhttpRequest({
        url: liveUrl,
        method: 'GET',
        onload: function (response) {
            console.log(response);
        }
    });
}
