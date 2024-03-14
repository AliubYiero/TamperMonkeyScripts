// ==UserScript==
// @name		通用CSS配置
// @name:en		GlobalCSSConfiguration
// @description		通用CSS配置
// @description:en		通用CSS配置.
// @author		Yiero
// @version		beta_1.0.0
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
// @require		file://D:\Code\JavaScript\TamperMonkey\tampermonkey-demo\dist\Global\GlobalCSSConfiguration\GlobalCSSConfiguration.js
// @require		https://cdn.bootcdn.net/ajax/libs//sweetalert2/11.7.27/sweetalert2.min.js
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
const inputPrompt = async (title, defaultUrl = document.URL, defaultValue = "") => {
  const response = await Swal.fire({
    // Prompt title
    titleText: title,
    // Input field
    html: `
<section class="url-container">
<label for="swal2-input--url">
	<p>当前匹配URL (支持正则, 通过 \`/content/\` )</p>
	<input type="text" id="swal2-input--url" class="swal2-input" placeholder="输入匹配Url" value="${defaultUrl}"/>
</label>
</section>
<section>
<label for="swal2-input--css-selector">
	<p>输入CSS选择器</p>
	<input type="text" id="swal2-input--css-selector" class="swal2-input" placeholder="输入CSS选择器"/>
</label>
</section>
<section>
<label for="swal2-input--css-rule">
	<p>输入CSS属性</p>
	<input type="text" id="swal2-input--css-rule" class="swal2-input" placeholder="输入CSS规则" value="${defaultValue}"/>
</label>
</section>
		`,
    // Show close button
    showCloseButton: true,
    // Do not focus on confirm button
    focusConfirm: false,
    // Show cancel button
    showCancelButton: true,
    confirmButtonText: "确定",
    showDenyButton: true,
    denyButtonText: `继续添加`,
    cancelButtonText: "取消",
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
  const configSettingMenu = new GMConfigMenu(async () => {
    const result = await inputPrompt("请输入CSS规则");
    console.log(result);
  });
  configSettingMenu.open("输入CSS规则");
})();
