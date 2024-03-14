// ==UserScript==
// @name		Console Importer
// @name:en		Console Importer
// @description		通过控制台导入 JS / CSS 库
// @description:en		Import JavaScript or CSS Library in browser developer tool.
// @author		Yiero
// @version		beta_1.2.1
// @match		https://*/*
// @license		GPL
// @icon		https://bbs.tampermonkey.net.cn/favicon.ico
// @run-at		document-body
// @grant		GM_addElement
// @grant		GM_xmlhttpRequest
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_deleteValue
// @grant		GM_listValues
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @connect		cdnjs.cloudflare.com
// @connect		cdn.bootcdn.net
// @connect		api.bootcdn.cn
// @connect		cdn.jsdelivr.net
// @connect		data.jsdelivr.com
// @require		file://D:\Code\JavaScript\2023\8-9\TamperMonkey\tampermonkey-demo\dist\Global\Console Importer\Console Importer.js
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
  group() {
    console.group(this.header);
  }
  groupEnd() {
    console.groupEnd();
  }
  contentInfo(...msg) {
    return [this.header, ...msg];
  }
}
function isCSS(url) {
  return url.endsWith("css");
}
function GMHttpRequest(url, method = "GET", paramOrData, GMXmlHttpRequestConfig = {}) {
  if (paramOrData && method === "GET") {
    const params = [];
    for (const key in paramOrData) {
      if (Object.hasOwnProperty.call(paramOrData, key)) {
        const value = paramOrData[key];
        params.push(`${key}=${JSON.stringify(value)}`);
      }
    }
    url += `?${params.join("?")}`;
  } else if (paramOrData && method === "POST") {
    GMXmlHttpRequestConfig.data = { ...paramOrData };
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
        resolve({
          parse: JSON.parse(response.responseText),
          origin: response
        });
      },
      onerror(error) {
        reject(error);
      }
    };
    GM_xmlhttpRequest(newGMXmlHttpRequestConfig);
  });
}
const api_getBootcdnLib = async (searchLibrary) => {
  const bootcdnApiDetailDomain = "https://api.bootcdn.cn/libraries/";
  const bootcdnApiDomain = "https://cdn.bootcdn.net/ajax/libs/";
  const res = await GMHttpRequest(bootcdnApiDetailDomain + searchLibrary);
  if (res.origin.status !== 200) {
    return Promise.reject("Can not find library from bootcdn...");
  } else {
    const { filename, version } = res.parse[0];
    const link = `${bootcdnApiDomain}/${searchLibrary}/${version}/${filename}`;
    print.log("Found library from bootcdn: ", link);
    return Promise.resolve(link);
  }
};
async function getLibrary(libName, requestFunction, searchLibrary, isContainScriptTag) {
  const reSearchLibrary = searchLibrary.endsWith(".js") ? searchLibrary.replace(".js", "") : searchLibrary + ".js";
  const searchLibraryList = [
    // Original input
    searchLibrary,
    // Converted original input (remove .js if present, add .js if not present)
    reSearchLibrary,
    // Lowercase of original input
    searchLibrary.toLowerCase(),
    // Lowercase of converted original input
    reSearchLibrary.toLowerCase()
  ];
  for (let i = 0; i < searchLibraryList.length; i++) {
    const searchLibrary2 = searchLibraryList[i];
    print.warn(`Trying to retrieve library from ${libName}: `, searchLibrary2);
    let link = "";
    try {
      link = await requestFunction(searchLibrary2);
    } catch (e) {
      print.error("Failed to retrieve library: ", searchLibrary2);
    }
    if (isContainScriptTag) {
      link = `<script src="${link}"><\/script>`;
    }
    if (link.startsWith("http")) {
      return link;
    }
  }
  print.error(`Could not find library from ${libName}: `, searchLibrary);
  throw new Error(`Could not find library from ${libName}: ${searchLibrary}`);
}
async function getBootcdnLibrary(searchLibrary, isContainScriptTag = false) {
  return await getLibrary("bootcdn", api_getBootcdnLib, searchLibrary, isContainScriptTag);
}
async function api_getProjectEntryPoints(searchLibrary) {
  const jsDelivrApiDetailDomain = "https://data.jsdelivr.com/v1/packages/npm/";
  const res = await GMHttpRequest(jsDelivrApiDetailDomain + searchLibrary);
  if (res.origin.status !== 200) {
    return Promise.reject("Can not find library from jsDelivr...");
  } else {
    return Promise.resolve(res.parse.versions[0].links.self);
  }
}
async function api_getJsDilivrLib(projectEntryPointLink) {
  const jsdelivrApiDomain = "https://cdn.jsdelivr.net/npm/";
  const res = await GMHttpRequest(projectEntryPointLink);
  const libLink = `${jsdelivrApiDomain}${res.parse.name}@${res.parse.version}/${res.parse.default}`;
  return Promise.resolve(libLink);
}
async function getJsDelivrLib(searchLibrary) {
  const projectEntryPointLink = await api_getProjectEntryPoints(searchLibrary);
  const result = await api_getJsDilivrLib(projectEntryPointLink);
  return Promise.resolve(result);
}
async function getJsDelivrLibrary(searchLibrary, isContainScriptTag = false) {
  return await getLibrary("jsdilivr", getJsDelivrLib, searchLibrary, isContainScriptTag);
}
const urlList = /* @__PURE__ */ new Map();
const currentCdnLibMap = {
  bootcdn: getBootcdnLibrary,
  jsdilivr: getJsDelivrLibrary
};
async function getUrl(urlOrLibrary) {
  let url;
  if (urlOrLibrary.startsWith("https")) {
    url = urlOrLibrary;
  } else {
    url = await currentCdnLibMap[libStorage.get("bootcdn")](urlOrLibrary);
  }
  return url;
}
async function installLibrary(urlOrLibrary) {
  print.group();
  const url = await getUrl(urlOrLibrary);
  if (urlList.has(url)) {
    print.error(`获取数据失败...
当前页面中已存在库 [${url}]`);
    print.groupEnd();
    return;
  }
  print.info("正在加载数据...");
  GMHttpRequest(url).then(
    (res) => {
      if (res.status === 404) {
        print.error(`获取数据失败...
Error: page not found, request an error url: ${url}`);
        print.groupEnd();
        return;
      } else if (res.status !== 200) {
        print.error(`获取数据失败...
Error: ${res.responseText}`);
        print.groupEnd();
        return;
      }
      const scriptText = res.responseText;
      const isScript = !isCSS(url);
      const displayObj = {
        tag: isScript ? "script" : "style",
        content: isScript ? "脚本" : "样式表"
      };
      print.info(`成功获取${displayObj.content}, 正在载入页面...`);
      const element = GM_addElement(
        document.head,
        displayObj.tag,
        {
          textContent: scriptText
        }
      );
      urlList.set(url, element);
      print.info(`${displayObj.content}载入成功.
${url}`);
      print.groupEnd();
    },
    (error) => {
      print.error("获取数据失败...\nError: ", error.error);
      print.groupEnd();
    }
  );
}
async function uninstallLibrary(url) {
  print.group();
  const element = urlList.get(await getUrl(url));
  if (!element) {
    print.warn("当前页面未安装库: \n", url);
    print.groupEnd();
    return;
  }
  element == null ? void 0 : element.remove();
  print.info(`当前库已删除: 
`, url);
  urlList.delete(url);
  print.groupEnd();
}
class GMStorage {
  constructor(key) {
    __publicField(this, "key");
    this.key = key;
  }
  /**
   * Get the value for a given key from the storage.
   * @param {string} key - The key to retrieve the value for.
   * @param {string} defaultValue - The default value to return if the key is not found.
   * @returns {string} - The value for the given key.
   */
  static get(key, defaultValue = "") {
    return GM_getValue(key, defaultValue);
  }
  /**
   * Sets a value in the GM storage and dispatches an event to notify listeners.
   *
   * @param key - The key to set the value for.
   * @param value - The value to set.
   */
  static set(key, value) {
    dispatchEvent(new CustomEvent("GMStorageUpdate", {
      detail: {
        newValue: value,
        oldValue: this.get(key),
        target: key
      }
    }));
    GM_setValue(key, value);
  }
  /** 设置/更新键 */
  /**
   * Sets or updates the value of the key.
   *
   * @param value - The new value to be set.
   * @returns void
   */
  set(value) {
    dispatchEvent(
      new CustomEvent("GMStorageUpdate", {
        detail: {
          newValue: value,
          oldValue: this.get(),
          target: this.key
        }
      })
    );
    GM_setValue(this.key, value);
  }
  /**
   * Get the value from GM_getValue.
   * @param defaultValue - The default value to return if the key is not found.
   * @returns The value stored in GM_getValue or the defaultValue if the key is not found.
   */
  get(defaultValue = null) {
    return GM_getValue(this.key, defaultValue);
  }
  /**
   * Remove the value associated with the key.
   */
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
function changeRequestLib(libName) {
  if (typeof libName === "number") {
    libName = Object.keys(currentCdnLibMap)[libName];
  }
  if (!libName) {
    print.error(`不存在库 ${libName}...`);
    return;
  }
  libStorage.set(libName);
  print.log("成功切换到cdn库: ", libName);
}
const libStorage = new GMStorage("lib");
const print = new Info("Console Importer");
(() => {
  unsafeWindow.$i = installLibrary;
  unsafeWindow.$set = changeRequestLib;
  unsafeWindow.$o = currentCdnLibMap[libStorage.get("bootcdn")];
  unsafeWindow.$ui = uninstallLibrary;
})();
