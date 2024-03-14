// ==UserScript==
// @name		Don't play too much time and do more things
// @name:en		AlertYou
// @description		Don't play too much time and do more things
// @description:en		Don't play too much time and do more things.
// @author		Yiero
// @version		1.0.0
// @match		https://*/*
// @license		GPL
// @icon		https://www.tampermonkey.net/favicon.ico
// @run-at		document-start
// @grant		GM_registerMenuCommand
// @grant		GM_unregisterMenuCommand
// @grant		GM_notification
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_deleteValue
// @grant		GM_listValues
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
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

const isIframe = () => self !== top;

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

const notification = (content, timeoutPerSecond) => {
    setTimeout((() => {
        GM_notification({
            text: content,
            title: "\u5b9a\u65f6\u63d0\u9192"
        });
    }), timeoutPerSecond * 1e3);
};

const setNotification = () => {
    const msg = prompt("\u8f93\u5165\u9700\u8981\u63d0\u9192\u7684\u4e8b\u4ef6: ");
    const timeout = Number(prompt("\u8f93\u5165\u9700\u8981\u63d0\u9192\u7684\u65f6\u95f4: "));
    if (msg && timeout) {
        notification(msg, timeout);
    }
};

const getNext20Minute = () => Math.ceil((new Date).getMinutes() / 20) * 20;

const getWaitTimePerMs = () => {
    const nextTime = getNext20Minute();
    return (nextTime - (new Date).getMinutes()) * 60 * 1e3;
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

const print = new Info("AlertYou");

const AlertYou = config => {
    window.alert(config.text);
};

const alertAlways = () => {
    const waitTimePerMs = getWaitTimePerMs();
    print.log("\u7ee7\u7eed\u7b49\u5f85 ", waitTimePerMs, " ms\u5c06\u4f1a\u8fdb\u884c\u4e00\u6b21\u63d0\u793a.");
    const timer = setTimeout((() => {
        const currentTime = new Date;
        AlertYou({
            text: `\u73b0\u5728\u65f6\u95f4[ ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}]`
        });
        clearTimeout(timer);
        alertAlways();
    }), waitTimePerMs);
};

(async () => {
    if (isIframe()) {
        return;
    }
    alertAlways();
    new GMConfigMenu((() => {
        setNotification();
    })).open("\u5f00\u542f\u4e8b\u4ef6\u63d0\u9192");
})();
