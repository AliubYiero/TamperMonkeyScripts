// ==UserScript==
// @name		Warframe Market交易助手
// @name:en		Warframe Market Manager
// @description		Warframe Market交易助手
// @description:en		Warframe Market交易助手.
// @author		Yiero
// @version		beta_1.0.1
// @match		https://warframe.market/zh-hans/*
// @license		GPL
// @icon		https://warframe.market/favicon.ico
// @run-at		document-idle
// @grant		GM_addElement
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts/
// @require		file://D:\Code\JavaScript\2023\8-9\TamperMonkey\tampermonkey-demo\dist\Warframe\Warframe Market Manager\Warframe Market Manager.js
// @require		https://cdn.bootcdn.net/ajax/libs//sweetalert2/11.7.27/sweetalert2.min.js
// ==/UserScript==
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function freshListenerPushState(callback, s = 1) {
  callback();
  let _pushState = window.history.pushState;
  window.history.pushState = function() {
    setTimeout(callback, s * 1e3);
    return _pushState.apply(this, arguments);
  };
}
const getItemName = () => {
  const ITEM_PREV = "items/";
  const itemNameStartIndex = location.pathname.indexOf(ITEM_PREV) + ITEM_PREV.length;
  const itemName = location.pathname.slice(itemNameStartIndex);
  return itemName;
};
const getApi = async (url) => {
  const r = await fetch(url);
  return await r.json();
};
const API_PREV_URL = "https://api.warframe.market/v1/items/";
const TIMEOUT_EXPIRE = {
  ONE_DAY: 1 * 24 * 60 * 60 * 1e3,
  // 1天
  TWO_DAY: 2 * 24 * 60 * 60 * 1e3,
  // 2天
  THREE_DAY: 3 * 24 * 60 * 60 * 1e3,
  // 3天
  SEVEN_DAY: 7 * 24 * 60 * 60 * 1e3
  // 7天
};
const api_GetOrderDescription = async (itemName) => {
  let res = await getApi(API_PREV_URL + itemName);
  return res.payload.item.items_in_set.map(
    (orderDescription) => Object.assign(
      {},
      {
        url_name: orderDescription.url_name,
        quantity_for_set: orderDescription.quantity_for_set || 1,
        ducats: orderDescription.ducats
      },
      orderDescription["zh-hans"]
    )
  );
};
const api_GetOrderDetails = async (itemName) => {
  return getApi(API_PREV_URL + itemName + "/orders").then(
    (res) => {
      return res.payload.orders.filter(
        (order) => order.order_type === "sell" && order.visible && Date.now() - Date.parse(order.user.last_seen) < TIMEOUT_EXPIRE.THREE_DAY
      );
    }
  );
};
const parseStandardPlatinumPrice = (platinumGroup) => {
  const platinumGroupTuple = Object.entries(platinumGroup);
  const sortedNumberPlatinumGroup = platinumGroupTuple.toSorted(
    (a, b) => b[1].length - a[1].length
  );
  const sortedPricePlatinumGroup = platinumGroupTuple.toSorted(
    (a, b) => Number(a[0]) - Number(b[0])
  );
  const minPrice = Number(sortedPricePlatinumGroup[0][0]);
  const minPriceOnline = Number(sortedPricePlatinumGroup.find(
    (item) => item[1].find((detail) => detail.user.status === "ingame")
  )[0]);
  const price = Number(sortedNumberPlatinumGroup[0][0]);
  const number = Number(sortedNumberPlatinumGroup[0][1].length);
  const secondPrice = Number(sortedNumberPlatinumGroup[1][0]);
  const secondNumber = Number(sortedNumberPlatinumGroup[1][1].length);
  return {
    minPrice,
    minPriceOnline,
    price,
    number,
    secondPrice,
    secondNumber
  };
};
const groupByPlatinum = (orderList) => {
  return Object.groupBy(
    orderList,
    (order) => order.platinum
  );
};
const printParseOrderDetail = (orderDescription, standardPlatinum) => {
  const parseList = [];
  const {
    url_name,
    item_name,
    description,
    quantity_for_set,
    ducats
  } = orderDescription;
  const {
    minPrice,
    minPriceOnline,
    price,
    number,
    secondPrice,
    secondNumber
  } = standardPlatinum;
  const ducatsCostEffective = ducats && Math.round(ducats / standardPlatinum.price * 100) / 100;
  parseList.push(`名称: ${item_name} ( ${url_name} )`);
  parseList.push(`描述: ${description}`);
  parseList.push(`需求数量: ${quantity_for_set}`);
  parseList.push(`标准价: ${price} ( ${number}个在售 )`);
  parseList.push(`第二标准价: ${secondPrice} ( ${secondNumber}个在售 )`);
  parseList.push(`最低价: ${minPrice} ( 当前在线最低价 ${minPriceOnline} )`);
  if (ducatsCostEffective) {
    parseList.push(`售出杜卡德金币数量: ${ducats}`);
    parseList.push(`售出杜卡德金币性价比: ${ducatsCostEffective} (根据标准值计算, 1白金 = ${ducatsCostEffective}杜卡德金币)`);
  }
  return parseList.join("\n");
};
const parseOrder = async () => {
  const itemName = getItemName();
  const orderDescriptionList = await api_GetOrderDescription(itemName);
  let parseOrderDetailList = orderDescriptionList.map(async (orderDescription) => {
    const {
      url_name
    } = orderDescription;
    const orderList = await api_GetOrderDetails(url_name);
    const standardPlatinum = parseStandardPlatinumPrice(groupByPlatinum(orderList));
    const parseResult = printParseOrderDetail(orderDescription, standardPlatinum);
    return parseResult;
  });
  const topCurrentParseOrderDetailList = [];
  for (const parseOrderDetail of parseOrderDetailList) {
    const orderDetail = await parseOrderDetail;
    if (orderDetail.includes(itemName)) {
      topCurrentParseOrderDetailList.unshift(orderDetail);
    } else {
      topCurrentParseOrderDetailList.push(orderDetail);
    }
  }
  return topCurrentParseOrderDetailList;
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
  group() {
    console.group(this.header);
  }
  groupEnd() {
    console.groupEnd();
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
   * @param { function:boolean | boolean } condition
   * @param { function } callback
   * */
  add(condition, callback) {
    if (typeof condition === "boolean") {
      this.branchList.push([() => condition, callback]);
    } else {
      this.branchList.push([condition, callback]);
    }
    return this;
  }
  /**
   * 添加默认分支, 无条件默认触发
   * @param { function } callback
   * */
  default(callback) {
    this.add(true, callback);
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
function elementWaiter(selector, config = document.body, timeoutPerSecond = 0, delayPerSecond = 0) {
  let parent = document.body;
  if (config && "parent" in config) {
    delayPerSecond = config.delayPerSecond || 0;
    timeoutPerSecond = config.timeoutPerSecond || 0;
    parent = config.parent || document.body;
  }
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
const addAlertNode = (selector, content) => {
  const parentNode = getEl(selector);
  const standardPriceStringNode = GM_addElement("div", {
    style: "margin-left: 10px;"
  });
  standardPriceStringNode.innerHTML = '<a class="link">标准价</a>';
  standardPriceStringNode.addEventListener("click", () => {
    content = `<div style="text-align: left">${content.split("\n").map((item) => `<p>${item}</p>`).join("")}</div>`;
    Swal.fire({
      // Set the title of the alert
      titleText: "标准价",
      html: content,
      // Set the position of the alert, default to 'center'
      position: "center",
      // Set the type of the alert
      info: "info",
      width: 800,
      // Show the confirm button
      showConfirmButton: true,
      // Set the timeout duration in milliseconds, default to 1500
      timer: 30 * 1e3
    });
  });
  parentNode.appendChild(standardPriceStringNode);
  return standardPriceStringNode;
};
(async () => {
  const entryBranch = new EntryBranch();
  freshListenerPushState(async () => {
    entryBranch.add(
      document.URL.startsWith("https://warframe.market/zh-hans/items/"),
      ItemSearchFunction
    );
  });
  async function ItemSearchFunction() {
    console.log(1123);
    const initPriceElement = (() => {
      let priceElement;
      let parseOrderList;
      let parseOrderString;
      return async () => {
        parseOrderList = await parseOrder();
        parseOrderString = parseOrderList.join("\n--------------------------------\n");
        if (priceElement) {
          priceElement.remove();
        }
        await elementWaiter('[class^="wiki-desc--"]');
        priceElement = addAlertNode('[class^="wiki-desc--"]', parseOrderString);
        console.info(parseOrderString);
      };
    })();
    await initPriceElement();
  }
})();
