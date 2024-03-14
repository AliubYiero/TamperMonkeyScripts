// ==UserScript==
// @name		通用CSS配置
// @name:en		GlobalCSSConfiguration
// @description		通用CSS配置
// @description:en		通用CSS配置.
// @author		Yiero
// @version		1.0.0
// @match		https://*/*
// @license		GPL
// @icon		https://www.runoob.com/wp-content/uploads/2013/07/css-logo.png
// @run-at		document-start
// @grant		GM_addStyle
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_deleteValue
// @grant		GM_listValues
// @grant		GM_registerMenuCommand
// @grant		GM_unregisterMenuCommand
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

const inputPrompt = async (title, defaultUrl = document.URL, defaultValue = "") => {
    const response = await Swal.fire({
        titleText: title,
        html: `\n<section class="url-container">\n<label for="swal2-input--url">\n\t<p>\u5f53\u524d\u5339\u914dURL (\u652f\u6301\u6b63\u5219, \u901a\u8fc7 \`/content/\` )</p>\n\t<input type="text" id="swal2-input--url" class="swal2-input" placeholder="\u8f93\u5165\u5339\u914dUrl" value="${defaultUrl}"/>\n</label>\n</section>\n<section>\n<label for="swal2-input--css-selector">\n\t<p>\u8f93\u5165CSS\u9009\u62e9\u5668</p>\n\t<input type="text" id="swal2-input--css-selector" class="swal2-input" placeholder="\u8f93\u5165CSS\u9009\u62e9\u5668"/>\n</label>\n</section>\n<section>\n<label for="swal2-input--css-rule">\n\t<p>\u8f93\u5165CSS\u5c5e\u6027</p>\n\t<input type="text" id="swal2-input--css-rule" class="swal2-input" placeholder="\u8f93\u5165CSS\u89c4\u5219" value="${defaultValue}"/>\n</label>\n</section>\n\t\t`,
        showCloseButton: true,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "\u786e\u5b9a",
        showDenyButton: true,
        denyButtonText: `\u7ee7\u7eed\u6dfb\u52a0`,
        cancelButtonText: "\u53d6\u6d88",
        preConfirm(isConfirm) {
            if (!isConfirm) {
                return null;
            }
            return {
                url: document.querySelector("#swal2-input--url").value,
                selector: document.querySelector("#swal2-input--css-selector").value,
                cssRule: document.querySelector("#swal2-input--css-rule").value
            };
        },
        preDeny(isDeny) {
            if (!isDeny) {
                return null;
            }
            return {
                url: document.querySelector("#swal2-input--url").value,
                selector: document.querySelector("#swal2-input--css-selector").value,
                cssRule: document.querySelector("#swal2-input--css-rule").value
            };
        }
    });
    const result = [];
    if (response.isDismissed && response.dismiss === "cancel") {
        return null;
    } else if (response.isDenied) {
        if (response.value) {
            result.push(response.value);
        }
        const res = await inputPrompt(title, defaultUrl, defaultValue);
        if (res) {
            result.push(res);
        }
    } else if (response.isConfirmed && response.value) {
        result.push(response.value);
    }
    return result;
};

(async () => {
    const configSettingMenu = new GMConfigMenu((async () => {
        await inputPrompt("\u8bf7\u8f93\u5165CSS\u89c4\u5219");
    }));
    configSettingMenu.open("\u8f93\u5165CSS\u89c4\u5219");
})();
