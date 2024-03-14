// ==UserScript==
// @name		GetQuestions
// @name:en		GetQuestions
// @description		GetQuestions
// @description:en		GetQuestions.
// @author		Yiero
// @version		beta_1.0.0
// @match		https://mooc1.chaoxing.com/mooc-ans/mooc2/work/*
// @match		https://www.haodaxue.net/test/jieguo?*
// @license		GPL
// @icon		https://mooc1.chaoxing.com/favicon.ico
// @run-at		document-start
// @grant		GM_registerMenuCommand
// @grant		GM_setClipboard
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @require		file://D:\Code\JavaScript\TamperMonkey\tampermonkey-demo\dist\Clipboard\GetQuestions\GetQuestions.js
// ==/UserScript==
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class GMConfigMenu {
  constructor(callback) {
    /** 配置菜单Id, 用于识别配置菜单, 关闭配置菜单 */
    __publicField(this, "menuId", 0);
    /** 回调函数 */
    __publicField(this, "callback");
    this.callback = callback;
  }
  /**
   * 注册油猴菜单配置项
   * @param {string} title 配置项提示文本
   * */
  open(title) {
    if (this.menuId) {
      this.close();
    }
    this.menuId = GM_registerMenuCommand(title, this.callback);
  }
  /**
   * 注销油猴菜单配置项
   * */
  close() {
    GM_unregisterMenuCommand(this.menuId);
    this.menuId = 0;
  }
}
var website = /* @__PURE__ */ ((website2) => {
  website2["mooc"] = "https://mooc1.chaoxing.com";
  website2["haodaxue"] = "https://www.haodaxue.net";
  return website2;
})(website || {});
const moocReplaceRule = (questionInnerText) => {
  const replaceNewlines = questionInnerText.replace(/\n([ABCD]\.)/g, "<换行>$1");
  const replaceAnswers = replaceNewlines.replace(
    /我的答案: .*正确答案(.*?)\n.*/s,
    "答案$1"
  );
  return replaceAnswers.replace(/<换行>/g, "\n");
};
const configs = [
  // 网站
  {
    // 超星学习通
    website: website.mooc,
    params: {
      radio: {
        selector: ".mark_table > .mark_item:nth-of-type(1) > .questionLi",
        replaceRule: moocReplaceRule
      },
      checkbox: {
        selector: ".mark_table > .mark_item:nth-of-type(2) > .questionLi",
        replaceRule: moocReplaceRule
      },
      judge: {
        selector: ".mark_table > .mark_item:nth-of-type(3) > .questionLi",
        replaceRule: moocReplaceRule
      }
    }
  },
  {
    // 好大学
    website: website.haodaxue,
    params: {
      radio: {
        selector: ".list.radio_list",
        replaceRule: (questionInnerText) => {
          return questionInnerText.replace(/(\n[ABCD]\.)/g, "<换行>$1").replace(/\n/g, "").replace("ABCD正确答案： ", "\n答案: ").replace("您的答案：", "").replace(/本题解析：.*/, "").replace(/<换行>/g, "\n");
        }
      },
      checkbox: {
        selector: ".list.checkbox_list",
        replaceRule: (questionInnerText) => {
          return questionInnerText.replace(/(\n[ABCD]\.)/g, "<换行>$1").replace(/\n/g, "").replace("ABCD正确答案： ", "\n答案: ").replace("您的答案：", "").replace(/本题解析：.*/, "").replace(/<换行>/g, "\n");
        }
      },
      judge: {
        selector: ".list.judge_list",
        replaceRule: (questionInnerText) => {
          return questionInnerText.replace(/\n\n 正确\n 错误/, "").replace(/\n/g, "").replace("正确答案：", "\n答案: ").replace("您的答案：", "").replace(/本题解析：.*/, "");
        }
      },
      QA: {
        selector: ".list.blanks_list",
        replaceRule: (questionInnerText) => {
          return questionInnerText.replace("正确答案：", "<换行>答案: ").replace("\n答：", "").replace("您的答案：", "").replace(/\n/g, "").replace(/<换行>/g, "\n");
        }
      }
    }
  }
];
function getQuestionList(radioSelector, replaceRule) {
  const questionStringList = [];
  document.querySelectorAll(radioSelector).forEach(
    (question) => {
      const string = replaceRule(question.innerText);
      questionStringList.push(string);
    }
  );
  return questionStringList;
}
function questionParse(website2) {
  const config = configs.find((param) => param.website === website2);
  const questionStringList = [];
  for (let type in config.params) {
    questionStringList.push(...getQuestionList(config.params[type].selector, config.params[type].replaceRule));
  }
  const questionString = questionStringList.join("\n");
  console.log(questionString);
  GM_setClipboard(questionString);
}
(function() {
  const _questionParser = () => {
    if (document.URL.startsWith("https://mooc1.chaoxing.com")) {
      return questionParse.bind(_questionParser, website.mooc);
    } else if (document.URL.startsWith("https://www.haodaxue.net")) {
      return questionParse.bind(_questionParser, website.haodaxue);
    }
  };
  const reQuestionParser = _questionParser();
  const questionParseSetting = new GMConfigMenu(() => {
    reQuestionParser();
  });
  questionParseSetting.open("题库解析");
})();
