// ==UserScript==
// @name		Flome便捷记录
// @name:en		Flome Quick Record
// @description		Flome便捷记录网页内容
// @description:en		Flome便捷记录网页内容.
// @author		Yiero
// @version		beta_1.0.0
// @match		https://*/*
// @license		GPL
// @icon		https://www.tampermonkey.net/favicon.ico
// @run-at		document-idle
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_deleteValue
// @grant		GM_listValues
// @grant		GM_registerMenuCommand
// @grant		GM_unregisterMenuCommand
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @require		file://D:\Code\JavaScript\TamperMonkey\tampermonkey-demo\dist\Input\Flome Quick Record\Flome Quick Record.js
// @require		https://cdn.jsdelivr.net/npm/sweetalert2@11.7.29/dist/sweetalert2.all.min.js
// @resource		AlertCss https://cdn.jsdelivr.net/npm/sweetalert2@11.7.29/dist/sweetalert2.min.css
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
class GMStorage {
  constructor(key) {
    __publicField(this, "key");
    this.key = key;
  }
  /**
   * Get the value for a given key from the storage.
   * @param {string} key - The key to retrieve the value for.
   * @param {string} defaultValue - The default value to return if the key is not found.
   * @returns {string} - The value for the given key.
   */
  static get(key, defaultValue = "") {
    return GM_getValue(key, defaultValue);
  }
  /**
   * Sets a value in the GM storage and dispatches an event to notify listeners.
   *
   * @param key - The key to set the value for.
   * @param value - The value to set.
   */
  static set(key, value) {
    dispatchEvent(new CustomEvent("GMStorageUpdate", {
      detail: {
        newValue: value,
        oldValue: this.get(key),
        target: key
      }
    }));
    GM_setValue(key, value);
  }
  /** 设置/更新键 */
  /**
   * Sets or updates the value of the key.
   *
   * @param value - The new value to be set.
   * @returns void
   */
  set(value) {
    dispatchEvent(
      new CustomEvent("GMStorageUpdate", {
        detail: {
          newValue: value,
          oldValue: this.get(),
          target: this.key
        }
      })
    );
    GM_setValue(this.key, value);
  }
  /**
   * Get the value from GM_getValue.
   * @param defaultValue - The default value to return if the key is not found.
   * @returns The value stored in GM_getValue or the defaultValue if the key is not found.
   */
  get(defaultValue = null) {
    return GM_getValue(this.key, defaultValue);
  }
  /**
   * Remove the value associated with the key.
   */
  remove() {
    dispatchEvent(new CustomEvent("GMStorageUpdate", {
      detail: {
        newValue: null,
        oldValue: this.get(),
        target: this.key
      }
    }));
    GM_deleteValue(this.key);
  }
}
const alert = (info, title, position, timeout) => {
  Swal.fire({
    // Set the title of the alert
    titleText: title,
    // Set the position of the alert, default to 'center'
    position: position || "center",
    // Set the type of the alert
    info,
    // Show the confirm button
    showConfirmButton: true,
    // Set the timeout duration in milliseconds, default to 1500
    timer: timeout || 1500
  });
};
const HotkeyPrompt = async () => {
  const { value: hotkey } = await Swal.fire({
    // Prompt title
    titleText: "输入热键",
    // Hotkey input field
    html: '<input id="swal2-hotkey-input" placeholder="输入热键" class="swal2-input">',
    // Show close button
    showCloseButton: true,
    // Do not focus on confirm button
    focusConfirm: false,
    // Show cancel button
    showCancelButton: true,
    // Allow keydown event to propagate
    stopKeydownPropagation: false,
    /**
     * Attach event listener to the `keydown` event of the hotkey input field in the toast element.
     * Update the value of the input field with the key combination pressed.
     * @param toast - The toast element containing the hotkey input field
     */
    didOpen(toast) {
      const hotkeyInput = toast.querySelector("#swal2-hotkey-input");
      hotkeyInput.addEventListener("keydown", handleKeyDown);
      function handleKeyDown(e) {
        e.preventDefault();
        const keydownList = [];
        e.shiftKey && keydownList.push("Shift");
        e.ctrlKey && keydownList.push("Ctrl");
        e.altKey && keydownList.push("Alt");
        keydownList.push(
          ["Alt", "Control", "Shift"].includes(e.key) ? "" : e.key.toUpperCase()
        );
        hotkeyInput.value = keydownList.join(" + ");
      }
    },
    /**
     * Performs a pre-confirmation check and returns the value of the hotkey input.
     * @param isConfirm - A boolean indicating whether the confirmation is being made.
     * @returns The value of the hotkey input if the confirmation is made, otherwise undefined.
     */
    preConfirm(isConfirm) {
      if (!isConfirm) {
        return "";
      }
      const hotkeyInput = document.body.querySelector("#swal2-hotkey-input");
      return (hotkeyInput == null ? void 0 : hotkeyInput.value) || "";
    }
  });
  return hotkey;
};
const inputPrompt = async (title, defaultValue = "") => {
  const result = await Swal.fire({
    // Prompt title
    titleText: title,
    // Input fields
    input: "text",
    // Default value
    inputValue: defaultValue,
    // Show close button
    showCloseButton: true,
    // Do not focus on confirm button
    focusConfirm: false,
    // Show cancel button
    showCancelButton: true
  });
  if (result.dismiss === "cancel") {
    return;
  }
  if (result.value) {
    return result.value;
  }
};
const textareaPrompt = async (title, defaultValue = "", extraParma) => {
  const result = await Swal.fire({
    // Prompt title
    titleText: title,
    // Textarea field
    input: "textarea",
    // Default value
    inputValue: defaultValue,
    // disabled click outside to close prompt
    allowOutsideClick: false,
    // Show close button
    showCloseButton: true,
    // Do not focus on confirm button
    focusConfirm: false,
    // Show cancel button
    showCancelButton: true,
    // Width and height
    width: 800,
    /**
     * Function to handle the "did open" event for a toast element.
     * @param toast - The toast element.
     */
    didOpen(toast) {
      const textareaElement = toast.querySelector("#swal2-textarea");
      if (extraParma && extraParma.handleOpen) {
        extraParma.handleOpen(textareaElement);
      }
    }
  });
  if (result.dismiss === "cancel") {
    return;
  }
  if (result.value) {
    return result.value;
  }
};
const Alert = {
  /**
   * Display an alert with the specified information.
   *
   * @param { 'success' | 'error' | 'warning' | 'info' | 'question' } info - The type of the alert.
   * @param { string } title - The title of the alert.
   * @param { AlertPosition } position - The position of the alert.
   * @param { number } [timeout=1500] - The timeout duration in milliseconds.
   * @return { void }
   */
  show: alert,
  /**
   * Displays a success alert with the given title.
   *
   * @param {string} title - The title of the success alert.
   * @param {AlertPosition} [position] - The position of the success alert. Default is undefined.
   * @param {number} [timeout] - The timeout duration for the success alert. Default is undefined.
   */
  success(title, position, timeout) {
    alert("success", title, position, timeout);
  },
  /**
   * A function that displays an info alert with the specified title, position, and timeout.
   *
   * @param {string} title - The title of the info alert.
   * @param {AlertPosition} [position] - The position of the info alert (optional).
   * @param {number} [timeout] - The timeout for the info alert (optional).
   * @return {void}
   */
  info(title, position, timeout) {
    alert("info", title, position, timeout);
  },
  /**
   * Displays a warning alert with the specified title.
   *
   * @param {string} title - The title of the warning alert.
   * @param {AlertPosition} position - The position of the warning alert (optional).
   * @param {number} timeout - The timeout for the warning alert to disappear (optional).
   * @return {void} This function does not return a value.
   */
  warning(title, position, timeout) {
    alert("warning", title, position, timeout);
  },
  /**
   * A description of the entire function.
   *
   * @param {string} title - description of the title parameter
   * @param {AlertPosition} position - description of the position parameter (optional)
   * @param {number} timeout - description of the timeout parameter (optional)
   * @return {void} description of the return value
   */
  error(title, position, timeout) {
    alert("error", title, position, timeout);
  },
  /**
   * A function that displays a question alert with the given title.
   *
   * @param {string} title - The title of the question alert.
   * @param {AlertPosition} [position] - The position where the alert should be displayed. Optional, default is undefined.
   * @param {number} [timeout] - The duration in milliseconds after which the alert should automatically close. Optional, default is undefined.
   * @return {void} This function does not return a value.
   */
  question(title, position, timeout) {
    alert("question", title, position, timeout);
  }
};
const Prompt = {
  hotkey: HotkeyPrompt,
  input: inputPrompt,
  textarea: textareaPrompt
};
const config = new class Config {
  constructor() {
    __publicField(this, "tagListStorage", new GMStorage("tagList"));
    __publicField(this, "apiStorage", new GMStorage("api"));
    __publicField(this, "historyStorage", new GMStorage("history"));
  }
  /**
   * Returns the list of tags stored in GMStorage.
   * @returns {string[]} The list of tags.
   */
  get tagList() {
    return this.tagListStorage.get([]);
  }
  /**
   * Setter for the tagList property.
   * @param value - An array of strings representing the tag list.
   */
  set tagList(value) {
    this.tagListStorage.set(value);
  }
  /**
   * Get the value of the 'api' key from the GMStorage.
   *
   * @returns {string} The value of the 'api' key.
   */
  get api() {
    return this.apiStorage.get("");
  }
  /**
   * Set the value of the 'api' property in GMStorage.
   *
   * @param value - The new value for the 'api' property.
   */
  set api(value) {
    this.apiStorage.set(value);
  }
  /**
   * Retrieves the list of tags stored in GMStorage.
   *
   * @returns {Map<string, string>} The list of tags.
   */
  get history() {
    const historyData = this.historyStorage.get([]);
    return new Map(historyData);
  }
  /**
   * Setter for the history property.
   * @param value - A map of strings representing the history.
   */
  set history(value) {
    this.historyStorage.set(Array.from(value));
  }
}();
async function getFlomeApi() {
  const result = await Prompt.input("Enter Flome API", config.api);
  if (result && result.startsWith("https://flomoapp.com/iwh")) {
    config.api = result;
    return;
  } else if (result) {
    Alert.error("输入错误API");
    return;
  }
}
async function inputPrevTags() {
  const result = await Prompt.input("输入默认标签\n(多个标签通过半角逗号分割)", config.tagList.join(", "));
  let tagList = [];
  if (result) {
    tagList = result.split(",").map((tag) => tag.trim());
    config.tagList = tagList;
  }
}
const api_pushContent = async (api, content) => {
  const response = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content })
  });
  return response.json();
};
async function flomeInput(defaultValue = "") {
  if (!config.api) {
    Alert.warning("请输入 Flome APi");
    return;
  }
  const result = await Prompt.textarea(
    "输入 Flome 笔记",
    defaultValue + (config.history.get(document.URL) === "undefined" || !config.history.get(document.URL) ? "" : config.history.get(document.URL)),
    {
      handleOpen: (textarea) => {
        const history = config.history;
        textarea.addEventListener("input", () => {
          history.set(document.URL, textarea.value.replace(defaultValue, ""));
          config.history = history;
        });
        textarea.addEventListener("keydown", (e) => {
          if (e.ctrlKey && e.keyCode === 13) {
            e.preventDefault();
            Swal.clickConfirm();
          }
        });
      }
    }
  );
  if (!result) {
    return;
  }
  let response;
  try {
    response = await api_pushContent(config.api, result);
  } catch (e) {
    Alert.error("Api错误");
    throw e;
  }
  if (response.message === "已记录") {
    Alert.success("已记录到 Flome.");
  }
}
function getDefaultContent() {
  let defaultValue = "";
  defaultValue += config.tagList.reduce((prev, current) => `${prev}#${current} `, "") + "\n";
  defaultValue += `[${document.title}](${document.URL})
`;
  return defaultValue;
}
(async () => {
  const configApiMenu = new GMConfigMenu(getFlomeApi);
  configApiMenu.open("输入 Flome APi");
  const configTagsMenu = new GMConfigMenu(inputPrevTags);
  configTagsMenu.open("输入默认标签");
  const openFlomeMenu = new GMConfigMenu(flomeInput.bind(null, getDefaultContent()));
  openFlomeMenu.open("输入 Flome 笔记");
})();
