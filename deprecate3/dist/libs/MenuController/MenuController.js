// ==UserScript==
// @name		MenuController
// @name:en		MenuController
// @description		一个用于切换Menu状态的控制类
// @description:en		一个用于切换Menu状态的控制类.
// @author		Yiero
// @version		beta_1.0.0
// @match		https://*/*
// @license		GPL
// @icon		https://www.tampermonkey.net/favicon.ico
// @run-at		document-start
// @grant		GM_registerMenuCommand
// @grant		GM_unregisterMenuCommand
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @require		file://D:\Code\JavaScript\TamperMonkey\tampermonkey-demo\dist\libs\MenuController\MenuController.js
// ==/UserScript==
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const data = [
  {
    name: "First-One",
    onClick() {
      console.log(this.name);
    },
    children: [
      {
        name: "First-One-First",
        onClick() {
          console.log(this.name);
        }
      }
    ]
  },
  {
    name: "First-Two",
    onClick() {
      console.log(this.name);
    }
  }
];
class GMMenu {
  constructor(name, onClick) {
    __publicField(this, "name");
    __publicField(this, "onClick");
    this.name = name;
    this.onClick = onClick;
  }
}
function tree(children, parse) {
  children && children.length && children.map((item) => {
    item = parse && parse(item) || item;
    item.children = tree(item.children, parse);
    return item;
  });
  return children;
}
const a = tree(data, (item) => {
  return new GMMenu(item.name, item.onClick);
});
console.log(a);
