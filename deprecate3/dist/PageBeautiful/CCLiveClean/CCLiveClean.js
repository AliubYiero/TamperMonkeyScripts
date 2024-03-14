// ==UserScript==
// @name		CC直播间净化
// @name:en		CCLiveClean
// @description		隐藏CC直播页面中的大部分广告, 并且当直播结束跳转其他直播间时, 自动关闭页面
// @description:en		Hide almost CC live Element. 
// @author		Yiero
// @version		beta_1.1.1
// @match		https://cc.163.com/*
// @match		https://act/m/daily/anchor_end_countdown/*
// @grant		GM_addStyle
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_deleteValue
// @grant		GM_listValues
// @grant		GM_registerMenuCommand
// @grant		GM_unregisterMenuCommand
// @require		file://D:\Code\tampermonkey-demo\dist\PageBeautiful\CCLiveClean\CCLiveClean.js
// @run-at		document-body
// @icon		https://cc.163.com/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @license		GPL
// ==/UserScript==
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
    console.log(...this.contentInfo(...msg));
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
    return [this.header, ...msg];
  }
}
class CSSRule {
  constructor() {
    __publicField(this, "cssRuleSet", /* @__PURE__ */ new Set());
    __publicField(this, "styleDom", document.createElement("style"));
  }
  push(selector, rule) {
    let ruleString = "";
    for (let ruleKey in rule) {
      const ruleValue = rule[ruleKey];
      ruleString += `${ruleKey}:${ruleValue};`;
    }
    this.cssRuleSet.add(`${selector} {${ruleString}}`);
    return this;
  }
  pushImportant(selector, rule) {
    let ruleString = "";
    for (let ruleKey in rule) {
      let ruleValue = rule[ruleKey];
      if (typeof ruleValue === "string") {
        ruleValue = ruleValue.replace("!important", "");
      }
      ruleString += `${ruleKey}:${ruleValue} !important;`;
    }
    this.cssRuleSet.add(`${selector} {${ruleString}}`);
    return this;
  }
  pushHide(selector) {
    this.pushImportant(selector, {
      display: "none"
    });
    return this;
  }
  pushHideList(selectorList) {
    selectorList.forEach((selector) => {
      this.pushImportant(selector, {
        display: "none"
      });
    });
    return this;
  }
  pushList(ruleList) {
    ruleList.forEach(({ selector, rule }) => {
      this.push(selector, rule);
    });
    return this;
  }
  pushImportantList(ruleList) {
    ruleList.forEach(({ selector, rule }) => {
      this.pushImportant(selector, rule);
    });
    return this;
  }
  submit() {
    this.removeAll();
    new Info("AddStyle").log(Array.from(this.cssRuleSet).join(" "));
    this.styleDom = GM_addStyle(Array.from(this.cssRuleSet).join(" "));
  }
  removeAll() {
    if (this.styleDom) {
      this.styleDom.remove();
    }
    return this;
  }
}
const hideSelectorList = {
  main: {
    /* 主体 */
    main: [
      // 背景广告
      ".ad-ct",
      // 最下角的我的消息
      "#webChat",
      // 左侧的导航跳转条
      "#js-side-nav",
      // 右侧的永劫大厅广告
      ".index-module_container_1pK9d",
      // 滚动条
      "::-webkit-scrollbar"
    ],
    /* 顶部导航栏(导航栏只留下搜索和头像) */
    headerNav: [
      // 顶部导航栏左侧的所有元素
      ".menu-location",
      // 顶部导航栏右侧的关注, 历史, 下载, 开播
      "#my-follow, #my-record, #download, #menu-be-anchor",
      // 屏蔽头像的信息提示红点
      "#guard-head-avatar-red-dot-msg, .red-dot"
    ],
    /* 弹幕栏 */
    danmuBar: [
      // 弹幕栏上方的贵宾栏
      "#room-tabs",
      // 弹幕栏上方的礼物横幅
      "#gift-banner",
      ".gift-simp-banner",
      // 弹幕栏上方的直播公告
      ".room-boardcast",
      // 弹幕栏中的活动提示
      ".activity-notify",
      // 弹幕栏中的礼物
      ".gift_item",
      // 弹幕栏下面一直弹出的进入直播间提示 ( 弹幕栏中欢迎进入直播间的弹幕需开启CC自带的屏蔽 )
      ".chat-msg-folder",
      // 财富等级勋章
      ".js-nobility-log-hover",
      // 等级勋章
      ".js-msg-yjwj-vip-label"
    ],
    /* 直播标题栏 */
    liveTitle: [
      // 直播标题栏的守护之心, 永劫无间, 守护, 粉钻, 朋友
      "#achievement, .live-type, .live-guard, .live-fans-badge-diamond, .anchor-friends",
      // 右侧的[举报] [手机看] [分享]
      ".right-tools"
    ],
    /* 直播区 */
    live: [
      // 直播下面的动态和推荐
      "#recommend-module",
      // 直播视频左下角的 永劫大厅 / 水果达人等浮窗
      "#live_left_bottom_box_wrap",
      // 直播视频右上角的CC直播水印
      ".video-watermark",
      // 直播视频弹幕中一直滚动的横幅(banner), 包括活动, 会员用户进入
      "#new-player-banner, #player-banner, #new-player-banner, #mounts_player, #mounts_banner"
    ],
    gift: [
      // 屏蔽除了水果达人和弹幕风暴以外的所有活动
      "#plugins2374, #plugins9970, #plugins9670, #plugins9977, #plugins9412, #plugins9997, #plugins9089, #plugins6666, #plugins9217, #plugins2511, #plugins1609, #plugins9913, #plugins1016, #plugins14, #plugins5985, #plugins1353, #plugins1, #plugins9321 ",
      // 宽屏下的礼物栏
      ".gameH5Theater .user-tool-bar"
    ]
  },
  anchor_end_countdown: {
    /* 直播区的iframe */
    live: [
      // 直播左上角的下播倒计时
      ".ui-wrap"
    ]
  }
};
const prefSelectorList = {
  /* 主体 */
  main: {
    /* 取消顶部的留空 */
    ".room-main-container": { "margin-top": "20px" }
  },
  /* 顶部导航栏 */
  headerNav: {
    // 优化顶部导航栏布局, 搜索栏居中
    ".user-do": {
      "margin-right": "50%",
      transform: "translateX(50%)"
    }
  },
  /* 视频区 */
  live: {
    // 拉伸直播区至满宽度
    ".page-right-container": { width: "100%" },
    // 拉伸宽屏状态的直播区至满高度
    "#live_player": { height: "100%" }
  },
  danmuBar: {
    /* 填充侧边弹幕栏 */
    ".chat-list-short": { height: "calc(100% - 110px)" },
    /* 填充侧边弹幕栏 */
    "#chat-list-con": { height: "100%" }
  }
};
function transformedHideSelectorList(prefSelectorList2) {
  return Object.values(prefSelectorList2).flat();
}
function transformedPrefSelectorList(prefSelectorList2) {
  return Object.entries(
    Object.values(prefSelectorList2).flat().reduce((result, current) => ({
      ...result,
      ...current
    }))
  ).map(
    ([selector, rule]) => ({ selector, rule })
  );
}
function addCCNewStyle(type) {
  const cssRule = new CSSRule();
  cssRule.pushHideList(transformedHideSelectorList(hideSelectorList[type]));
  cssRule.pushImportantList(transformedPrefSelectorList(prefSelectorList));
  cssRule.submit();
}
function freshListenerPushState(callback, s = 1) {
  let _pushState = window.history.pushState;
  window.history.pushState = function() {
    setTimeout(callback, s * 1e3);
    return _pushState.apply(this, arguments);
  };
}
const live = {
  id: "",
  historyId: ""
};
Object.defineProperty(live, "id", {
  get() {
    const liveIdMatch = document.URL.match(/https:\/\/cc.163.com\/(\d+)/);
    if (liveIdMatch && liveIdMatch[1]) {
      const liveId = liveIdMatch[1];
      sessionStorage.setItem("localLiveId", liveId);
      return liveId;
    }
    return "";
  }
});
Object.defineProperty(live, "historyId", {
  get() {
    return sessionStorage.getItem("localLiveId") || "";
  }
});
function equalLiveId() {
  freshListenerPushState(() => {
    if (live.historyId !== live.id) {
      window.close();
    }
  });
}
class EntryBranch {
  constructor() {
    __publicField(this, "branchList", []);
  }
  /**
   * 添加分支
   * @param { function:boolean } condition
   * @param { function } callback
   * */
  add(condition, callback) {
    this.branchList.push([condition, callback]);
    return this;
  }
  /**
   * 添加默认分支, 无条件默认触发
   * @param { function } callback
   * */
  default(callback) {
    this.branchList.push([() => true, callback]);
    return this;
  }
  /**
   * 运行, 查看是否存在能够运行的入口
   * */
  run() {
    const entry = this.branchList.find((entry2) => entry2[0]());
    if (entry) {
      new Info("EntryBranch").log("进入分支", entry);
      entry[1]();
    }
  }
}
function getElement(parent = document.body, selector, timeoutPerSecond = 0, getElementDelayPerSecond = 0) {
  return new Promise((resolve) => {
    let result = parent.querySelector(selector);
    if (result) {
      return resolve(result);
    }
    let timer;
    const mutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver;
    if (mutationObserver) {
      const observer = new mutationObserver((mutations) => {
        for (let mutation of mutations) {
          for (let addedNode of mutation.addedNodes) {
            if (addedNode instanceof Element) {
              result = addedNode.matches(selector) ? addedNode : addedNode.querySelector(selector);
              if (result) {
                observer.disconnect();
                timer && clearTimeout(timer);
                setTimeout(() => {
                  return resolve(result);
                }, getElementDelayPerSecond * 1e3);
              }
            }
          }
        }
      });
      observer.observe(parent, {
        childList: true,
        subtree: true
      });
      if (timeoutPerSecond > 0) {
        timer = setTimeout(() => {
          observer.disconnect();
          return resolve(null);
        }, timeoutPerSecond * 1e3);
      }
    }
  });
}
document.querySelector.bind(document);
const getEls = document.querySelectorAll.bind(document);
async function selectOriginBanSetting() {
  await getElement(void 0, ".ban-effect-list", 0, 1);
  const banList = getEls(".ban-effect-list > li:not(.selected)");
  banList.forEach((banItem) => {
    banItem.click();
  });
}
function isMatchURL(...regExpList) {
  const matchResultList = [];
  regExpList.forEach((regExp) => {
    if (typeof regExp === "string") {
      regExp = new RegExp(regExp);
    }
    matchResultList.push(!!document.URL.match(regExp));
  });
  return matchResultList.includes(true);
}
class GMConfigMenu {
  constructor(callback) {
    /** 配置菜单Id, 用于识别配置菜单, 关闭配置菜单 */
    __publicField(this, "menuId", 0);
    /** 回调函数 */
    __publicField(this, "callback");
    this.callback = callback;
  }
  /**
   * 注册油猴菜单配置项
   * @param {string} title 配置项提示文本
   * */
  open(title) {
    if (this.menuId) {
      this.close();
    }
    this.menuId = GM_registerMenuCommand(title, this.callback);
  }
  /**
   * 注销油猴菜单配置项
   * */
  close() {
    GM_unregisterMenuCommand(this.menuId);
    this.menuId = 0;
  }
}
class GMStorage {
  constructor(key) {
    __publicField(this, "key");
    this.key = key;
  }
  /** 设置/更新键 */
  set(value) {
    dispatchEvent(new CustomEvent("GMStorageUpdate", {
      detail: {
        newValue: value,
        oldValue: this.get(),
        target: this.key
      }
    }));
    GM_setValue(this.key, value);
  }
  /** 获取值 */
  get(defaultValue = null) {
    return GM_getValue(this.key, defaultValue);
  }
  /** 移除键 */
  remove() {
    dispatchEvent(new CustomEvent("GMStorageUpdate", {
      detail: {
        newValue: null,
        oldValue: this.get(),
        target: this.key
      }
    }));
    GM_deleteValue(this.key);
  }
}
class WhiteList extends GMStorage {
  constructor() {
    super("liveIdWhiteList");
  }
  get whiteList() {
    return this.get([361433, 239802416]);
  }
  /* 添加白名单 */
  add(liveId) {
    const whiteList2 = this.whiteList;
    whiteList2.push(liveId);
    this.set(whiteList2);
  }
  /* 查看是否存在白名单 */
  has(liveId) {
    return this.whiteList.includes(liveId);
  }
  delete(liveId) {
    this.set(this.whiteList.filter((whiteLiveId) => whiteLiveId !== liveId));
  }
}
const whiteList = new WhiteList();
function disabledNotWhiteListUrl(liveId) {
  if (!whiteList.has(liveId)) {
    window.close();
  }
}
function registerConfigBtn(liveId) {
  new GMConfigMenu(() => {
    const result = prompt(`输入需要添加白名单的直播间的数字Id (网页地址中的数字Id):
当前白名单:
[${whiteList.whiteList.join(", ")}]`);
    if (result) {
      whiteList.add(Number(result));
    }
  }).open("添加直播间白名单");
  new GMConfigMenu(() => {
    const result = prompt(`输入需要删除白名单的直播间数字Id(网页地址中的数字Id):
当前白名单:
[${whiteList.whiteList.join(", ")}]`, String(liveId || whiteList.whiteList[0] || ""));
    if (result) {
      whiteList.delete(Number(result));
    }
  }).open("删除直播间白名单");
}
async function mainPageEntry() {
  disabledNotWhiteListUrl(Number(live.id));
  registerConfigBtn(Number(live.id));
  addCCNewStyle("main");
  await selectOriginBanSetting();
  equalLiveId();
}
(async () => {
  const entryBranch = new EntryBranch();
  entryBranch.add(
    () => isMatchURL(/^https?:\/\/cc.163.com\/$/),
    registerConfigBtn
  );
  entryBranch.add(
    () => isMatchURL(/^https?:\/\/cc.163.com\/(\d+)/),
    mainPageEntry
  );
  entryBranch.add(
    () => isMatchURL("act/m/daily/anchor_end_countdown/index.html"),
    () => {
      addCCNewStyle("anchor_end_countdown");
    }
  );
  entryBranch.run();
})();
