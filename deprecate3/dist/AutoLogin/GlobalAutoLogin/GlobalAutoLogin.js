// ==UserScript==
// @name		通用自动登录
// @name:en		GlobalAutoLogin
// @description		通用自动登录. 
// @description:en		通用自动登录. 
// @author		Yiero
// @version		beta_1.0.0
// @match		https://*/*
// @icon		https://tampermonkey.com/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @license		GPL
// @run-at		document-idle
// @require		file://D:\Code\tampermonkey-demo\dist\AutoLogin\GlobalAutoLogin\GlobalAutoLogin.js
// ==/UserScript==
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Info {
  constructor(projectName) {
    // @ts-ignore
    __publicField(this, "projectName");
    __publicField(this, "header");
    this.projectName = projectName;
    this.header = `[${projectName}]`;
  }
  log(...msg) {
    console.log(...this.contentInfo(...msg));
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
    return [this.header, ...msg];
  }
}
class EntryBranch {
  constructor() {
    __publicField(this, "branchList", []);
  }
  /**
   * 添加分支
   * @param { function:boolean } condition
   * @param { function } callback
   * */
  add(condition, callback) {
    this.branchList.push([condition, callback]);
    return this;
  }
  /**
   * 添加默认分支, 无条件默认触发
   * @param { function } callback
   * */
  default(callback) {
    this.branchList.push([() => true, callback]);
    return this;
  }
  /**
   * 运行, 查看是否存在能够运行的入口
   * */
  run() {
    const entry = this.branchList.find((entry2) => entry2[0]());
    if (entry) {
      new Info("EntryBranch").log("进入分支", entry);
      entry[1]();
    }
  }
}
function isMatchURL(...regExpList) {
  const matchResultList = [];
  regExpList.forEach((regExp) => {
    if (typeof regExp === "string") {
      regExp = new RegExp(regExp);
    }
    matchResultList.push(!!document.URL.match(regExp));
  });
  return matchResultList.includes(true);
}
function inputEvent(aimElement, inputContent) {
  aimElement.dispatchEvent(new Event("focus"));
  aimElement.value = inputContent;
  aimElement.dispatchEvent(new Event("focus"));
  aimElement.dispatchEvent(new Event("change"));
  aimElement.dispatchEvent(new Event("input"));
  aimElement.dispatchEvent(new Event("blur"));
}
function elementWaiter(selector, parent = document.body, timeoutPerSecond = 0, delayPerSecond = 0) {
  parent || (parent = document.body);
  const entryBranch = new EntryBranch();
  return new Promise((resolve, reject) => {
    function returnElement(element) {
      if (!element) {
        reject(new Error("void Element"));
        return;
      }
      setTimeout(() => {
        dispatchEvent(new CustomEvent("getElement", { detail: element }));
        resolve(element);
      }, delayPerSecond * 1e3);
    }
    entryBranch.add(
      () => !!document.querySelector(selector),
      () => {
        returnElement(document.querySelector(selector));
      }
    ).add(
      () => !!MutationObserver,
      () => {
        const timer = timeoutPerSecond && window.setTimeout(() => {
          observer.disconnect();
          returnElement();
        }, timeoutPerSecond * 1e3);
        const observer = new MutationObserver(observeElementCallback);
        function observeElementCallback(mutations) {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((addNode) => {
              if (!(addNode instanceof HTMLElement)) {
                return;
              }
              const element = addNode.matches(selector) ? addNode : addNode.querySelector(selector);
              if (element) {
                timer && clearTimeout(timer);
                returnElement(element);
              }
            });
          });
        }
        observer.observe(parent, {
          subtree: true,
          childList: true
        });
      }
    ).default(
      () => {
        const intervalDelay = 500;
        let intervalCounter = 0;
        const maxIntervalCounter = Math.ceil((timeoutPerSecond * 1e3 || 20 * 1e3) / intervalDelay);
        const timer = window.setInterval(() => {
          if (++intervalCounter > maxIntervalCounter) {
            clearInterval(timer);
            returnElement();
            return;
          }
          const element = parent.querySelector(selector);
          if (element) {
            clearInterval(timer);
            returnElement(element);
          }
        }, intervalDelay);
      }
    ).run();
  });
}
const getEl = document.querySelector.bind(document);
document.querySelectorAll.bind(document);
class CreateLoginInfo {
  constructor(usernameSelector, passwordSelector, loginBtnSelector, username, password) {
    __publicField(this, "selector", { username: "", password: "", login: "" });
    __publicField(this, "userinfo", {});
    this.selector = {
      username: usernameSelector,
      password: passwordSelector,
      login: loginBtnSelector
    };
    if (username && password) {
      this.userinfo = {
        username,
        password
      };
    }
  }
}
const loginInfoConfig = {
  jd: {
    matchUrl: ["^https://passport.jd.com/new/login.aspx", "^https://passport.jd.com/uc/login"],
    info: new CreateLoginInfo(
      "#loginname",
      "#nloginpwd",
      "#loginsubmit"
    )
  },
  taobao: {
    matchUrl: "https://login.taobao.com/member/login.jhtml",
    info: new CreateLoginInfo(
      "#fm-login-id",
      "#fm-login-password",
      ".fm-submit.password-login"
    )
  },
  gdkmAic: {
    matchUrl: "^https://aic.gdkmxy.cn/xsgl/xs/login/login.aspx",
    info: new CreateLoginInfo(
      "#signupInputUserName",
      "#signupInputPassword",
      "#login_new",
      "22060201302",
      "9512635748.Sqy"
    )
  }
};
function autoLogin(config) {
  const usernameInput = getEl(config.selector.username);
  const passwordInput = getEl(config.selector.password);
  const loginBtn = getEl(config.selector.login);
  const loginBranch = new EntryBranch();
  loginBranch.add(
    () => Boolean(usernameInput.value && passwordInput.value),
    loginBtn.click
  ).add(
    () => Boolean(config.userinfo.username && config.userinfo.password),
    () => {
      if (!(config.userinfo.username && config.userinfo.password)) {
        return;
      }
      inputEvent(usernameInput, config.userinfo.username);
      inputEvent(passwordInput, config.userinfo.password);
      loginBtn.click();
    }
  ).add(
    () => true,
    () => {
      setTimeout(() => {
        loginBtn.click();
      }, 3e3);
    }
  ).run();
}
(async () => {
  const entryBranch = new EntryBranch();
  for (let loginInfoConfigKey in loginInfoConfig) {
    const loginInfo = loginInfoConfig[loginInfoConfigKey];
    entryBranch.add(
      () => {
        if (Array.isArray(loginInfo.matchUrl)) {
          return isMatchURL(...loginInfo.matchUrl);
        } else {
          return isMatchURL(loginInfo.matchUrl);
        }
      },
      async () => {
        await elementWaiter(loginInfo.info.selector.login);
        autoLogin(loginInfo.info);
      }
    );
  }
  entryBranch.run();
})();
