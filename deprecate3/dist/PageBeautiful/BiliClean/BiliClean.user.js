// ==UserScript==
// @name		Bilibili净化
// @name:en		BiliClean
// @description		Bilibili净化多余元素. 
// @description:en		Bilibili净化多余元素. 
// @author		Yiero
// @match		https://*.bilibili.com/*
// @icon		https://www.bilibili.com/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @license		GPL
// @run-at		document-body
// @grant		GM_addStyle
// @version		beta_1.0.0
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

class CSSRule {
    constructor() {
        __publicField(this, "cssRuleSet", new Set);
        __publicField(this, "styleDom", document.createElement("style"));
    }
    push(selector, rule) {
        const ruleString = Object.entries(rule).reduce(((result, [key, value]) => result + `${key}:${value};`), "");
        this.cssRuleSet.add(`${selector} {${ruleString}}`);
        return this;
    }
    pushImportant(selector, rule) {
        const ruleString = Object.entries(rule).reduce(((result, [key, value]) => {
            let ruleValue = value;
            if (typeof ruleValue === "string") {
                ruleValue = ruleValue.replace("!important", "");
            }
            return result + `${key}:${ruleValue} !important;`;
        }), "");
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
        selectorList.forEach((selector => {
            this.pushImportant(selector, {
                display: "none"
            });
        }));
        return this;
    }
    pushList(ruleList) {
        ruleList.forEach((({selector: selector, rule: rule}) => {
            this.push(selector, rule);
        }));
        return this;
    }
    pushImportantList(ruleList) {
        ruleList.forEach((({selector: selector, rule: rule}) => {
            this.pushImportant(selector, rule);
        }));
        return this;
    }
    submit() {
        this.removeAll();
        const cssRules = Array.from(this.cssRuleSet).join(" ");
        new Info("AddStyle").log(cssRules);
        this.styleDom = GM_addStyle(cssRules);
    }
    removeAll() {
        if (this.styleDom) {
            this.styleDom.remove();
        }
        return this;
    }
}

const hideSelectorList = {
    live: {
        danmuBar: [ ".wealth-medal-ctnr.fans-medal-item-target", ".play-together-panel", ".entry-web", ".gift-planet-entry", ".activity-entry", ".popular-and-hot-rank", ".shop-popover", ".gift-left-part", ".function-card", ".common-danmuku-msg", ".gift-item", ".pk-bar-with-info", ".awesome-pk-vm", "#pk-vm" ]
    },
    dynamic: {
        main: [ ".bili-dyn-version-control", ".reply-notice" ],
        dynamicList: [ ".bili-dyn-list-tabs__list > .bili-dyn-list-tabs__item:nth-of-type(3)" ],
        comment: [ ".comment-list > .list-item.reply-wrap:has(.text > a)" ]
    },
    video: {
        main: [ ".float-nav__btn--fixed", ".reply-notice", "body > div:nth-child(17) > div > div.splitpanes.splitpanes--vertical.default-theme > div.splitpanes__pane.p-3 > div > span" ],
        video: [ ".bpx-player-skipcard" ],
        comment: [ ".reply-list > .reply-item:has(.root-reply > .reply-content-container > .reply-content > .jump-link.user)" ]
    },
    space: {
        comment: [ ".reply-notice" ]
    },
    liveNavIframe: {
        main: [ ".promotion-show-placeholder" ]
    }
};

const prefSelectorList = {
    live: {
        liveTitle: {
            ".live-skin-normal-a-text": {
                overflow: "visible"
            }
        }
    },
    dynamic: {
        main: {}
    },
    video: {
        main: {}
    },
    space: {
        main: {}
    },
    liveNavIframe: {
        main: {}
    }
};

function transformedHideSelectorList(prefSelectorList2) {
    return Object.values(prefSelectorList2).flat();
}

function transformedPrefSelectorList(prefSelectorList2) {
    return Object.entries(Object.values(prefSelectorList2).flat().reduce(((result, current) => ({
        ...result,
        ...current
    })))).map((([selector, rule]) => ({
        selector: selector,
        rule: rule
    })));
}

function addNewStyle(pageType) {
    const cssRule = new CSSRule;
    cssRule.pushHideList(transformedHideSelectorList(hideSelectorList[pageType])).pushImportantList(transformedPrefSelectorList(prefSelectorList[pageType])).submit();
}

function isMatchURL(...regExpList) {
    const matchResultList = [];
    regExpList.forEach((regExp => {
        if (typeof regExp === "string") {
            regExp = new RegExp(regExp);
        }
        matchResultList.push(!!document.URL.match(regExp));
    }));
    return matchResultList.includes(true);
}

function getElement(parent = document.body, selector, timeoutPerSecond = 0, getElementDelayPerSecond = 0) {
    return new Promise((resolve => {
        let result = parent.querySelector(selector);
        if (result) {
            return resolve(result);
        }
        let timer;
        const mutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver;
        if (mutationObserver) {
            const observer = new mutationObserver((mutations => {
                for (let mutation of mutations) {
                    for (let addedNode of mutation.addedNodes) {
                        if (addedNode instanceof Element) {
                            result = addedNode.matches(selector) ? addedNode : addedNode.querySelector(selector);
                            if (result) {
                                observer.disconnect();
                                timer && clearTimeout(timer);
                                setTimeout((() => resolve(result)), getElementDelayPerSecond * 1e3);
                            }
                        }
                    }
                }
            }));
            observer.observe(parent, {
                childList: true,
                subtree: true
            });
            if (timeoutPerSecond > 0) {
                timer = setTimeout((() => {
                    observer.disconnect();
                    return resolve(null);
                }), timeoutPerSecond * 1e3);
            }
        }
    }));
}

const getEl = document.querySelector.bind(document);

const getEls = document.querySelectorAll.bind(document);

async function changeTypeTitle() {
    const selector = ".bili-dyn-list-tabs__list > .bili-dyn-list-tabs__item";
    await getElement(document.body, selector, 0, .1);
    const dynamicTypeList = getEls(selector);
    if (dynamicTypeList) {
        dynamicTypeList[0].innerText = "\u52a8\u6001";
        dynamicTypeList[1].innerText = "\u89c6\u9891";
        dynamicTypeList[2].innerText = "\u756a\u5267";
    }
}

async function changeSearchBarPlaceholder(title) {
    const selector = ".search-bar > input";
    await getElement(document.body, selector, 0, .5);
    const inputElement = getEl(selector);
    inputElement.placeholder = title;
}

(async () => {
    const entryBranch = new EntryBranch;
    entryBranch.add((() => isMatchURL(/^https:\/\/live.bilibili.com\/(blanc\/)?\d+/)), (async () => {
        addNewStyle("live");
        await changeSearchBarPlaceholder("\u641c\u7d22");
    })).add((() => isMatchURL("https://t.bilibili.com/")), (async () => {
        addNewStyle("dynamic");
        await changeTypeTitle();
    })).add((() => isMatchURL(/^https:\/\/www.bilibili.com\/video\/(av)|(BV)/)), (() => {
        addNewStyle("video");
    })).add((() => isMatchURL(/^https:\/\/space.bilibili.com\/\d+\/dynamic/)), (() => {
        addNewStyle("dynamic");
    })).add((() => isMatchURL("https://live.bilibili.com/blackboard/dropdown-menu.html")), (() => {
        addNewStyle("liveNavIframe");
    }));
    entryBranch.run();
})();
