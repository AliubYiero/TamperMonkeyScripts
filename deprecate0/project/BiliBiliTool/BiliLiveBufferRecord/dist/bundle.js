/*!
 * // ==UserScript==
 * // @name		BiliBili直播回放/录制
 * // @version		beta0.0.1
 * // @match		https://live.bilibili.com/*
 * // @grant		GM_xmlhttpRequest
 * // @require		file://D:\Code\TemperScripts\project\BiliBiliTool\BiliLiveBufferRecord\dist\bundle.js
 * // @icon		https://live.bilibili.com/favicon.ico
 * // @namespace		https://github.com/AliubYiero/TemperScripts
 * // @description		bundle.js
 * // @author		Yiero
 * // @license		GPL
 * // ==/UserScript==
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/ProjectInfo/Info.ts
/**
 * Info.ts
 * created by 2023/6/9
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

/**
 * 静态类，输出当前项目信息
 * @class Info
 * */
class Info_Info {
  static contentInfo(msg) {
    return `${this.header} ${msg}`;
  }
  static info(msg) {
    console.info(this.contentInfo(msg));
  }
  static warn(msg) {
    console.warn(this.contentInfo(msg));
  }
  static error(msg) {
    console.error(this.contentInfo(msg));
  }
}
Info_Info.header = '[BiliBili直播回放/录制]';
;// CONCATENATED MODULE: ./src/BiliInfo/Api.ts
/**
 * Api.ts
 * created by 2023/6/9
 * @file B站Api相关接口调用
 * @author  Yiero
 * @version beta1.0.0
 * */


/**
 * 获取直播间状态
 * @param {{roomId:string}} res
 * */
function getRoomStatus(res) {
  let {
    roomId
  } = res;
  Info.info(`正在获取直播间 ${roomId} 的房间页初始化信息`);
  // @ts-ignore
  GM_xmlhttpRequest({
    method: "GET",
    /** @tutorial https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/live/info.md#%E8%8E%B7%E5%8F%96%E6%88%BF%E9%97%B4%E9%A1%B5%E5%88%9D%E5%A7%8B%E5%8C%96%E4%BF%A1%E6%81%AF */
    url: `https://api.live.bilibili.com/room/v1/Room/room_init?id=${roomId}`,
    headers: {
      "Content-Type": "application/json"
    },
    onload: function (response) {
      // 获取请求响应状态
      let {
        code,
        data
      } = JSON.parse(response.responseText);
      if (code === 60004) {
        Info.error('直播间不存在');
        return;
      }
      // 获取请求响应信息
      const {
        live_status,
        is_hidden,
        is_locked,
        encrypted,
        room_id,
        live_time
      } = data;
      if (live_status !== 1) {
        Info.error('当前直播间没有开播');
        return;
      } else if (is_hidden || is_locked || encrypted) {
        Info.error('无法访问当前直播间(隐藏/上锁/加密)');
        return;
      }
      /** @todo 转换live_time的时间，目前未知其转换规则 */
      Info.info(`成功获取直播间 ${room_id} 初始信息，当前直播间已直播的时间为 ${live_time} `);
      // 返回直播间真实Id
      return {
        roomId: room_id
      };
    }
  });
}
/**
 * 获取直播间
 * @param {{roomId:string, quality?: number}} res
 * */
function getLivePlayUrl(res) {
  let {
    roomId,
    quality
  } = res;
  quality || (quality = 4); // 当画质代码错误时，自动选择最低画质
  Info_Info.info(`正在获取直播间 ${roomId} 的房间页初始化信息`);
  // @ts-ignore
  GM_xmlhttpRequest({
    method: "GET",
    /** @tutorial https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/live/live_stream.md#%E6%A0%B9%E6%8D%AE%E7%9C%9F%E5%AE%9E%E7%9B%B4%E6%92%AD%E9%97%B4%E5%8F%B7%E8%8E%B7%E5%8F%96%E7%9B%B4%E6%92%AD%E8%A7%86%E9%A2%91%E6%B5%81 */
    url: `https://api.live.bilibili.com/room/v1/Room/playUrl?cid=${roomId}&quality=${quality}`,
    headers: {
      "Content-Type": "application/json"
    },
    onload: function (response) {
      /**
       * 判断相应状态
       * */
      let {
        code,
        data
      } = JSON.parse(response.responseText);
      if (code === -400) {
        Info_Info.error('参数错误');
        return;
      } else if (code === 19002003) {
        Info_Info.error('房间信息不存在');
        return;
      }
      console.log(data);
      let {
        accept_quality,
        quality_description,
        current_quality,
        durl
      } = data;
      /**
       * 判断画质是否为最高画质（默认选中最高画质）
       * @todo 可以自己选择录制画质
       * */
      // 获取当前选中画质中文描述
      quality_description.forEach(quality_description => {
        let {
          qn,
          desc
        } = quality_description;
        if (qn === current_quality) {
          Info_Info.info(`当前选中路线画质为 ${desc} `);
        }
      });
      // 判断画质是否为最高画质
      let highestQuality = parseInt(accept_quality[0]);
      if (current_quality !== highestQuality) {
        // 不是最高画质，重定向到最高画质路线
        Info_Info.info('当前选中路线不是最高画质，正在重新获取链接');
        return getLivePlayUrl({
          roomId: roomId,
          quality: highestQuality
        });
      }
      /**
       * 获取直播流链接
       * */
      durl.forEach(url => {
        let liveUrl = url.url;
        Info_Info.info('已获取直播流');
        console.log(liveUrl);
        return {
          liveUrl
        };
      });
      if (durl.length === 0) {
        Info_Info.warn('没有可用直播流');
      }
    }
  });
}
/**
 * 请求直播流
 * */
function requestLivePlayUrl(res) {
  let {
    liveUrl
  } = res;
  // @ts-ignore
  GM_xmlhttpRequest({
    url: liveUrl,
    method: 'GET',
    onload: function (response) {
      console.log(response);
    }
  });
}
;// CONCATENATED MODULE: ./src/index.ts
/**
 * @file 项目入口
 * @author  Yiero
 * @version beta1.0.0
 * */

(() => {
  /**
   * @readonly
   * @enum {number}
   * @type {stop:0, next: 1, finial: 2}
   * */
  let Go;
  (function (Go) {
    // 停止执行
    Go[Go["stop"] = 0] = "stop";
    // 继续执行下一个函数
    Go[Go["next"] = 1] = "next";
    // 跳转至最后一个函数结束
    Go[Go["finial"] = 2] = "finial";
  })(Go || (Go = {}));
  /**
   * 创建数据库
   * */
  function creatDatabase(res) {
    // new LiveDB();
  }
  // FunctionChainCall.call();
  // getRoomStatus( { roomId: '169669' } );
  getLivePlayUrl({
    roomId: '169669',
    quality: 4
  });
})();
/******/ })()
;