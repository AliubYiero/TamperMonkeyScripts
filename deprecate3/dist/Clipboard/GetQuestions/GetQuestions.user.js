// ==UserScript==
// @name		GetQuestions
// @name:en		GetQuestions
// @description		GetQuestions
// @description:en		GetQuestions.
// @author		Yiero
// @version		1.0.0
// @match		https://mooc1.chaoxing.com/mooc-ans/mooc2/work/*
// @match		https://www.haodaxue.net/test/jieguo?*
// @license		GPL
// @icon		https://mooc1.chaoxing.com/favicon.ico
// @run-at		document-start
// @grant		GM_registerMenuCommand
// @grant		GM_setClipboard
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

var website = (website2 => {
    website2["mooc"] = "https://mooc1.chaoxing.com";
    website2["haodaxue"] = "https://www.haodaxue.net";
    return website2;
})(website || {});

const moocReplaceRule = questionInnerText => {
    const replaceNewlines = questionInnerText.replace(/\n([ABCD]\.)/g, "<\u6362\u884c>$1");
    const replaceAnswers = replaceNewlines.replace(/\u6211\u7684\u7b54\u6848: .*\u6b63\u786e\u7b54\u6848(.*?)\n.*/s, "\u7b54\u6848$1");
    return replaceAnswers.replace(/<\u6362\u884c>/g, "\n");
};

const configs = [ {
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
}, {
    website: website.haodaxue,
    params: {
        radio: {
            selector: ".list.radio_list",
            replaceRule: questionInnerText => questionInnerText.replace(/(\n[ABCD]\.)/g, "<\u6362\u884c>$1").replace(/\n/g, "").replace("ABCD\u6b63\u786e\u7b54\u6848\uff1a ", "\n\u7b54\u6848: ").replace("\u60a8\u7684\u7b54\u6848\uff1a", "").replace(/\u672c\u9898\u89e3\u6790\uff1a.*/, "").replace(/<\u6362\u884c>/g, "\n")
        },
        checkbox: {
            selector: ".list.checkbox_list",
            replaceRule: questionInnerText => questionInnerText.replace(/(\n[ABCD]\.)/g, "<\u6362\u884c>$1").replace(/\n/g, "").replace("ABCD\u6b63\u786e\u7b54\u6848\uff1a ", "\n\u7b54\u6848: ").replace("\u60a8\u7684\u7b54\u6848\uff1a", "").replace(/\u672c\u9898\u89e3\u6790\uff1a.*/, "").replace(/<\u6362\u884c>/g, "\n")
        },
        judge: {
            selector: ".list.judge_list",
            replaceRule: questionInnerText => questionInnerText.replace(/\n\n \u6b63\u786e\n \u9519\u8bef/, "").replace(/\n/g, "").replace("\u6b63\u786e\u7b54\u6848\uff1a", "\n\u7b54\u6848: ").replace("\u60a8\u7684\u7b54\u6848\uff1a", "").replace(/\u672c\u9898\u89e3\u6790\uff1a.*/, "")
        },
        QA: {
            selector: ".list.blanks_list",
            replaceRule: questionInnerText => questionInnerText.replace("\u6b63\u786e\u7b54\u6848\uff1a", "<\u6362\u884c>\u7b54\u6848: ").replace("\n\u7b54\uff1a", "").replace("\u60a8\u7684\u7b54\u6848\uff1a", "").replace(/\n/g, "").replace(/<\u6362\u884c>/g, "\n")
        }
    }
} ];

function getQuestionList(radioSelector, replaceRule) {
    const questionStringList = [];
    document.querySelectorAll(radioSelector).forEach((question => {
        const string = replaceRule(question.innerText);
        questionStringList.push(string);
    }));
    return questionStringList;
}

function questionParse(website2) {
    const config = configs.find((param => param.website === website2));
    const questionStringList = [];
    for (let type in config.params) {
        questionStringList.push(...getQuestionList(config.params[type].selector, config.params[type].replaceRule));
    }
    const questionString = questionStringList.join("\n");
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
    const questionParseSetting = new GMConfigMenu((() => {
        reQuestionParser();
    }));
    questionParseSetting.open("\u9898\u5e93\u89e3\u6790");
})();
