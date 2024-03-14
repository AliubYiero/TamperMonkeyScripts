var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const addStyle = (cssString) => {
  GM_addStyle(cssString);
};
const tupleToObject = (keyArray, valueArray) => {
  return keyArray.reduce((obj, key, index) => {
    obj[key] = valueArray[index];
    return obj;
  }, {});
};
class GMStorage {
  constructor(key) {
    __publicField(this, "key");
    this.key = key;
  }
  /** 设置/更新键 */
  static set(key, value) {
    GM_setValue(key, value);
  }
  /** 获取值 */
  static get(key, defaultValue = null) {
    return GM_getValue(key, defaultValue);
  }
  /** 移除键 */
  static remove(key) {
    GM_deleteValue(key);
  }
  /** 设置/更新键 */
  set(value) {
    GM_setValue(this.key, value);
  }
  /** 批量设置/更新键 */
  setList(keyValueObject) {
    for (let key in keyValueObject) {
      const value = keyValueObject[key];
      GMStorage.set(key, value);
    }
  }
  /** 获取值 */
  get(defaultValue = null) {
    return GM_getValue(this.key, defaultValue);
  }
  /** 批量获取值 */
  getList(keys2, defaultValue = null) {
    const values = [];
    keys2.forEach((key) => {
      values.push(GMStorage.get(key, defaultValue));
    });
    return values;
  }
  /** 移除键 */
  remove() {
    GM_deleteValue(this.key);
  }
  /**
   * 返回所有键
   * */
  keys() {
    return GM_listValues();
  }
  /** 返回所有值 */
  values() {
    const values = [];
    const keys2 = this.keys();
    keys2.forEach((key) => {
      values.push(GMStorage.get(key));
    });
    return values;
  }
  /** 返回所有键值对对象 */
  getAll() {
    const keys2 = this.keys();
    const values = this.values();
    return tupleToObject(keys2, values);
  }
  /** 清除所有储存 */
  clear() {
    const keys2 = this.keys();
    keys2.forEach((key) => {
      GMStorage.remove(key);
    });
  }
}
const commonReadStyle = (direction) => {
  return `
    font-size: 13px;
    padding: 3px 8px;
    color: #fff;
    font-weight: 700;
    border-radius: 4px;
    
    position: absolute;
    z-index: 1;
    top: 5px;
    ${direction}: 5px;
    `;
};
function addReadStyle() {
  addStyle(`
    .is-read-left, .is-read-right {
        transition: opacity .25s ease-in-out;
        opacity: 0.3;
    }
    .is-read-left:hover, .is-read-right:hover {
        opacity: 1;
    }
    .is-not-read-left::before {
        content: '未看';
        background-color: rgba(3,169,244,.77);
        ${commonReadStyle("left")}
    }

    .is-read-left::before {
        content: '已看';
        background-color: hsla(0,0%,60%,.77);
        ${commonReadStyle("left")}
    }

    .is-not-read-right::before {
        content: '未看';
        background-color: rgba(3,169,244,.77);
        ${commonReadStyle("right")}
    }

    .is-read-right::before {
        content: '已看';
        background-color: hsla(0,0%,60%,.77);
        ${commonReadStyle("right")}
    }
`);
}
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
function getElement(parent, selector, timeoutPerMs = 0) {
  return new Promise((resolve) => {
    parent || (parent = document.body);
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
                return resolve(result);
              }
            }
          }
        }
      });
      observer.observe(parent, {
        childList: true,
        subtree: true
      });
      if (timeoutPerMs > 0) {
        timer = setTimeout(() => {
          observer.disconnect();
          return resolve(null);
        }, timeoutPerMs);
      }
    }
  });
}
const observeChildElementAdd = async (fatherElementSelector, childElementSelector, callback) => {
  const observeElement = await getElement(document.body, fatherElementSelector);
  const observer = new MutationObserver((e) => {
    e.forEach((record) => {
      var _a;
      const item = record.addedNodes[0];
      if (!item || !((_a = item == null ? void 0 : item.classList) == null ? void 0 : _a.contains(childElementSelector.replace(/^\./, "") || ""))) {
        return;
      }
      callback(item);
    });
  });
  observer.observe(observeElement, {
    childList: true
  });
};
const observeChildElementAddAll = async (fatherElementSelector, childElementSelectorList, callback) => {
  const observeElement = await getElement(document.body, fatherElementSelector);
  const observer = new MutationObserver((e) => {
    e.forEach((record) => {
      var _a, _b;
      const item = record.addedNodes[0];
      if (Array.isArray(childElementSelectorList)) {
        for (const childElement of childElementSelectorList) {
          if (!item || !((_a = item == null ? void 0 : item.classList) == null ? void 0 : _a.contains(childElement.replace(/^\./, "") || ""))) {
            return;
          }
        }
      } else if (!item || !((_b = item == null ? void 0 : item.classList) == null ? void 0 : _b.contains(childElementSelectorList.replace(/^\./, "") || ""))) {
        return;
      }
      callback(item);
    });
  });
  observer.observe(observeElement, {
    subtree: true,
    childList: true
  });
};
const observeChildTextChangeAll = async (elementSelector, callback) => {
  const observer = new MutationObserver((e) => {
    e.forEach((record) => {
      let item = record.target.parentElement;
      if (!item || !(item == null ? void 0 : item.classList.contains(elementSelector.textChangeToken.replace(/^\./, "") || ""))) {
        return;
      }
      while (item) {
        item = item.parentElement;
        if (item == null ? void 0 : item.classList.contains(elementSelector.aimToken)) {
          callback(item);
          return;
        }
      }
    });
  });
  getElement(document.body, elementSelector.father).then(
    (item) => {
      observer.observe(item, {
        subtree: true,
        characterData: true
      });
    }
  );
};
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  const request = indexedDB.open(dbName);
  request.onupgradeneeded = () => request.result.createObjectStore(storeName);
  const dbp = promisifyRequest(request);
  return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function setMany(entries, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    entries.forEach((entry) => store.put(entry[1], entry[0]));
    return promisifyRequest(store.transaction);
  });
}
function eachCursor(store, callback) {
  store.openCursor().onsuccess = function() {
    if (!this.result)
      return;
    callback(this.result);
    this.result.continue();
  };
  return promisifyRequest(store.transaction);
}
function keys(customStore = defaultGetStore()) {
  return customStore("readonly", (store) => {
    if (store.getAllKeys) {
      return promisifyRequest(store.getAllKeys());
    }
    const items = [];
    return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
  });
}
class StorageData {
  constructor() {
    __publicField(this, "store");
    __publicField(this, "keys", /* @__PURE__ */ new Set());
    this.store = createStore("animax-post", "post-view-history");
    (async () => {
      this.keys = await this.getKeys();
    })();
  }
  /** 获取所有的键值 */
  getKeys() {
    return new Promise((resolve) => {
      keys(this.store).then(
        (keys2) => {
          resolve(new Set(keys2));
        }
      );
    });
  }
  /** 设置新键值 */
  setValues(values) {
    const entries = [];
    values.forEach((value) => {
      entries.push([void 0, { id: value, date: (/* @__PURE__ */ new Date()).getTime() }]);
    });
    setMany(entries, this.store);
  }
  /**
   * 解析链接状态
   * @param {number} link 链接id
   * @return {boolean} 当前链接是否已读
   * */
  parseLinkStatus(link) {
    return this.keys.has(link);
  }
}
const getArchiveId = (linkNodeOrlinkString) => {
  let idList;
  if (typeof linkNodeOrlinkString === "string") {
    idList = linkNodeOrlinkString.match(new RegExp("(?<=\\/)\\d+", "g"));
  } else {
    idList = linkNodeOrlinkString == null ? void 0 : linkNodeOrlinkString.href.match(new RegExp("(?<=\\/)\\d+", "g"));
  }
  if (idList) {
    return +idList[0];
  } else {
    return 0;
  }
};
function freshListenerPushState(callback, s = 1) {
  let _pushState = window.history.pushState;
  window.history.pushState = function() {
    setTimeout(callback, s * 1e3);
    return _pushState.apply(this, arguments);
  };
}
class ReadHistory {
  constructor(pageType, domSelectors, storageData) {
    __publicField(this, "pageType");
    __publicField(this, "domSelectors");
    __publicField(this, "storageData");
    this.pageType = pageType || "";
    this.domSelectors = domSelectors;
    this.storageData = storageData;
  }
  addStyle(item, postDirection, selectorList) {
    const linkSelector = selectorList.link;
    const contentSelector = selectorList.content;
    const archiveId = getArchiveId(item.querySelector(linkSelector));
    if (!archiveId) {
      return;
    }
    const contentDom = item.querySelector(contentSelector);
    const isRead = this.storageData.parseLinkStatus(archiveId);
    if (isRead) {
      contentDom.classList.remove(`is-not-read-${postDirection}`);
      contentDom.classList.add(`is-read-${postDirection}`);
    } else {
      contentDom.classList.remove(`is-read-${postDirection}`);
      contentDom.classList.add(`is-not-read-${postDirection}`);
    }
  }
  /** 解析首页 */
  parse(isBandObserver = true) {
    if (!this.pageType) {
      return;
    }
    const pageSelectorList = this.domSelectors[this.pageType];
    for (let i = 0; i < pageSelectorList.fatherList.length; i++) {
      const postDirection = i ? "right" : "left";
      const selectorList = {
        father: pageSelectorList.fatherList[i],
        childToken: pageSelectorList.childTokenList[i],
        textChangeToken: pageSelectorList.textChangeTokenList[i],
        content: pageSelectorList.contentList[i],
        link: pageSelectorList.linkList[i]
      };
      document.querySelectorAll(`.${selectorList.childToken}`).forEach((item) => {
        this.addStyle(item, postDirection, selectorList);
      });
      if (isBandObserver) {
        observeChildTextChangeAll({
          father: selectorList.father,
          aimToken: selectorList.childToken,
          textChangeToken: selectorList.textChangeToken
        }, (item) => {
          this.addStyle(item, postDirection, selectorList);
        });
        if (i) {
          observeChildElementAddAll(selectorList.father, "fade-fast-enter", (item) => {
            this.addStyle(item, postDirection, selectorList);
          });
        }
        if (this.pageType === "rank") {
          observeChildElementAdd(`${selectorList.father} .row`, ".post", (item) => {
            this.addStyle(item, postDirection, selectorList);
          });
        }
      }
    }
  }
}
class PageEvent {
  constructor(pathname, storageData) {
    __publicField(this, "pageType");
    __publicField(this, "storageData");
    this.storageData = storageData;
    let _pageType = this.judgePage(pathname);
    Object.defineProperty(this, "pageType", {
      get() {
        return _pageType;
      },
      set(pathname2) {
        const type = this.judgePage(pathname2);
        if (type) {
          _pageType = type;
        }
      }
    });
  }
  /**
   * 向本地储存中发送存储数据
   * @return {}
   * @param achieveId
   * */
  sendNewAchieve(achieveId) {
    this.storageData.keys.add(achieveId);
    localStorage.setItem("new-achieve", String(achieveId));
  }
  /**
   * 判断当前页面处于哪个子页面（主页、帖子、分类、排名）
   * @param {string} pathname
   * @return {PageType} 页面类型
   * */
  judgePage(pathname) {
    const path = pathname;
    if (path === "/") {
      return "index";
    } else if (path.match("archives")) {
      return "archive";
    } else if (path.match("category/")) {
      return "category";
    } else if (path.match("rank")) {
      return "rank";
    } else {
      return "";
    }
  }
  /**
   * 从本地存储中监听数据更改，如果存在数据更改，则重新刷新页面
   * */
  getNewAchieve(readHistory) {
    window.addEventListener("storage", (e) => {
      if (e.key === "new-achieve") {
        this.storageData.keys.add(+e.newValue);
        readHistory.parse(false);
      }
    });
  }
}
class HistoryBackup {
  constructor() {
    __publicField(this, "storage");
    this.storage = new GMStorage("CangkuHistory");
  }
  /**
   * 从GMStorage中获取值
   * */
  getFromGMStorage() {
    return this.storage.get([]);
  }
  /** 向GMStorage中进行存储 */
  saveToGMStorage(storageData) {
    const historySet = storageData.keys;
    let backupList = this.getFromGMStorage();
    if (historySet.size >= backupList.length) {
      this.storage.set([...historySet]);
    } else {
      const backupSet = /* @__PURE__ */ new Set([...backupList, ...historySet]);
      this.writeToIndexDB(backupSet);
      this.storage.set([...backupSet]);
    }
  }
  /**
   * 向IndexDb写入数据
   * */
  writeToIndexDB(backupSet) {
    const storageData = new StorageData();
    storageData.setValues(backupSet);
  }
}
const print = new Info("CangkuHistoryDisplay");
print.log("载入脚本");
(async () => {
  addReadStyle();
  let domSelectors;
  domSelectors = {
    // 首页，主卡片（>18）和侧边卡片（3）
    index: {
      fatherList: [".post-list", ".sidebar-rank-post-card"],
      childTokenList: ["post-card", "sidebar-rank-post-wrap"],
      textChangeTokenList: ["date", "text-truncate"],
      contentList: [".post-card-content", 'a[href^="/archives"]'],
      linkList: ['a[href^="/archives"]', 'a[href^="/archives"]']
    },
    archive: {
      fatherList: [".related-post-wrap", ".sidebar-rank-post-card"],
      childTokenList: ["related-post-card", "sidebar-rank-post-wrap"],
      textChangeTokenList: ["text-truncate", "text-truncate"],
      contentList: [".post-card-content", 'a[href^="/archives"]'],
      linkList: ['a[href^="/archives"]', 'a[href^="/archives"]']
    },
    category: {
      fatherList: [".category-post"],
      childTokenList: ["post-card"],
      textChangeTokenList: ["date"],
      contentList: [".post-card-content"],
      linkList: ['a[href^="/archives"]']
    },
    rank: {
      fatherList: [".rank-post"],
      childTokenList: ["post-card"],
      textChangeTokenList: ["date"],
      contentList: [".post-card-content"],
      linkList: ['a[href^="/archives"]']
    }
  };
  const storageData = new StorageData();
  const historyBackup = new HistoryBackup();
  setTimeout(() => {
    historyBackup.saveToGMStorage(storageData);
  }, 2e3);
  const pageEvent = new PageEvent(location.pathname, storageData);
  print.info("当前页面", pageEvent.pageType);
  await getElement(null, domSelectors[pageEvent.pageType].contentList[0]);
  let readHistory = new ReadHistory(pageEvent.pageType, domSelectors, storageData);
  readHistory.parse();
  if (pageEvent.pageType === "archive") {
    pageEvent.sendNewAchieve(getArchiveId(location.pathname));
  }
  pageEvent.getNewAchieve(readHistory);
  freshListenerPushState(async () => {
    pageEvent.pageType = location.pathname;
    if (pageEvent.pageType === "archive") {
      pageEvent.sendNewAchieve(getArchiveId(location.pathname));
    }
    if (readHistory.pageType !== pageEvent.pageType) {
      print.info("页面切换", pageEvent.pageType);
      await getElement(null, domSelectors[pageEvent.pageType].contentList[0]);
      readHistory.pageType = pageEvent.pageType;
      readHistory.parse();
    }
  });
})();
