// ==UserScript==
// @name		MenuController
// @name:en		MenuController
// @description		一个用于切换Menu状态的控制类
// @description:en		一个用于切换Menu状态的控制类.
// @author		Yiero
// @version		1.0.0
// @match		https://*/*
// @license		GPL
// @icon		https://www.tampermonkey.net/favicon.ico
// @run-at		document-start
// @grant		GM_registerMenuCommand
// @grant		GM_unregisterMenuCommand
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

const data = [ {
    name: "First-One",
    onClick() {
        (() => {})(this.name);
    },
    children: [ {
        name: "First-One-First",
        onClick() {
            (() => {})(this.name);
        }
    } ]
}, {
    name: "First-Two",
    onClick() {
        (() => {})(this.name);
    }
} ];

class GMMenu {
    constructor(name, onClick) {
        __publicField(this, "name");
        __publicField(this, "onClick");
        this.name = name;
        this.onClick = onClick;
    }
}

function tree(children, parse) {
    children && children.length && children.map((item => {
        item = parse && parse(item) || item;
        item.children = tree(item.children, parse);
        return item;
    }));
    return children;
}

tree(data, (item => new GMMenu(item.name, item.onClick)));
