// ==UserScript==
// @name		蜜柑计划下载助手
// @name:en		Mikan Download Assistant
// @description		批量获取整个季度番剧的磁链
// @description:en		批量获取整个季度番剧的磁链.
// @author		Yiero
// @version		1.0.0
// @match		https://cheny.asia/Home/Bangumi/*
// @license		GPL
// @icon		https://cheny.asia/favicon.ico
// @run-at		document-idle
// @grant		GM_addElement
// @grant		GM_addStyle
// @grant		GM_setClipboard
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @require		https://cdn.bootcdn.net/ajax/libs//sweetalert2/11.7.27/sweetalert2.min.js
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

document.querySelector.bind(document);

const getEls = document.querySelectorAll.bind(document);

(async () => {
    var _a;
    await elementWaiter("#sk-footer", {
        delayPerSecond: 1
    });
    const domListObject = {
        subtitleGroupList: Array.from(getEls(".subgroup-text")),
        subtitleGroupAnimateList: Array.from(getEls(".table.table-striped.tbl-border.fadeIn"))
    };
    const subtitleGroupMap = new Map;
    for (let i = 0; i < domListObject.subtitleGroupList.length; i++) {
        const subtitleGroup = domListObject.subtitleGroupList[i];
        let subtitleGroupAnimateTable = domListObject.subtitleGroupAnimateList[i];
        if ((_a = subtitleGroupAnimateTable.nextElementSibling) == null ? void 0 : _a.classList.contains("episode-expand")) {
            const moreItemBtn = subtitleGroupAnimateTable.nextElementSibling;
            moreItemBtn.click();
            subtitleGroupAnimateTable = moreItemBtn.previousElementSibling;
        }
        subtitleGroupMap.set(subtitleGroup, subtitleGroupAnimateTable);
    }
    const animationLinkStringMap = new Map;
    for (let entry of subtitleGroupMap.entries()) {
        const subtitleGroup = entry[0];
        const subtitleGroupAnimateTable = entry[1];
        const linkString = Array.from(subtitleGroupAnimateTable.querySelectorAll(".js-magnet.magnet-link")).reduce(((result, content) => `${result}\n${content.dataset.clipboardText}`), "");
        animationLinkStringMap.set(subtitleGroup, linkString);
    }
    function copyBtnGenerator(parent, linksString) {
        const btn = GM_addElement(parent, "a", {
            href: "javascript:;",
            class: "mikan-copy-all-links subgroup-subscribe",
            textContent: "\u590d\u5236\u6240\u6709\u94fe\u63a5"
        });
        btn.addEventListener("click", (e => {
            e.preventDefault();
            GM_setClipboard(linksString);
            Swal.fire("\u5168\u90e8\u94fe\u63a5\u5df2\u590d\u5236\u5230\u526a\u5207\u677f\u4e2d");
        }));
        return btn;
    }
    for (let entry of animationLinkStringMap.entries()) {
        const subtitleGroup = entry[0];
        const linksString = entry[1];
        copyBtnGenerator(subtitleGroup, linksString);
    }
})();
