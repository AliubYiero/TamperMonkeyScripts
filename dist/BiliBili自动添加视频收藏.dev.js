// ==UserScript==
// @name	BiliBili自动添加视频收藏
// @version	0.5.0-beta
// @license	GPL-3
// @namespace	https://github.com/AliubYiero/TamperMonkeyScripts
// @run-at	document-start
// @author	Yiero
// @homepage	https://github.com/AliubYiero/TamperMonkeyScripts
// @description	进入视频页面后, 自动添加视频到收藏夹中. 
// @match	https://www.bilibili.com/video/*
// @match	https://www.bilibili.com/s/video/*
// @grant	GM_xmlhttpRequest
// @grant	GM_getValue
// @grant	GM_setValue
// @grant	GM_registerMenuCommand
// @grant	GM_unregisterMenuCommand
// @grant	GM_info
// @connect	api.bilibili.com
// @icon	https://www.bilibili.com/favicon.ico
// @require	file://D:\Github\TamperMonkeyScripts\dist\BiliBili自动添加视频收藏.dev.js
// ==/UserScript==

/* ==UserConfig==
配置项:
    favouriteTitle:
        title: 指定收藏夹标题
        description: 更改指定收藏夹标题
        type: text
        default: fun
    userUid:
        title: 用户uid
        description: 设置用户uid
        type: text
        default: ""

 ==/UserConfig== */
function getElement(parent, selector, timeout = 0) {
  return new Promise((resolve) => {
    let result = parent.querySelector(selector);
    if (result)
      return resolve(result);
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
                setTimeout(() => resolve(result), 300);
              }
            }
          }
        }
      });
      observer.observe(parent, {
        childList: true,
        subtree: true
      });
      if (timeout > 0) {
        timer = setTimeout(() => {
          observer.disconnect();
          return resolve(null);
        }, timeout);
      }
    } else {
      const listener = (e) => {
        if (e.target instanceof Element) {
          result = e.target.matches(selector) ? e.target : e.target.querySelector(selector);
          if (result) {
            parent.removeEventListener("DOMNodeInserted", listener, true);
            timer && clearTimeout(timer);
            return resolve(result);
          }
        }
      };
      parent.addEventListener("DOMNodeInserted", listener, true);
      if (timeout > 0) {
        timer = setTimeout(() => {
          parent.removeEventListener("DOMNodeInserted", listener, true);
          return resolve(null);
        }, timeout);
      }
    }
  });
}
const userUidConfig = {
  /**
   * 用户 UID 在本地存储中的键名
   */
  key: "userUid"
};
const UserConfigs = {
  /* 分组1 */
  "配置项": {
    favouriteTitle: {
      title: "指定收藏夹标题",
      description: "更改指定收藏夹标题",
      type: "text",
      default: "fun"
    },
    userUid: {
      title: "用户uid",
      description: "设置用户uid",
      type: "text",
      default: ""
    }
  }
};
class GMStorageExtra extends Storage {
  /**
   * 拒绝用户实例化 GMStorage,
   * 只能使用静态方法
   * */
  // eslint-disable-next-line no-useless-constructors
  constructor() {
    super();
  }
  /**
   * Storage 对象中存储的数据项数量。
   * @override Storage.length
   * */
  static get length() {
    return this.keys().length;
  }
  /**
   * 该方法接受一个键名作为参数，返回键名对应的值。
   * @override Storage.getItem()
   * */
  static getItem(key, defaultValue, group) {
    console.log(this.createKey(key, group));
    return GM_getValue(this.createKey(key, group), defaultValue);
  }
  /**
   * 该方法接受一个键名作为参数，判断键名对应的值是否存在
   * */
  static hasItem(key, group) {
    return Boolean(this.getItem(key, group));
  }
  /**
   * 该方法接受一个键名和值作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值。
   * @override Storage.setItem()
   * */
  static setItem(key, value, group) {
    GM_setValue(this.createKey(key, group), value);
  }
  /**
   * 该方法接受一个键名作为参数，并把该键名从存储中删除。
   * @override Storage.removeItem()
   * */
  static removeItem(key, group) {
    GM_deleteValue(this.createKey(key, group));
  }
  /**
   * 调用该方法会清空存储中的所有键名。
   * @override Storage.clear()
   * */
  static clear() {
    const keyList = GM_listValues();
    for (const key of keyList) {
      GM_deleteValue(key);
    }
  }
  /**
   * 该方法接受一个数值 n 作为参数，并返回存储中的第 n 个键名。
   * @override Storage.key()
   * */
  static key(index) {
    return this.keys()[index];
  }
  /**
   * 返回当前储存中所有的键名
   *
   * @return {string[]} 当前储存中所有的键名
   */
  static keys() {
    return GM_listValues();
  }
  /**
   * 返回当前储存中所有的分组名
   * */
  static groups() {
    const keyList = this.keys();
    return keyList.map((key) => {
      const splitKeyList = key.split(".");
      if (splitKeyList.length === 2) {
        return splitKeyList[0];
      }
      return "";
    }).filter((item) => item);
  }
  /**
   * 如果传入了 group, 则生成 `group.key` 格式的 key
   *
   * @param {string} key - 要连接的 key 值
   * @param {string} [group] - 要连接的 group 值 (可以为中文)
   * @return {string} `group.key` 格式的 key 或者 `key`
   */
  static createKey(key, group) {
    if (group) {
      return `${group}.${key}`;
    }
    for (let groupName in UserConfigs) {
      const configGroup = UserConfigs[groupName];
      for (let configKey in configGroup) {
        if (configKey === key) {
          return `${groupName}.${key}`;
        }
      }
    }
    return key;
  }
}
const getUserUid = async () => {
  let userUid = GMStorageExtra.getItem(userUidConfig.key, "");
  if (!userUid) {
    const selector = 'a.header-entry-mini[href^="//space.bilibili.com/"]';
    await getElement(
      document,
      selector,
      6e4
    );
    const userDom = document.querySelector(selector);
    if (!userDom) {
      return "";
    }
    userUid = new URL(userDom.href).pathname.split("/")[1];
  }
  return Promise.resolve(userUid);
};
const setUserUid = (uid) => {
  GMStorageExtra.setItem(userUidConfig.key, uid);
};
const favouriteTitleConfig = {
  /**
   * 收藏夹标题在本地存储中的键名
   */
  key: "favouriteTitle",
  /**
   * 默认收藏夹标题
   */
  title: "fun"
};
const getFavouriteTitle = () => {
  return GMStorageExtra.getItem(favouriteTitleConfig.key, favouriteTitleConfig.title);
};
const setFavouriteTitle = (title) => {
  GMStorageExtra.setItem(favouriteTitleConfig.key, title);
};
const hasFavouriteTitle = () => {
  return GMStorageExtra.hasItem(favouriteTitleConfig.key);
};
const codeConfig = {
  XOR_CODE: 23442827791579n,
  MASK_CODE: 2251799813685247n,
  MAX_AID: 1n << 51n,
  BASE: 58n,
  data: "FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf"
};
function bvToAv(bvid) {
  const { MASK_CODE, XOR_CODE, data, BASE } = codeConfig;
  const bvidArr = Array.from(bvid);
  [bvidArr[3], bvidArr[9]] = [bvidArr[9], bvidArr[3]];
  [bvidArr[4], bvidArr[7]] = [bvidArr[7], bvidArr[4]];
  bvidArr.splice(0, 3);
  const tmp = bvidArr.reduce((pre, bvidChar) => pre * BASE + BigInt(data.indexOf(bvidChar)), 0n);
  return Number(tmp & MASK_CODE ^ XOR_CODE);
}
const checkScriptCatEnvironment = () => {
  return GM_info.scriptHandler === "Tampermonkey";
};
const sleep = (timeoutPerSecond) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeoutPerSecond * 1e3);
  });
};
async function freshListenerPushState(callback, delayPerSecond = 1) {
  let _pushState = window.history.pushState.bind(window.history);
  window.history.pushState = function() {
    setTimeout(callback, delayPerSecond * 1e3);
    return _pushState.apply(this, arguments);
  };
}
const requestConfig = {
  baseURL: "https://api.bilibili.com",
  csrf: new URLSearchParams(document.cookie.split("; ").join("&")).get("bili_jct") || ""
};
const xhrRequest = (url, method, data) => {
  if (!url.startsWith("http")) {
    url = requestConfig.baseURL + url;
  }
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.withCredentials = true;
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  return new Promise((resolve, reject) => {
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.response);
      if (response.code !== 0) {
        return reject(response.message);
      }
      return resolve(response.data);
    });
    xhr.addEventListener("error", () => reject(xhr.status));
    xhr.send(new URLSearchParams(data));
  });
};
const api_collectVideoToFavorite = (videoId, favoriteId) => {
  const formData = {
    rid: videoId,
    type: "2",
    add_media_ids: favoriteId,
    csrf: requestConfig.csrf
  };
  return xhrRequest(
    "/x/v3/fav/resource/deal",
    "POST",
    formData
  );
};
const api_createFavorites = (favTitle) => {
  return xhrRequest("/x/v3/fav/folder/add", "POST", {
    // 视频标题
    title: favTitle,
    // 默认私密收藏夹
    privacy: 1,
    // csrf
    csrf: requestConfig.csrf
  });
};
function request(url, method = "GET", paramOrData, GMXmlHttpRequestConfig = {}) {
  if (!url.startsWith("http")) {
    url = requestConfig.baseURL + url;
  }
  if (paramOrData && method === "GET") {
    url += "?" + new URLSearchParams(paramOrData).toString();
  } else if (paramOrData && method === "POST") {
    GMXmlHttpRequestConfig.data = JSON.stringify(paramOrData);
  }
  return new Promise((resolve, reject) => {
    const newGMXmlHttpRequestConfig = {
      // 默认20s的超时等待
      timeout: 2e4,
      // 用户自定义的油猴配置项
      ...GMXmlHttpRequestConfig,
      // 请求地址, 请求方法和请求返回，权重最高
      url,
      method,
      onload(response) {
        resolve(JSON.parse(response.responseText));
      },
      onerror(error) {
        reject(error);
      },
      ontimeout() {
        reject(new Error("Request timed out"));
      }
    };
    GM_xmlhttpRequest(newGMXmlHttpRequestConfig);
  });
}
const api_listAllFavorites = async (upUid) => {
  const res = await request("/x/v3/fav/folder/created/list-all", "GET", {
    up_mid: upUid
  });
  if (res.code !== 0) {
    throw new Error(res.message);
  }
  return res.data.list;
};
const api_sortFavorites = async (favoriteIdList) => {
  return xhrRequest("/x/v3/fav/folder/sort", "POST", {
    sort: favoriteIdList.toString(),
    csrf: requestConfig.csrf
  });
};
const getReadFavouriteList = async (userUid) => {
  const favoriteList = await api_listAllFavorites(userUid);
  const favouriteTitle = getFavouriteTitle();
  const readFavouriteList = favoriteList.filter(
    (favoriteInfo) => {
      return favoriteInfo.title.match(new RegExp(`^${favouriteTitle}\\d+$`));
    }
  );
  readFavouriteList.sort((a, b) => {
    const aIndex = Number(a.title.slice(favouriteTitle.length));
    const bIndex = Number(b.title.slice(favouriteTitle.length));
    return bIndex - aIndex;
  });
  return readFavouriteList;
};
const menuList = [
  {
    title: "输入您的uid",
    onClick: async () => {
      const uid = prompt(
        "请输入您的用户uid (默认将从页面中获取uid)\n如果设置了用户uid会让脚本响应速度更快, 不用等待页面载入获取uid\n(如果您不知道uid是什么, 请不要随意输入)\n(用户uid是您的主页上网址的一串数字 'https://space.bilibili.com/<uid>')",
        await getUserUid()
      );
      if (!uid) {
        return;
      }
      setUserUid(uid);
    }
  },
  {
    title: "设置收藏夹标题",
    onClick: () => {
      if (hasFavouriteTitle()) {
        setFavouriteTitle(getFavouriteTitle());
      }
      const title = prompt(
        "请输入收藏夹标题 (默认使用 'fun'作为收藏夹标题)\n",
        getFavouriteTitle()
      );
      if (!title) {
        return;
      }
      setFavouriteTitle(title);
    }
  }
];
const registerMenu = () => {
  menuList.forEach((menuInfo) => {
    const { title, onClick } = menuInfo;
    GM_registerMenuCommand(title, onClick);
  });
};
const config = {
  MAX_MEDIA_COUNT: 1e3
};
const checkFavoriteIsFull = (favoriteInfo) => {
  return favoriteInfo.media_count === config.MAX_MEDIA_COUNT;
};
const getVideoAvId = () => {
  const urlPathNameList = new URL(window.location.href).pathname.split("/");
  let videoId = urlPathNameList.find((urlPathName) => urlPathName.startsWith("BV1") || urlPathName.startsWith("av"));
  if (!videoId) {
    throw new Error("没有获取到视频id");
  }
  if (videoId.startsWith("BV1")) {
    videoId = String(bvToAv(videoId));
  }
  if (videoId.startsWith("av")) {
    videoId = videoId.slice(2);
  }
  return videoId;
};
const addVideoToFavorite = async (videoId, latestFavorite) => {
  const latestFavoriteId = String(latestFavorite.id);
  const res = await api_collectVideoToFavorite(videoId, latestFavoriteId);
  const successfullyAdd = (res == null ? void 0 : res.success_num) === 0;
  if (!successfullyAdd) {
    return;
  }
  console.log(`当前视频已添加至收藏夹 [${latestFavorite.title}]`);
};
const createNewFavorite = (title) => {
  console.log("创建新收藏夹:", title);
  return api_createFavorites(title);
};
const sortOlderFavoritesToLast = async (userUid) => {
  const favoriteList = await api_listAllFavorites(userUid);
  const favoriteTitle = getFavouriteTitle();
  let readFavouriteList = favoriteList.filter((favoriteInfo) => {
    return favoriteInfo.title.startsWith(favoriteTitle);
  });
  let otherFavouriteList = favoriteList.filter((favoriteInfo) => {
    return !favoriteInfo.title.startsWith(favoriteTitle);
  });
  readFavouriteList.sort((a, b) => {
    const aIndex = Number(a.title.slice(favoriteTitle.length));
    const bIndex = Number(b.title.slice(favoriteTitle.length));
    return bIndex - aIndex;
  });
  if (readFavouriteList[0].media_count >= config.MAX_MEDIA_COUNT) {
    throw new Error("The latest favorite folder is full.");
  }
  const latestFavourite = readFavouriteList[0];
  readFavouriteList = readFavouriteList.slice(1);
  const defaultFavourite = otherFavouriteList[0];
  otherFavouriteList = otherFavouriteList.slice(1);
  const newFavoriteIdList = [
    defaultFavourite,
    latestFavourite,
    ...otherFavouriteList,
    ...readFavouriteList
  ].map((info) => info.id);
  api_sortFavorites(newFavoriteIdList);
};
const api_isFavorVideo = () => {
  return request("/x/v2/fav/video/favoured", "GET", {
    aid: getVideoAvId()
  }).then((res) => {
    if (res.code !== 0) {
      throw new Error(res.message);
    }
    return res.data.favoured;
  });
};
const autoAddVideoToFavourites = async () => {
  let isFavorVideo = await api_isFavorVideo();
  console.log("当前视频已经被收藏:", isFavorVideo, `av${getVideoAvId()}`);
  if (isFavorVideo) {
    return;
  }
  const userUid = await getUserUid();
  if (!userUid) {
    throw new Error("获取用户uid失败");
  }
  const readFavouriteList = await getReadFavouriteList(userUid);
  if (!readFavouriteList.length) {
    const favoriteTitle = getFavouriteTitle();
    await createNewFavorite(favoriteTitle + "1");
    await autoAddVideoToFavourites();
    return;
  }
  const videoId = getVideoAvId();
  const latestFavourite = readFavouriteList[0];
  const isFullInFavorite = checkFavoriteIsFull(readFavouriteList[0]);
  if (!isFullInFavorite) {
    await addVideoToFavorite(videoId, latestFavourite);
  }
  if (isFullInFavorite) {
    const favoriteTitle = getFavouriteTitle();
    const latestFavouriteId = Number(latestFavourite.title.slice(favoriteTitle.length));
    await createNewFavorite(`${favoriteTitle}${latestFavouriteId + 1}`);
    await sleep(1);
    await sortOlderFavoritesToLast(userUid);
    await autoAddVideoToFavourites();
    return;
  }
  isFavorVideo = await api_isFavorVideo();
  if (!isFavorVideo) {
    throw new Error("收藏失败");
  }
  const favButtonSelector = ".video-fav.video-toolbar-left-item:not(.on)";
  const favButtonDom = await getElement(document, favButtonSelector);
  if (favButtonDom) {
    favButtonDom.classList.add("on");
  }
};
!checkScriptCatEnvironment() && registerMenu();
autoAddVideoToFavourites();
freshListenerPushState(async () => {
  console.log("page change");
  await autoAddVideoToFavourites();
}, 5);
