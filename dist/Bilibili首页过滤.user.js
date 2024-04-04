// ==UserScript==
// @name	Bilibili首页过滤
// @version	0.1.3
// @license	GPL-3
// @namespace	https://github.com/AliubYiero/TamperMonkeyScripts
// @run-at	document-idle
// @author	Yiero
// @homepage	https://github.com/AliubYiero/TamperMonkeyScripts
// @description	过滤首页已推荐视频, 指定UP主/关键词/营销号屏蔽. 
// @match	https://www.bilibili.com/
// @grant	GM_addStyle
// @grant	GM_setValue
// @grant	GM_getValue
// @grant	GM_deleteValue
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

class ElementDisplay {
    static show(Dom, displayMode = "block") {
        Dom.style.display = displayMode;
    }
    static hide(Dom) {
        Dom.style.display = "none";
    }
}

const observeContainerLoad = async () => await (async (selector, options = {}) => {
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
})(".recommended-container_floor-aside > .container"), _useReadVideoStore = class _useReadVideoStore {
    constructor() {
        __publicField(this, "localData"), __publicField(this, "STORE_NAME", "ReadVideoIdList"), 
        __publicField(this, "setToDatabase", function(callback, timeoutPerSecond) {
            let timer;
            return function() {
                timer && clearTimeout(timer), timer = window.setTimeout((() => {
                    callback.apply(window, arguments);
                }), 1e3 * timeoutPerSecond);
            };
        }(GM_setValue, 3)), this.localData = this.getFromDatabase();
    }
    static getInstance() {
        return this.instance || (this.instance = new _useReadVideoStore), this.instance;
    }
    compare(bvId) {
        const {firstAlpha: firstAlpha, fullAlpha: fullAlpha} = this.splitVideoId(bvId);
        return (this.localData.get(firstAlpha) || new Set).has(fullAlpha);
    }
    delete() {
        GM_deleteValue(this.STORE_NAME), this.localData = this.getFromDatabase();
    }
    set(bvId) {
        var _a;
        const {firstAlpha: firstAlpha, fullAlpha: fullAlpha} = this.splitVideoId(bvId);
        return !this.compare(bvId) && (this.localData.has(firstAlpha) || this.localData.set(firstAlpha, new Set), 
        null == (_a = this.localData.get(firstAlpha)) || _a.add(fullAlpha), this.setToDatabase(this.STORE_NAME, this.show()), 
        !0);
    }
    show() {
        return Array.from(this.localData).map((([key, set]) => [ key, Array.from(set) ]));
    }
    splitVideoId(bvId) {
        const fullAlpha = bvId.slice(3);
        return {
            firstAlpha: fullAlpha.slice(0, 1),
            fullAlpha: fullAlpha
        };
    }
    getFromDatabase() {
        const data = GM_getValue(this.STORE_NAME, []);
        return Array.isArray(data) ? new Map(data.map((([key, array]) => [ key, new Set(array) ]))) : new Map(Object.entries(data).map((([key, array]) => [ key, new Set(array) ])));
    }
};

__publicField(_useReadVideoStore, "instance");

let useReadVideoStore = _useReadVideoStore;

const filterChain = [ videoInfo => {
    const {bvid: bvid} = videoInfo, readVideoStore = useReadVideoStore.getInstance(), existVideoId = readVideoStore.compare(bvid);
    return bvid.slice(3), !existVideoId && readVideoStore.set(bvid), existVideoId;
} ], listenVideoCardLoad = () => {
    EventListener.listen((async element => {
        const videoId = (videoCardDom => {
            const linkDom = videoCardDom.querySelector('a[href^="https://www.bilibili.com/video/"]');
            return linkDom && new URL(linkDom.href).pathname.split("/")[2] || "";
        })(element);
        if (!videoId) return;
        var videoBVId;
        (videoInfo => filterChain.some((filter => filter(videoInfo))))(await (videoBVId = videoId, 
        fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${videoBVId}`).then((res => res.json())).then((res => {
            if (0 === res.code) return res.data;
            console.error("\u8bf7\u6c42\u89c6\u9891\u4fe1\u606f\u9519\u8bef: ", videoBVId);
        })))) && (console.info("[bilibili-index-video-filter] \u6ee1\u8db3\u6761\u4ef6, \u9690\u85cf\u5143\u7d20", element), 
        ElementDisplay.hide(element));
    }));
}, init = async () => {
    const element = await observeContainerLoad();
    listenVideoCardLoad(), (videoContainer => {
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
    })(element);
};

(async () => {
    console.info("[bilibili-index-video-filter] \u5f53\u524d\u5df2\u770b\u89c6\u9891\u6570\u636e\u5e93 (size: %sKB): ", Math.ceil(JSON.stringify(useReadVideoStore.getInstance().show()).length / 1024), useReadVideoStore.getInstance().show()), 
    await init();
})();
