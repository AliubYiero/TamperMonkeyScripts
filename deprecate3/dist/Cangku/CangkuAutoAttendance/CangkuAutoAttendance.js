// ==UserScript==
// @name		绅士仓库自动签到
// @name:en		CangkuAutoAttendance
// @description		绅士仓库自动签到
// @description:en		绅士仓库自动签到
// @author		Yiero
// @version		beta_1.0.0
// @match		https://cangku.moe/
// @icon		https://cangku.moe/favicon.ico
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @license		GPL
// @run-at		document-idle
// @require		file://D:\Code\tampermonkey-demo\dist\Cangku\CangkuAutoAttendance\CangkuAutoAttendance.js
// ==/UserScript==
function getElement(parent = document.body, selector, timeoutPerSecond = 0, getElementDelayPerSecond = 0) {
  return new Promise((resolve) => {
    let result = parent.querySelector(selector);
    if (result) {
      return resolve(result);
    }
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
                setTimeout(() => {
                  return resolve(result);
                }, getElementDelayPerSecond * 1e3);
              }
            }
          }
        }
      });
      observer.observe(parent, {
        childList: true,
        subtree: true
      });
      if (timeoutPerSecond > 0) {
        timer = setTimeout(() => {
          observer.disconnect();
          return resolve(null);
        }, timeoutPerSecond * 1e3);
      }
    }
  });
}
document.querySelector.bind(document);
const getEls = document.querySelectorAll.bind(document);
(async () => {
  await getElement(document.body, ".operate", 0, 1);
  const operateList = getEls(".operate > li > a");
  if (operateList.length === 3) {
    const attendanceBtn = operateList[1];
    attendanceBtn.click();
  }
})();
