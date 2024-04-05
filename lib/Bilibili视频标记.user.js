// ==UserScript==
// @name	Bilibili视频标记
// @version	0.2.0-b
// @license	GPL-3
// @namespace	https://github.com/AliubYiero/TamperMonkeyScripts
// @run-at	document-idle
// @author	Yiero
// @homepage	https://github.com/AliubYiero/TamperMonkeyScripts
// @description	通过收藏夹中的视频判断视频是否已看
// @match	https://www.bilibili.com/*
// @match	https://www.bilibili.com/video/*
// @grant	GM_addStyle
// @icon	https://www.bilibili.com/favicon.ico
// ==/UserScript==


var __defProp = Object.defineProperty, __publicField = (obj, key, value) => (((obj, key, value) => {
    key in obj ? __defProp(obj, key, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: value
    }) : obj[key] = value;
})(obj, "symbol" != typeof key ? key + "" : key, value), value);

const requestConfig_baseURL = "https://api.bilibili.com", xhrRequest = (new URLSearchParams(document.cookie.split("; ").join("&")).get("bili_jct"), 
(url, method, option = {}) => {
    url.startsWith("http") || (url = requestConfig_baseURL + url), option.parma && (url += "?" + new URLSearchParams(option.parma).toString());
    const xhr = new XMLHttpRequest;
    return xhr.open(method, url), xhr.withCredentials = !0, xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
    new Promise(((resolve, reject) => {
        xhr.addEventListener("load", (() => {
            const response = JSON.parse(xhr.response);
            return 0 !== response.code ? reject(response.message) : resolve(response.data);
        })), xhr.addEventListener("error", (() => reject(xhr.status))), xhr.send(new URLSearchParams(option.data).toString());
    }));
}), getAllFavoriteVideoIdList = async () => {
    const userId = (() => {
        const userIdCookie = document.cookie.split("; ").find((item => item.startsWith("DedeUserID")));
        if (!userIdCookie) throw new Error("\u672a\u627e\u5230\u7528\u6237id");
        return Number(userIdCookie.split("=")[1]);
    })(), favoriteMlidList = await (async upUid => (await xhrRequest("/x/v3/fav/folder/created/list-all", "GET", {
        parma: {
            up_mid: upUid
        }
    })).list)(userId).then((res => res.map((item => item.id)))), videoIdMap = new Map;
    for (let favoriteId of favoriteMlidList) await (media_id = favoriteId, xhrRequest("/x/v3/fav/resource/ids", "GET", {
        parma: {
            media_id: media_id,
            platform: "web"
        }
    })).then((favoriteIdInfoList => {
        favoriteIdInfoList.forEach((item => {
            const videoId = item.bvid.slice(3), videoIdPrefix = videoId.slice(0, 1);
            videoIdMap.has(videoIdPrefix) || videoIdMap.set(videoIdPrefix, new Set), videoIdMap.get(videoIdPrefix).add(videoId);
        }));
    }));
    var media_id;
    return videoIdMap;
}, _useWatchedVideoIdListStorage = class _useWatchedVideoIdListStorage {
    constructor() {
        __publicField(this, "videoIdMap", new Map);
    }
    static getInstance() {
        return this.instance || (this.instance = new _useWatchedVideoIdListStorage), this.instance;
    }
    show() {
        return this.videoIdMap;
    }
    existVideoId(videoBvId) {
        const {videoId: videoId, videoIdPrefix: videoIdPrefix} = this.handleVideoIdPrefix(videoBvId);
        if (!this.videoIdMap.has(videoIdPrefix)) return !1;
        const videoSet = this.videoIdMap.get(videoIdPrefix);
        return videoSet.has(videoId);
    }
    set(videoBvId) {
        const {videoId: videoId, videoIdPrefix: videoIdPrefix} = this.handleVideoIdPrefix(videoBvId);
        this.videoIdMap.has(videoIdPrefix) || this.videoIdMap.set(videoIdPrefix, new Set);
        this.videoIdMap.get(videoIdPrefix).add(videoId);
    }
    async init() {
        this.videoIdMap = await getAllFavoriteVideoIdList();
    }
    handleVideoIdPrefix(videoId) {
        return {
            videoId: videoId.slice(3),
            videoIdPrefix: videoId.slice(3, 4)
        };
    }
};

__publicField(_useWatchedVideoIdListStorage, "instance");

let useWatchedVideoIdListStorage = _useWatchedVideoIdListStorage;

const urlModuleMapper = {
    "https://www.bilibili.com/": "index",
    "https://t.bilibili.com/": "dynamic",
    "https://www.bilibili.com/video/*": "video"
};

class EventListener {
    static push(value) {
        window.dispatchEvent(new CustomEvent(this.EVENT_NAME, {
            detail: value
        }));
    }
    static listen(callback) {
        window.addEventListener(this.EVENT_NAME, (e => {
            const element = e.detail;
            callback(element);
        }));
    }
}

__publicField(EventListener, "EVENT_NAME", "ElementUpdate");

const elementWaiter = async (selector, options = {}) => {
    const {father: father = document, timeoutPerSecond: timeoutPerSecond = 20, delayPerSecond: delayPerSecond = .3} = options;
    let resolve, reject;
    const promise = new Promise(((res, rej) => {
        resolve = res, reject = rej;
    })), element = father.querySelector(selector);
    if (element) return setTimeout((() => {
        resolve(element);
    }), 1e3 * delayPerSecond), promise;
    let timer = window.setTimeout((() => {
        clearTimeout(timer), reject(new Error(`\u7b49\u5f85\u5143\u7d20 ${selector} \u8d85\u65f6`));
    }), 1e3 * timeoutPerSecond);
    const observer = new MutationObserver((mutationsList => {
        var _a;
        for (let mutation of mutationsList) for (let addedNode of mutation.addedNodes) {
            if (addedNode.nodeType !== Node.ELEMENT_NODE) return;
            const element2 = null == (_a = addedNode.parentNode) ? void 0 : _a.querySelector(selector);
            if (!element2) return;
            clearTimeout(timer), setTimeout((() => {
                resolve(element2);
            }), 1e3 * delayPerSecond), observer.disconnect();
        }
    }));
    return observer.observe(father, {
        childList: !0,
        subtree: !0
    }), promise;
}, triggerVideoCardLoad = () => {
    const handleClickVideoCard = element => {
        element.classList.contains("bili-video-card") || !element.parentElement ? element.classList.contains("is-not-watched") && (element.classList.remove("is-not-watched"), 
        element.classList.add("is-watched")) : handleClickVideoCard(element.parentElement);
    };
    GM_addStyle('\n.bili-video-card.is-rcmd.is-watched {\n\topacity: .5\n}\n.bili-video-card.is-rcmd.watched-item::after {\n\tposition: absolute;\n\ttop: 5px;\n\tleft: 5px;\n\t\n\tfont-size: 13px;\n\tpadding: 3px 8px;\n\tcolor: #fff;\n\tfont-weight: 700;\n\tborder-radius: 4px;\n\tz-index: 20;\n}\n.bili-video-card.is-rcmd.is-watched::after {\n\tcontent: "\u5df2\u770b";\n\tbackground-color: hsla(0, 0%, 60%, .77);\n}\n.bili-video-card.is-rcmd.is-not-watched::after {\n\tcontent: "\u672a\u770b";\n\tbackground-color: rgba(3, 169, 244, .77);\n}\n'), 
    EventListener.listen((async element => {
        element.addEventListener("mousedown", (e => {
            2 !== e.button && handleClickVideoCard(e.target);
        })), element.classList.add("watched-item");
        const linkDom = element.querySelector('a[href^="https://www.bilibili.com/video/BV1"]');
        if (!linkDom) return;
        const bvId = linkDom.href.split("/").find((item => item.startsWith("BV1"))), isWatched = useWatchedVideoIdListStorage.getInstance().existVideoId(bvId);
        element.classList.add(isWatched ? "is-watched" : "is-not-watched");
    }));
}, listenIndex = async () => {
    const videoContainer = await (async () => await elementWaiter(".recommended-container_floor-aside > .container"))();
    triggerVideoCardLoad(), (videoContainer => {
        const videoCardTokenValueList = [ "bili-video-card is-rcmd" ];
        videoCardTokenValueList.map((token => {
            const selector = "." + token.split(" ").join(".");
            return Array.from(document.querySelectorAll(selector));
        })).flat().forEach((element => {
            EventListener.push(element);
        })), new MutationObserver((mutations => {
            mutations.forEach((mutation => {
                for (let addedNode of mutation.addedNodes) {
                    if (addedNode.nodeType !== Node.ELEMENT_NODE || !videoCardTokenValueList.includes(addedNode.classList.value)) return;
                    EventListener.push(addedNode);
                }
            }));
        })).observe(videoContainer, {
            childList: !0
        });
    })(videoContainer);
}, selectorConfig_titleSelector = ".video-info-detail-list.video-info-detail-content", listenVideo = async () => {
    var selector;
    selector = selectorConfig_titleSelector, GM_addStyle(`\n${selector}.watched-item::after{\n    padding: 3px 8px;\n    color: #fff;\n    font-weight: 700;\n    border-radius: 5px;\n    margin-left: 12px;\n}\n${selector}.is-watched::after{\n    content: "\u5df2\u770b";\n    background-color: hsla(0, 0%, 60%, .77);\n}\n${selector}.is-watching::after{\n    content: "\u89c2\u770b\u4e2d";\n    background-color: rgba(3, 169, 244, .77);\n}\n\t`);
    const videoTitleDom = await (async () => {
        const selector = selectorConfig_titleSelector;
        return await elementWaiter(selector, {
            delayPerSecond: .3
        });
    })();
    await (async videoTitleDom => {
        const metaLinkDom = document.querySelector('meta[itemprop="url"][content^="https://www.bilibili.com/video/BV1"]');
        if (!metaLinkDom) throw new Error("\u5f53\u524d\u9875\u9762\u4e0d\u662f\u89c6\u9891\u9875");
        const videoId = metaLinkDom.content.split("/").find((item => item.startsWith("BV1"))), isRead = useWatchedVideoIdListStorage.getInstance().existVideoId(videoId);
        videoTitleDom.classList.add("watched-item"), videoTitleDom.classList.add(isRead ? "is-watched" : "is-watching");
    })(videoTitleDom);
};

(async () => {
    const currentUrl = (() => {
        const originURL = new URL(document.URL), cleanURL = originURL.origin + originURL.pathname;
        let currentModule = "";
        for (let urlModuleMapperKey in urlModuleMapper) if (urlModuleMapperKey.endsWith("*") ? new RegExp(urlModuleMapperKey.slice(0, -1)).test(cleanURL) && (currentModule = urlModuleMapper[urlModuleMapperKey]) : urlModuleMapperKey === cleanURL && (currentModule = urlModuleMapper[urlModuleMapperKey]), 
        currentModule) break;
        return currentModule || void 0;
    })();
    if (!currentUrl) return;
    await useWatchedVideoIdListStorage.getInstance().init();
    const urlCallbackMapper = {
        index: listenIndex.bind(null),
        video: listenVideo.bind(null)
    };
    for (let urlCallbackMapperKey in urlCallbackMapper) if (urlCallbackMapperKey === currentUrl) return void (await urlCallbackMapper[urlCallbackMapperKey]());
})();
