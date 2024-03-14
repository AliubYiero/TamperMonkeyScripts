// ==UserScript==
// @name		SubsidiaryBiliBiliSignManually
// @description		手动标记拓展
// @author		Yiero
// @version		1.0.1
// @match		https://www.bilibili.com/video/*
// @grant		GM_registerMenuCommand
// @grant		GM_unregisterMenuCommand
// @run-at		document-idle
// @icon		https://www.bilibili.com/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @license		GPL
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

function freshListenerPushState(callback, s = 1) {
    let _pushState = window.history.pushState;
    window.history.pushState = function() {
        setTimeout(callback, s * 1e3);
        return _pushState.apply(this, arguments);
    };
}

class EntryBranch {
    constructor() {
        __publicField(this, "branchList", []);
    }
    add(condition, callback) {
        if (typeof condition === "boolean") {
            this.branchList.push([ () => condition, callback ]);
        } else {
            this.branchList.push([ condition, callback ]);
        }
        return this;
    }
    default(callback) {
        this.add(true, callback);
        return this;
    }
    run() {
        const entry = this.branchList.find((entry2 => entry2[0]()));
        if (entry) {
            new Info("EntryBranch").log("\u8fdb\u5165\u5206\u652f", entry);
            entry[1]();
        }
    }
}

function elementWaiter(selector, config = document.body, timeoutPerSecond = 0, delayPerSecond = 0) {
    let parent = document.body;
    if (config && "parent" in config) {
        delayPerSecond = config.delayPerSecond || 0;
        timeoutPerSecond = config.timeoutPerSecond || 0;
        parent = config.parent || document.body;
    }
    const entryBranch = new EntryBranch;
    return new Promise(((resolve, reject) => {
        function returnElement(element) {
            if (!element) {
                reject(new Error("void Element"));
                return;
            }
            setTimeout((() => {
                dispatchEvent(new CustomEvent("getElement", {
                    detail: element
                }));
                resolve(element);
            }), delayPerSecond * 1e3);
        }
        entryBranch.add((() => !!document.querySelector(selector)), (() => {
            returnElement(document.querySelector(selector));
        })).add((() => !!MutationObserver), (() => {
            const timer = timeoutPerSecond && window.setTimeout((() => {
                observer.disconnect();
                returnElement();
            }), timeoutPerSecond * 1e3);
            const observer = new MutationObserver(observeElementCallback);
            function observeElementCallback(mutations) {
                mutations.forEach((mutation => {
                    mutation.addedNodes.forEach((addNode => {
                        if (!(addNode instanceof HTMLElement)) {
                            return;
                        }
                        const element = addNode.matches(selector) ? addNode : addNode.querySelector(selector);
                        if (element) {
                            timer && clearTimeout(timer);
                            returnElement(element);
                        }
                    }));
                }));
            }
            observer.observe(parent, {
                subtree: true,
                childList: true
            });
        })).default((() => {
            const intervalDelay = 500;
            let intervalCounter = 0;
            const maxIntervalCounter = Math.ceil((timeoutPerSecond * 1e3 || 20 * 1e3) / intervalDelay);
            const timer = window.setInterval((() => {
                if (++intervalCounter > maxIntervalCounter) {
                    clearInterval(timer);
                    returnElement();
                    return;
                }
                const element = parent.querySelector(selector);
                if (element) {
                    clearInterval(timer);
                    returnElement(element);
                }
            }), intervalDelay);
        })).run();
    }));
}

const getEl = document.querySelector.bind(document);

document.querySelectorAll.bind(document);

async function clickElement(selector, description, timeoutPerSecond = 20, delayPerSecond = 1) {
    await elementWaiter(selector, {
        timeoutPerSecond: timeoutPerSecond,
        delayPerSecond: delayPerSecond
    });
    const element = getEl(selector);
    if (element) {
        description ? print.log(description) : print.log("\u70b9\u51fb\u5143\u7d20", element);
        element.click();
    } else {
        print.log("\u83b7\u53d6\u4e0d\u5230\u5143\u7d20 / \u83b7\u53d6\u5143\u7d20\u8d85\u65f6", selector);
    }
}

class GMConfigMenu {
    constructor(callback) {
        __publicField(this, "menuId", 0);
        __publicField(this, "callback");
        this.callback = callback;
    }
    open(title) {
        if (this.menuId) {
            this.close();
        }
        this.menuId = GM_registerMenuCommand(title, this.callback);
    }
    close() {
        GM_unregisterMenuCommand(this.menuId);
        this.menuId = 0;
    }
}

async function clickInputElement(selector, description) {
    await elementWaiter(selector, {
        timeoutPerSecond: 20,
        delayPerSecond: 1
    });
    const element = getEl(selector);
    if (element && element.checked) {
        description ? print.log(description) : print.log("\u70b9\u51fb\u5143\u7d20", element);
        element.click();
    } else if (element) {
        print.log("\u5f39\u5e55\u5df2\u5173\u95ed", selector);
    } else {
        print.log("\u83b7\u53d6\u4e0d\u5230\u5143\u7d20 / \u83b7\u53d6\u5143\u7d20\u8d85\u65f6", selector);
    }
}

const print = new Info("SubsidiaryBiliBiliSignManually");

async function clickEvent() {
    await clickElement(".switch-button.on", "\u5173\u95ed\u81ea\u52a8\u8fde\u64ad", 20);
    await clickInputElement(".bui-danmaku-switch-input", "\u5173\u95ed\u5f39\u5e55");
    await clickElement(".video-info-detail > .btnNotView", "\u70b9\u51fb\u89c2\u770b\u6807\u8bb0\u6309\u94ae");
    await clickElement(".be-quick-favorite.video-toolbar-left-item:not(.on)", "\u70b9\u51fb\u5feb\u901f\u6536\u85cf\u6309\u94ae");
    await clickElement(".switch-button.on", "\u5173\u95ed\u81ea\u52a8\u8fde\u64ad", 20, 10);
}

(async () => {
    await clickEvent();
    freshListenerPushState((async () => {
        await clickEvent();
    }), 5);
    new GMConfigMenu((async () => {
        await clickEvent();
    })).open("\u624b\u52a8\u5173\u95ed");
})();
