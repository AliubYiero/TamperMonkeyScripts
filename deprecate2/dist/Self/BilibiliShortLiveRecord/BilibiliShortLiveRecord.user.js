var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Info {
  constructor(projectName) {
    // @ts-ignore
    __publicField(this, "projectName");
    __publicField(this, "header");
    this.projectName = projectName;
    this.header = `[${projectName}]`;
  }
  log(...msg) {
    /* @__PURE__ */ (() => {
    })(...this.contentInfo(...msg));
  }
  info(...msg) {
    console.info(...this.contentInfo(...msg));
  }
  warn(...msg) {
    console.warn(...this.contentInfo(...msg));
  }
  error(...msg) {
    console.error(...this.contentInfo(...msg));
  }
  contentInfo(...msg) {
    return [this.header, `[${(/* @__PURE__ */ new Date()).toLocaleString("zh-ch")}]`, ...msg];
  }
}
const config = {
  projectName: "BilibiliShortLiveRecord"
};
const print = new Info(config.projectName);
function getLiveRoomId() {
  const urlPathList = location.pathname.split("/");
  const roomId = urlPathList[urlPathList.length - 1];
  return new Promise((resolve) => {
    resolve({ data: { roomId } });
  });
}
const api_getRoomStatus = (res) => {
  let { roomId } = res;
  print.info(`正在获取直播间 ${roomId} 的房间页初始化信息`);
  return axios.get(`https://api.live.bilibili.com/room/v1/Room/room_init?id=${roomId}`).then((res2) => {
    print.log(res2);
    let { code, data } = res2.data;
    if (code === 60004) {
      print.error("直播间不存在");
      return;
    }
    const { live_status, is_hidden, is_locked, encrypted, room_id, live_time } = data;
    if (live_status !== 1) {
      print.error("当前直播间没有开播");
      return;
    } else if (is_hidden || is_locked || encrypted) {
      print.error("无法访问当前直播间(隐藏/上锁/加密)");
      return;
    }
    print.info(`成功获取直播间 ${room_id} 初始信息，当前直播间已直播的时间为 ${live_time} `);
    return { roomTrueId: room_id };
  });
};
const api_getLivePlayUrl = (res) => {
  let { roomId, quality } = res;
  quality || (quality = 1e4);
  print.info(`正在获取直播间 ${roomId} 的房间页初始化信息`);
  return axios.get(`https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo?room_id=${roomId}&protocol=0,1&format=0,2&codec=0,1&qn=${quality}&platform=web&ptype=16`).then(
    (res2) => {
      print.log("直播间初始化信息", res2.data);
      let { code, data } = res2.data;
      if (code === -400) {
        print.error("参数错误");
        return;
      } else if (code === 19002003) {
        print.error("房间信息不存在");
        return;
      }
      let { stream } = data.playurl_info.playurl;
      stream[0].format[0].codec[0];
    }
  );
};
async function api_requestLivePlayUrl(res) {
  let { liveUrl } = res;
  liveUrl = liveUrl.replace("mid=0", "mid=12548410");
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 1e3);
  const response = await fetch(liveUrl, { credentials: "same-origin", signal: controller.signal });
  clearTimeout(id);
  print.log(response);
  return response;
}
(async () => {
  let RoomId = 0;
  let LiveUrl = "";
  await getLiveRoomId().then(
    (resolve) => {
      const res = resolve;
      RoomId = parseInt(res.data.roomId);
      print.log(RoomId);
    }
  );
  await api_getRoomStatus({ roomId: RoomId }).then(
    (res) => {
      print.log("直播间状态", res);
      RoomId = res.roomTrueId;
    }
  );
  await api_getLivePlayUrl({ roomId: RoomId }).then(
    (res) => {
      if (res) {
        LiveUrl = res.liveUrl;
        print.log("直播间链接", LiveUrl);
      }
    }
  );
  await api_requestLivePlayUrl({ liveUrl: LiveUrl }).then(
    (res) => {
      print.log(res);
    }
  );
})();
