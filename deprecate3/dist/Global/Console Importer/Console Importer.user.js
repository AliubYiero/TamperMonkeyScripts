// ==UserScript==
// @name		Console Importer
// @name:en		Console Importer
// @description		通过控制台导入 JS / CSS 库
// @description:en		Import JavaScript or CSS Library in browser developer tool.
// @author		Yiero
// @version		1.2.1
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
// ==/UserScript==
var __defProp = Object.defineProperty;

var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: value
}) : obj[key] = value;

var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};

class Info {
    constructor(projectName) {
        __publicField(this, "projectName");
        __publicField(this, "header");
        this.projectName = projectName;
        this.header = `[${projectName}]`;
    }
    log(...msg) {
        (() => {})(...this.contentInfo(...msg));
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
        return [ this.header, ...msg ];
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
        GMXmlHttpRequestConfig.data = {
            ...paramOrData
        };
    }
    return new Promise(((resolve, reject) => {
        const newGMXmlHttpRequestConfig = {
            timeout: 2e4,
            ...GMXmlHttpRequestConfig,
            url: url,
            method: method,
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
    }));
}

const api_getBootcdnLib = async searchLibrary => {
    const bootcdnApiDetailDomain = "https://api.bootcdn.cn/libraries/";
    const bootcdnApiDomain = "https://cdn.bootcdn.net/ajax/libs/";
    const res = await GMHttpRequest(bootcdnApiDetailDomain + searchLibrary);
    if (res.origin.status !== 200) {
        return Promise.reject("Can not find library from bootcdn...");
    } else {
        const {filename: filename, version: version} = res.parse[0];
        const link = `${bootcdnApiDomain}/${searchLibrary}/${version}/${filename}`;
        print.log("Found library from bootcdn: ", link);
        return Promise.resolve(link);
    }
};

async function getLibrary(libName, requestFunction, searchLibrary, isContainScriptTag) {
    const reSearchLibrary = searchLibrary.endsWith(".js") ? searchLibrary.replace(".js", "") : searchLibrary + ".js";
    const searchLibraryList = [ searchLibrary, reSearchLibrary, searchLibrary.toLowerCase(), reSearchLibrary.toLowerCase() ];
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

const urlList = new Map;

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
        print.error(`\u83b7\u53d6\u6570\u636e\u5931\u8d25...\n\u5f53\u524d\u9875\u9762\u4e2d\u5df2\u5b58\u5728\u5e93 [${url}]`);
        print.groupEnd();
        return;
    }
    print.info("\u6b63\u5728\u52a0\u8f7d\u6570\u636e...");
    GMHttpRequest(url).then((res => {
        if (res.status === 404) {
            print.error(`\u83b7\u53d6\u6570\u636e\u5931\u8d25...\nError: page not found, request an error url: ${url}`);
            print.groupEnd();
            return;
        } else if (res.status !== 200) {
            print.error(`\u83b7\u53d6\u6570\u636e\u5931\u8d25...\nError: ${res.responseText}`);
            print.groupEnd();
            return;
        }
        const scriptText = res.responseText;
        const isScript = !isCSS(url);
        const displayObj = {
            tag: isScript ? "script" : "style",
            content: isScript ? "\u811a\u672c" : "\u6837\u5f0f\u8868"
        };
        print.info(`\u6210\u529f\u83b7\u53d6${displayObj.content}, \u6b63\u5728\u8f7d\u5165\u9875\u9762...`);
        const element = GM_addElement(document.head, displayObj.tag, {
            textContent: scriptText
        });
        urlList.set(url, element);
        print.info(`${displayObj.content}\u8f7d\u5165\u6210\u529f.\n${url}`);
        print.groupEnd();
    }), (error => {
        print.error("\u83b7\u53d6\u6570\u636e\u5931\u8d25...\nError: ", error.error);
        print.groupEnd();
    }));
}

async function uninstallLibrary(url) {
    print.group();
    const element = urlList.get(await getUrl(url));
    if (!element) {
        print.warn("\u5f53\u524d\u9875\u9762\u672a\u5b89\u88c5\u5e93: \n", url);
        print.groupEnd();
        return;
    }
    element == null ? void 0 : element.remove();
    print.info(`\u5f53\u524d\u5e93\u5df2\u5220\u9664: \n`, url);
    urlList.delete(url);
    print.groupEnd();
}

class GMStorage {
    constructor(key) {
        __publicField(this, "key");
        this.key = key;
    }
    static get(key, defaultValue = "") {
        return GM_getValue(key, defaultValue);
    }
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
    get(defaultValue = null) {
        return GM_getValue(this.key, defaultValue);
    }
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
        print.error(`\u4e0d\u5b58\u5728\u5e93 ${libName}...`);
        return;
    }
    libStorage.set(libName);
    print.log("\u6210\u529f\u5207\u6362\u5230cdn\u5e93: ", libName);
}

const libStorage = new GMStorage("lib");

const print = new Info("Console Importer");

(() => {
    unsafeWindow.$i = installLibrary;
    unsafeWindow.$set = changeRequestLib;
    unsafeWindow.$o = currentCdnLibMap[libStorage.get("bootcdn")];
    unsafeWindow.$ui = uninstallLibrary;
})();
