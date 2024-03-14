var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function ElementMutationObserverOnce(fatherElementSelector, aimElementSelector, callback) {
  const fatherElement = document.querySelector(fatherElementSelector);
  const observer = new MutationObserver((e) => {
    const aimElement = fatherElement.querySelector(aimElementSelector);
    if (aimElement) {
      observer.disconnect();
      if (callback) {
        callback(aimElement);
      }
    }
  });
  observer.observe(fatherElement, {
    subtree: true,
    childList: true
  });
}
class Info {
  constructor(projectName) {
    // @ts-ignore
    __publicField(this, "projectName");
    __publicField(this, "header");
    this.projectName = projectName;
    this.header = `[${projectName}]`;
  }
  log(...msg) {
    /* @__PURE__ */ (() => {
    })(...this.contentInfo(...msg));
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
  contentInfo(...msg) {
    return [this.header, `[${(/* @__PURE__ */ new Date()).toLocaleString("zh-ch")}]`, ...msg];
  }
}
const registerMenu = (title, callback) => {
  return GM_registerMenuCommand(title, function() {
    callback();
  });
};
const createElement = (elementConfig) => {
  const { tagName, className, id, innerHTML, innerText } = elementConfig;
  const element = document.createElement(tagName);
  if (className && typeof className === "string") {
    element.classList.add(className);
  } else if (className && Array.isArray(className)) {
    element.classList.add(...className);
  }
  if (id) {
    element.id = id;
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  if (innerText) {
    element.innerText = innerText;
  }
  for (let elementConfigKey in elementConfig) {
    if (["tagName", "className", "id", "innerHTML", "innerText"].indexOf(elementConfigKey) !== -1) {
      continue;
    }
    element.setAttribute(elementConfigKey, elementConfig[elementConfigKey]);
  }
  return element;
};
const addElementToDocument = (element, cssString, fatherElement = document.body) => {
  fatherElement.append(element);
  GM_addStyle(cssString);
};
const addHideClass = () => {
  GM_addStyle(`.hide {display: none !important}`);
};
const tupleToObject = (keyArray, valueArray) => {
  return keyArray.reduce((obj, key, index) => {
    obj[key] = valueArray[index];
    return obj;
  }, {});
};
class GMStorage {
  constructor(key) {
    __publicField(this, "key");
    this.key = key;
  }
  /** 设置/更新键 */
  static set(key, value) {
    GM_setValue(key, value);
  }
  /** 获取值 */
  static get(key, defaultValue = null) {
    return GM_getValue(key, defaultValue);
  }
  /** 移除键 */
  static remove(key) {
    GM_deleteValue(key);
  }
  /** 设置/更新键 */
  set(value) {
    GM_setValue(this.key, value);
  }
  /** 批量设置/更新键 */
  setList(keyValueObject) {
    for (let key in keyValueObject) {
      const value = keyValueObject[key];
      GMStorage.set(key, value);
    }
  }
  /** 获取值 */
  get(defaultValue = null) {
    return GM_getValue(this.key, defaultValue);
  }
  /** 批量获取值 */
  getList(keys, defaultValue = null) {
    const values = [];
    keys.forEach((key) => {
      values.push(GMStorage.get(key, defaultValue));
    });
    return values;
  }
  /** 移除键 */
  remove() {
    GM_deleteValue(this.key);
  }
  /**
   * 返回所有键
   * */
  keys() {
    return GM_listValues();
  }
  /** 返回所有值 */
  values() {
    const values = [];
    const keys = this.keys();
    keys.forEach((key) => {
      values.push(GMStorage.get(key));
    });
    return values;
  }
  /** 返回所有键值对对象 */
  getAll() {
    const keys = this.keys();
    const values = this.values();
    return tupleToObject(keys, values);
  }
  /** 清除所有储存 */
  clear() {
    const keys = this.keys();
    keys.forEach((key) => {
      GMStorage.remove(key);
    });
  }
}
function prompt(title, mountedCallback, confirmCallback) {
  const element = createElement({
    tagName: "section",
    className: ["custom-prompt__container", "hide"],
    innerHTML: `
		<header>
			<h3 class="custom-prompt__title">${title}</h3>
		</header>
		<main>
			<input class="custom-prompt__input" type="text">
		</main>
		<footer class="custom-prompt__confirm-btn">
			<button>确认</button>
			<button>取消</button>
		</footer>
		`
  });
  const cssString = `
	.custom-prompt__container {
		width: 400px;
		height: 125px;
		background: #f8f8f8;
		border-radius: 15px;
		box-sizing: border-box;
		padding: 20px;
		
		box-shadow: 2px 2px #a6a6a6;
		
		display: flex;
		justify-content: center;
		flex-flow: column;
		
		position: fixed;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10002;
	}
	
	h3.custom-prompt__title {
		margin: 10px -0px;
	}
	
	input.custom-prompt__input {
		width: 100%;
		border: #a6a6a6 2px solid;
		border-radius: 5px;
		box-sizing: border-box;
		padding: 5px 10px;
	}
	
	.custom-prompt__confirm-btn {
		margin-top: 10px;
		align-self: flex-end;
	}
	
	.custom-prompt__confirm-btn > button {
		padding: 3px;
		border-radius: 5px;
		border: 2px #a6a6a6 solid;
	}
	
	.custom-prompt__confirm-btn > button:hover {
		border: 2px cornflowerblue solid;
		color: cornflowerblue;
	}
	
	.custom-prompt__container.hide {
		display: none;
	}
	`;
  const htmlElements = {
    confirmBtn: element.querySelector(".custom-prompt__confirm-btn > button:first-of-type"),
    cancelBtn: element.querySelector(".custom-prompt__confirm-btn > button:last-of-type"),
    userInputContainer: element.querySelector(".custom-prompt__input")
  };
  mountedCallback(element);
  htmlElements.confirmBtn.addEventListener("click", () => {
    confirmCallback(element, htmlElements.userInputContainer.value);
    hide();
  });
  htmlElements.cancelBtn.addEventListener("click", hide);
  document.addEventListener("click", (e) => {
    if (element && !element.contains(e.target)) {
      hide();
    }
  });
  addElementToDocument(element, cssString);
  function hide() {
    element.classList.add("hide");
  }
  function show() {
    element.classList.remove("hide");
  }
  return show;
}
const stringToCapitalizeCase = (word) => {
  const lowerWord = word.trim().toLowerCase();
  return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
};
const bindHotkey = (() => {
  let prevEvent;
  return (hotkey, aimElement, callback) => {
    const bindKey = {
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      key: ""
    };
    if (typeof hotkey === "string") {
      const keys = hotkey.split("+");
      keys.forEach((key) => {
        switch (key.trim().toLowerCase()) {
          case "ctrl":
          case "control":
            bindKey.ctrlKey = true;
            break;
          case "alt":
            bindKey.altKey = true;
            break;
          case "shift":
            bindKey.shiftKey = true;
            break;
          default:
            bindKey.key = stringToCapitalizeCase(key);
        }
      });
    }
    if (prevEvent) {
      aimElement.removeEventListener("keydown", prevEvent);
    }
    aimElement.addEventListener("keydown", keydownCallback);
    function keydownCallback(event) {
      const e = event;
      if (e.ctrlKey === bindKey.ctrlKey && e.altKey === bindKey.altKey && e.shiftKey === bindKey.shiftKey && e.key.toLowerCase() === bindKey.key.toLowerCase()) {
        callback();
      }
    }
    prevEvent = keydownCallback;
  };
})();
new MouseEvent("mouseenter", {
  button: 0,
  bubbles: true,
  cancelable: true,
  clientX: 819,
  clientY: 413
});
new MouseEvent("mousedown", {
  bubbles: true,
  cancelable: true,
  button: 0
});
new MouseEvent("mouseup", {
  bubbles: true,
  cancelable: true,
  button: 0
});
new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  button: 0
});
(() => {
  const info = new Info("BiliBiliVideoNote-Subsidiary");
  let NoteOpenButton;
  ElementMutationObserverOnce("body", ".absolute.z-999.text-lg", (e) => {
    NoteOpenButton = e;
    addHideClass();
    e.classList.add("hide");
    registerMenu("笔记模式", () => {
      info.info("开启笔记模式");
      e.click();
    });
  });
  const bindNoteOpenHotkey = (value) => {
    info.warn(`按键 [${value}] 已绑定为全局快捷键`);
    GMStorage.set("hotkey", value);
    bindHotkey(value, document, NoteOpenButton.click);
  };
  const promptBtn = prompt(
    "设置开启视频笔记快捷键：",
    (element) => {
      const hotkey = GMStorage.get("hotkey", "");
      const input = element.querySelector("input");
      input.value = hotkey;
      bindNoteOpenHotkey(input.value);
      element.addEventListener("keydown", (e) => {
        e.preventDefault();
        let hotkeyString = "";
        if (e.ctrlKey) {
          hotkeyString += "Ctrl + ";
        }
        if (e.altKey) {
          hotkeyString += "Alt + ";
        }
        if (e.shiftKey) {
          hotkeyString += "Shift + ";
        }
        if (["Control", "Alt", "Shift"].indexOf(e.key) === -1) {
          hotkeyString += e.key.toUpperCase();
        }
        input.value = hotkeyString;
      });
    },
    // @ts-ignore
    (element, value) => {
      bindNoteOpenHotkey(value);
    }
  );
  registerMenu("配置快捷键", () => {
    promptBtn();
  });
})();
