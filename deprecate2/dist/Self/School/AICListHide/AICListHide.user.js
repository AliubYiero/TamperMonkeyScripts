var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function getElement(parent, selector, timeoutPerMs = 0) {
  return new Promise((resolve) => {
    parent || (parent = document.body);
    let result = parent.querySelector(selector);
    if (result)
      return resolve(result);
    let timer;
    const mutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver;
    if (mutationObserver) {
      const observer = new mutationObserver((mutations) => {
        for (let mutation of mutations) {
          for (let addedNode of mutation.addedNodes) {
            if (addedNode instanceof Element) {
              result = addedNode.matches(selector) ? addedNode : addedNode.querySelector(selector);
              if (result) {
                observer.disconnect();
                timer && clearTimeout(timer);
                return resolve(result);
              }
            }
          }
        }
      });
      observer.observe(parent, {
        childList: true,
        subtree: true
      });
      if (timeoutPerMs > 0) {
        timer = setTimeout(() => {
          observer.disconnect();
          return resolve(null);
        }, timeoutPerMs);
      }
    }
  });
}
const addStyle = (cssString) => {
  GM_addStyle(cssString);
};
(async () => {
  await getElement(document.body, ".tb > li");
  addStyle(".hide {display: none !important}");
  const nodeList = {
    li: document.querySelectorAll(".tb > li")
  };
  class Module {
    constructor(li) {
      __publicField(this, "domList");
      this.domList = {
        li
      };
      this.domList.a = this.domList.li.querySelector("a");
    }
    hide() {
      this.domList.li.classList.add("hide");
    }
    getTitle() {
      return this.domList.a.title;
    }
    // 向本地存储输入值
    setTitleToLocalStorage(isHide = false) {
      localStorage.setItem(this.getTitle(), String(isHide));
    }
    // 从本地存储中获取值
    getTitleToLocalStorage() {
      return localStorage.getItem(this.getTitle());
    }
  }
  nodeList.li.forEach((li) => {
    const module = new Module(li);
    const isHide = module.getTitleToLocalStorage();
    if (isHide === "true") {
      module.hide();
    } else if (isHide === null) {
      module.setTitleToLocalStorage();
    }
  });
})();
