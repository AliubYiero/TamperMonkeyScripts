// ==UserScript==
// @name		Flome便捷记录
// @name:en		Flome Quick Record
// @description		Flome便捷记录网页内容
// @description:en		Flome便捷记录网页内容.
// @author		Yiero
// @version		1.0.0
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
// @require		https://cdn.jsdelivr.net/npm/sweetalert2@11.7.29/dist/sweetalert2.all.min.js
// @resource		AlertCss https://cdn.jsdelivr.net/npm/sweetalert2@11.7.29/dist/sweetalert2.min.css
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

class GMStorage {
    constructor(key) {
        __publicField(this, "key");
        this.key = key;
    }
    static get(key, defaultValue = "") {
        return GM_getValue(key, defaultValue);
    }
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
    set(value) {
        dispatchEvent(new CustomEvent("GMStorageUpdate", {
            detail: {
                newValue: value,
                oldValue: this.get(),
                target: this.key
            }
        }));
        GM_setValue(this.key, value);
    }
    get(defaultValue = null) {
        return GM_getValue(this.key, defaultValue);
    }
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

const alert = (info, title, text, position, timeout) => {
    if (text) {
        text = text.split("\n").map((item => `<p>${item}</p>`)).join("");
    }
    Swal.fire({
        titleText: title,
        html: text,
        position: position || "center",
        info: info,
        showConfirmButton: true,
        timer: timeout || 1500
    });
};

const HotkeyPrompt = async () => {
    const {value: hotkey} = await Swal.fire({
        titleText: "\u8f93\u5165\u70ed\u952e",
        html: '<input id="swal2-hotkey-input" placeholder="\u8f93\u5165\u70ed\u952e" class="swal2-input">',
        showCloseButton: true,
        focusConfirm: false,
        showCancelButton: true,
        stopKeydownPropagation: false,
        didOpen(toast) {
            const hotkeyInput = toast.querySelector("#swal2-hotkey-input");
            hotkeyInput.addEventListener("keydown", handleKeyDown);
            function handleKeyDown(e) {
                e.preventDefault();
                const keydownList = [];
                e.shiftKey && keydownList.push("Shift");
                e.ctrlKey && keydownList.push("Ctrl");
                e.altKey && keydownList.push("Alt");
                keydownList.push([ "Alt", "Control", "Shift" ].includes(e.key) ? "" : e.key.toUpperCase());
                hotkeyInput.value = keydownList.join(" + ");
            }
        },
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
        titleText: title,
        input: "text",
        inputValue: defaultValue,
        showCloseButton: true,
        focusConfirm: false,
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
        titleText: title,
        input: "textarea",
        inputValue: defaultValue,
        allowOutsideClick: false,
        showCloseButton: true,
        focusConfirm: false,
        showCancelButton: true,
        width: 800,
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
    show: alert,
    success(title, text, position, timeout) {
        alert("success", title, text, position, timeout);
    },
    info(title, text, position, timeout) {
        alert("info", title, text, position, timeout);
    },
    warning(title, text, position, timeout) {
        alert("warning", title, text, position, timeout);
    },
    error(title, text, position, timeout) {
        alert("error", title, text, position, timeout);
    },
    question(title, text, position, timeout) {
        alert("question", title, text, position, timeout);
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
    get tagList() {
        return this.tagListStorage.get([]);
    }
    set tagList(value) {
        this.tagListStorage.set(value);
    }
    get api() {
        return this.apiStorage.get("");
    }
    set api(value) {
        this.apiStorage.set(value);
    }
    get history() {
        const historyData = this.historyStorage.get([]);
        return new Map(historyData);
    }
    set history(value) {
        this.historyStorage.set(Array.from(value));
    }
};

async function getFlomeApi() {
    const result = await Prompt.input("Enter Flome API", config.api);
    if (result && result.startsWith("https://flomoapp.com/iwh")) {
        config.api = result;
        return;
    } else if (result) {
        Alert.error("\u8f93\u5165\u9519\u8befAPI");
        return;
    }
}

async function inputPrevTags() {
    const result = await Prompt.input("\u8f93\u5165\u9ed8\u8ba4\u6807\u7b7e\n(\u591a\u4e2a\u6807\u7b7e\u901a\u8fc7\u534a\u89d2\u9017\u53f7\u5206\u5272)", config.tagList.join(", "));
    let tagList = [];
    if (result) {
        tagList = result.split(",").map((tag => tag.trim()));
        config.tagList = tagList;
    }
}

const api_pushContent = async (api, content) => {
    const response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: content
        })
    });
    return response.json();
};

async function flomeInput(defaultValue = "") {
    if (!config.api) {
        Alert.warning("\u8bf7\u8f93\u5165 Flome APi");
        return;
    }
    const result = await Prompt.textarea("\u8f93\u5165 Flome \u7b14\u8bb0", defaultValue + (config.history.get(document.URL) === "undefined" || !config.history.get(document.URL) ? "" : config.history.get(document.URL)), {
        handleOpen: textarea => {
            const history = config.history;
            textarea.addEventListener("input", (() => {
                history.set(document.URL, textarea.value.replace(defaultValue, ""));
                config.history = history;
            }));
            textarea.addEventListener("keydown", (e => {
                if (e.ctrlKey && e.keyCode === 13) {
                    e.preventDefault();
                    Swal.clickConfirm();
                }
            }));
        }
    });
    if (!result) {
        return;
    }
    let response;
    try {
        response = await api_pushContent(config.api, result);
    } catch (e) {
        Alert.error("Api\u9519\u8bef");
        throw e;
    }
    if (response.message === "\u5df2\u8bb0\u5f55") {
        Alert.success("\u5df2\u8bb0\u5f55\u5230 Flome.");
    }
}

function getDefaultContent() {
    let defaultValue = "";
    defaultValue += config.tagList.reduce(((prev, current) => `${prev}#${current} `), "") + "\n";
    defaultValue += `[${document.title}](${document.URL})\n`;
    return defaultValue;
}

(async () => {
    const configApiMenu = new GMConfigMenu(getFlomeApi);
    configApiMenu.open("\u8f93\u5165 Flome APi");
    const configTagsMenu = new GMConfigMenu(inputPrevTags);
    configTagsMenu.open("\u8f93\u5165\u9ed8\u8ba4\u6807\u7b7e");
    const openFlomeMenu = new GMConfigMenu(flomeInput.bind(null, getDefaultContent()));
    openFlomeMenu.open("\u8f93\u5165 Flome \u7b14\u8bb0");
})();
