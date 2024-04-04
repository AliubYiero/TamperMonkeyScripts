// ==UserScript==
// @name	考试宝答题界面优化
// @version	1.2.8-beta
// @license	GPL-3
// @namespace	https://github.com/AliubYiero/TamperMonkeyScripts
// @run-at	document-start
// @author	Yiero
// @homepage	https://github.com/AliubYiero/TamperMonkeyScripts
// @description	优化考试宝答题界面UI，增加按键绑定
// @match	https://www.zaixiankaoshi.com/*
// @grant	GM_addStyle
// @icon	https://www.zaixiankaoshi.com/favicon.ico
// @require	file://D:\Github\TamperMonkeyScripts\dist\考试宝答题界面优化.dev.js
// ==/UserScript==


var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _options;
class SubmitAnswerStatusChange {
  /**
   * @static
   * 状态改变：提交
   * */
  static submit() {
    this.isSubmit = true;
  }
  /**
   * @static
   * 状态改变：取消提交
   * */
  static close() {
    this.isSubmit = false;
  }
  /**
   * @static
   * 状态改变：更新提交
   * */
  static fresh() {
    this.close();
  }
}
__publicField(SubmitAnswerStatusChange, "isSubmit", false);
class FunctionChainCall {
  constructor() {
    __publicField(this, "callChain");
    this.callChain = [];
  }
  set(fn, params = []) {
    this.callChain.push([fn, params]);
  }
  setList(array) {
    array.forEach((fn) => {
      if (!Array.isArray(fn)) {
        this.set(fn);
        return;
      }
      this.set(fn[0], fn[1]);
    });
  }
  show() {
    console.info(this.callChain);
  }
  // @ts-ignore
  async call() {
    let returnString;
    while (this.callChain[0]) {
      if (returnString === "stop") {
        return;
      } else if (returnString === "skip") {
        this.callChain.shift();
        continue;
      }
      const fn = this.callChain[0];
      returnString = await fn[0].apply(null, fn[1]);
      this.callChain.shift();
    }
  }
}
class OptionObserver extends MutationObserver {
  constructor(node, callback) {
    super(callback);
    super.observe(node, {
      childList: true
    });
  }
}
function urlJudge(urlHeader) {
  if (typeof urlHeader === "string") {
    urlHeader = new RegExp(urlHeader);
  }
  return !!document.URL.match(urlHeader);
}
class OptionListStorage {
  static get() {
    return __privateGet(this, _options);
  }
  static set(optionList) {
    __privateSet(this, _options, optionList);
  }
}
_options = new WeakMap();
__privateAdd(OptionListStorage, _options, void 0);
function bindKeyboardEvent() {
  const optionList = OptionListStorage.get();
  try {
    window.addEventListener("keydown", (e) => {
      var _a;
      const chosenOptionNumber = parseInt(e.key) - 1;
      if (chosenOptionNumber >= 0 && chosenOptionNumber < optionList.length) {
        console.info("Enter Option Chosen");
        (_a = optionList[chosenOptionNumber]) == null ? void 0 : _a.click();
        return;
      }
      const submitAnswer = document.querySelectorAll('.topic [style="clear: both;"]');
      if (submitAnswer.length === 2 && !SubmitAnswerStatusChange.isSubmit && ["Enter"].indexOf(e.key) !== -1) {
        SubmitAnswerStatusChange.submit();
        submitAnswer[0].querySelector("button").click();
        return;
      }
      SubmitAnswerStatusChange.fresh();
      if (["ArrowLeft"].indexOf(e.key) !== -1 || ["NumpadSubtract"].indexOf(e.code) !== -1) {
        document.querySelector(".next-preve > button:nth-of-type(1)").click();
      } else if (["Enter", "+", "ArrowRight"].indexOf(e.key) !== -1) {
        const rightBtn = document.querySelector(".next-preve > button:nth-of-type(2)");
        if (rightBtn.disabled && urlJudge("https://www.zaixiankaoshi.com/mnks/simulation/")) {
          let submitBtn = document.querySelector(".submit-btn");
          submitBtn.click();
          return;
        }
        rightBtn.click();
      }
    });
  } catch (e) {
    console.error(e);
    const isReloadPage = confirm(`
KeyBoard binding got an error, should fresh this page to reload?
按键绑定失败。是否需要重新刷新页面重新载入脚本？
		`);
    if (isReloadPage) {
      location.reload();
    }
  }
}
function addQuickOption() {
  if (!urlJudge(/https:\/\/www\.zaixiankaoshi\.com\/mnks\/\?paperid/)) {
    return;
  }
  console.info("Add quick question choose option. ");
  const tableContainer = document.querySelector(".custom-table");
  const colList = tableContainer.querySelectorAll("tr:not(:last-of-type)");
  colList.forEach((col) => {
    const row = col.querySelector("td:nth-of-type(2)");
    const colInput = row.querySelector("input");
    const { min, max } = colInput;
    const maxBtn = document.createElement("button");
    maxBtn.classList.add("el-button");
    maxBtn.innerText = "Max";
    maxBtn.addEventListener("click", (e) => {
      e.preventDefault();
      colInput.value = max;
    });
    const minBtn = document.createElement("button");
    minBtn.classList.add("el-button");
    minBtn.innerText = "Min";
    minBtn.addEventListener("click", (e) => {
      e.preventDefault();
      colInput.value = min;
    });
    const tenPercentBtn = document.createElement("button");
    tenPercentBtn.classList.add("el-button");
    tenPercentBtn.innerText = "10%";
    tenPercentBtn.addEventListener("click", (e) => {
      e.preventDefault();
      colInput.value = String(Math.ceil(parseInt(max) * 0.1));
    });
    row.append(maxBtn);
    row.append(minBtn);
    row.append(tenPercentBtn);
  });
}
function bindPageReloadEvent() {
  console.log("Bind page reload event.");
  function reloadPage() {
    console.info("Reload Page.");
    location.reload();
  }
  window.addEventListener("hashchange", reloadPage);
  let _pushState = window.history.pushState;
  window.history.pushState = function() {
    setTimeout(reloadPage, 1e3);
    return _pushState.apply(this, arguments);
  };
}
function useRandomOption() {
  if (localStorage.getItem("openRandomOption") !== "true" || !urlJudge("https://www.zaixiankaoshi.com/mnks/simulation/")) {
    return;
  }
  console.info("Use Random Option.");
  const optionContainer = document.querySelector(".select-left");
  const optionList = Array.from(optionContainer.querySelectorAll(".option"));
  optionList.sort(() => {
    return Math.random() - 0.5;
  });
  const upperAlphaList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  for (let i = 0; i < optionList.length; i++) {
    const option = optionList[i];
    option.querySelector(".before-icon").innerText = upperAlphaList[i];
  }
  optionList.forEach((option) => {
    optionContainer.append(option);
  });
}
function unlockRandomOption() {
  if (!urlJudge(/https:\/\/www\.zaixiankaoshi\.com\/mnks\/\?paperid/)) {
    return;
  }
  localStorage.removeItem("openRandomOption");
  console.info("Remove Origin Random Option Btn. ");
  const formContainer = document.querySelectorAll("div.box-card > form > div");
  let randomOptionLabel = document.createElement("div");
  formContainer.forEach((formItem) => {
    var _a;
    if (((_a = formItem.querySelector("label")) == null ? void 0 : _a.innerText) === "选项乱序") {
      randomOptionLabel = formItem;
    }
  });
  const randomOptionBtn = randomOptionLabel.querySelector("div");
  randomOptionBtn.remove();
  const reRandomOptionBtnContainer = document.createElement("form");
  reRandomOptionBtnContainer.id = "random-option-container";
  reRandomOptionBtnContainer.style.height = "40px";
  reRandomOptionBtnContainer.style.lineHeight = "40px";
  reRandomOptionBtnContainer.innerHTML = `
		<input type="radio" name="randomOption" id="random-option--open" value="true">
		<label for="random-option--open">开启</label>
		<input type="radio" name="randomOption" id="random-option--close" value="false">
		<label for="random-option--close">关闭</label>
		<!-- <div style="text-indent: 2em;color:red;background:#f8f8f8;">请注意，当您开启本脚本的随机选项时，您需要使用键盘选择选项，使用鼠标选择选项会出现选项映射错误导致无法获得正确答案。</div> -->
	`;
  randomOptionLabel.append(reRandomOptionBtnContainer);
  reRandomOptionBtnContainer.addEventListener("change", (e) => {
    localStorage.setItem("openRandomOption", e.target.value);
  });
}
function setLargeFont() {
  if (!urlJudge(/https:\/\/www\.zaixiankaoshi\.com\/mnks\/\?paperid/)) {
    return;
  }
  const LargeFontBtn = document.querySelector("div.clearfix.font-set span:nth-of-type(3)");
  LargeFontBtn.click();
}
function removeExtraElement() {
  if (!urlJudge(/^https:\/\/www.zaixiankaoshi.com\/(online\/\?paperId)|(mnks\/simulation)/)) {
    return;
  }
  GM_addStyle(`
		/* 居中主容器 */
		.app-main {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0;
		}
		
		/* 优化主容器UI */
		.middle-container {
			padding: 10px ${16 + 19 + 16 + 10} px;
			border-radius: 10px;
		}
		
		/*显示ai解析*/
		.prative-page .answer-box .hide-height .answer-analysis {
			margin-right: 8px;
			width: 100%;
			-webkit-line-clamp: 1;
			overflow: hidden;
			white-space: normal;
		}
		
		/* 隐藏多余元素 */
		.vip-quanyi,
		.new-footer,
		.header,
		.vip-tips,
		.right-float-window,
		.el-button.el-button--warning.el-button--mini,
		.page-main .pull-right > :not(.serch-form) {
			display: none;
		}
	`);
}
function isAnswerUI() {
  const localURL = document.URL.split("/");
  console.log(localURL[localURL.length - 2]);
  if (["online", "simulation"].indexOf(localURL[localURL.length - 2]) === -1) {
    console.info("非答题界面，已退出");
    bindPageReloadEvent();
    return "stop";
  }
}
function initOption() {
  const questionBox = document.querySelector(".qusetion-box");
  new OptionObserver(questionBox, () => {
    console.info("Change question");
    SubmitAnswerStatusChange.fresh();
  });
}
function getOptionContainer() {
  let optionList = document.querySelectorAll(".options-w > .option");
  try {
    new OptionObserver(document.querySelector(".top-hd"), () => {
      new OptionObserver(document.querySelector(".options-w"), () => {
        console.info("Fresh Options: ");
        optionList = document.querySelectorAll(".options-w > .option");
      });
    });
  } catch (e) {
  }
  OptionListStorage.set(optionList);
}
const functionChainCall = new FunctionChainCall();
functionChainCall.set(addQuickOption);
const fnList = [
  // bindPageReloadEvent,    // 当页面通过hash更新路由时，强制页面刷新
  removeExtraElement,
  // 通过CSS优化界面UI，移除多余元素
  unlockRandomOption,
  // 模拟考试选题界面解锁随机选项
  isAnswerUI,
  // 判断是否为答题界面
  useRandomOption,
  // 模拟考试界面进行随机选项设置
  setLargeFont,
  // 模拟考试界面默认设置最大字体
  initOption,
  // 更换题目时重新初始化提交状态
  getOptionContainer,
  // 监听选项容器更改，重新绑定选项容器
  bindKeyboardEvent
  // 绑定键盘事件
];
functionChainCall.setList(fnList);
window.onload = () => {
  setTimeout(() => {
    functionChainCall.call();
  }, 1e3);
};
