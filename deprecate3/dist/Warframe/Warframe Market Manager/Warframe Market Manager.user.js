// ==UserScript==
// @name		Warframe Market交易助手
// @name:en		Warframe Market Manager
// @description		Warframe Market交易助手
// @description:en		Warframe Market交易助手.
// @author		Yiero
// @version		1.0.1
// @match		https://warframe.market/zh-hans/*
// @license		GPL
// @icon		https://warframe.market/favicon.ico
// @run-at		document-idle
// @grant		GM_addElement
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

function freshListenerPushState(callback, s = 1) {
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

const getApi = async url => {
    const r = await fetch(url);
    return await r.json();
};

const API_PREV_URL = "https://api.warframe.market/v1/items/";

const TIMEOUT_EXPIRE = {
    ONE_DAY: 1 * 24 * 60 * 60 * 1e3,
    TWO_DAY: 2 * 24 * 60 * 60 * 1e3,
    THREE_DAY: 3 * 24 * 60 * 60 * 1e3,
    SEVEN_DAY: 7 * 24 * 60 * 60 * 1e3
};

const api_GetOrderDescription = async itemName => {
    let res = await getApi(API_PREV_URL + itemName);
    return res.payload.item.items_in_set.map((orderDescription => Object.assign({}, {
        url_name: orderDescription.url_name,
        quantity_for_set: orderDescription.quantity_for_set || 1,
        ducats: orderDescription.ducats
    }, orderDescription["zh-hans"])));
};

const api_GetOrderDetails = async itemName => getApi(API_PREV_URL + itemName + "/orders").then((res => res.payload.orders.filter((order => order.order_type === "sell" && order.visible && Date.now() - Date.parse(order.user.last_seen) < TIMEOUT_EXPIRE.THREE_DAY))));

const parseStandardPlatinumPrice = platinumGroup => {
    const platinumGroupTuple = Object.entries(platinumGroup);
    const sortedNumberPlatinumGroup = platinumGroupTuple.toSorted(((a, b) => b[1].length - a[1].length));
    const sortedPricePlatinumGroup = platinumGroupTuple.toSorted(((a, b) => Number(a[0]) - Number(b[0])));
    const minPrice = Number(sortedPricePlatinumGroup[0][0]);
    const minPriceOnline = Number(sortedPricePlatinumGroup.find((item => item[1].find((detail => detail.user.status === "ingame"))))[0]);
    const price = Number(sortedNumberPlatinumGroup[0][0]);
    const number = Number(sortedNumberPlatinumGroup[0][1].length);
    const secondPrice = Number(sortedNumberPlatinumGroup[1][0]);
    const secondNumber = Number(sortedNumberPlatinumGroup[1][1].length);
    return {
        minPrice: minPrice,
        minPriceOnline: minPriceOnline,
        price: price,
        number: number,
        secondPrice: secondPrice,
        secondNumber: secondNumber
    };
};

const groupByPlatinum = orderList => Object.groupBy(orderList, (order => order.platinum));

const printParseOrderDetail = (orderDescription, standardPlatinum) => {
    const parseList = [];
    const {url_name: url_name, item_name: item_name, description: description, quantity_for_set: quantity_for_set, ducats: ducats} = orderDescription;
    const {minPrice: minPrice, minPriceOnline: minPriceOnline, price: price, number: number, secondPrice: secondPrice, secondNumber: secondNumber} = standardPlatinum;
    const ducatsCostEffective = ducats && Math.round(ducats / standardPlatinum.price * 100) / 100;
    parseList.push(`\u540d\u79f0: ${item_name} ( ${url_name} )`);
    parseList.push(`\u63cf\u8ff0: ${description}`);
    parseList.push(`\u9700\u6c42\u6570\u91cf: ${quantity_for_set}`);
    parseList.push(`\u6807\u51c6\u4ef7: ${price} ( ${number}\u4e2a\u5728\u552e )`);
    parseList.push(`\u7b2c\u4e8c\u6807\u51c6\u4ef7: ${secondPrice} ( ${secondNumber}\u4e2a\u5728\u552e )`);
    parseList.push(`\u6700\u4f4e\u4ef7: ${minPrice} ( \u5f53\u524d\u5728\u7ebf\u6700\u4f4e\u4ef7 ${minPriceOnline} )`);
    if (ducatsCostEffective) {
        parseList.push(`\u552e\u51fa\u675c\u5361\u5fb7\u91d1\u5e01\u6570\u91cf: ${ducats}`);
        parseList.push(`\u552e\u51fa\u675c\u5361\u5fb7\u91d1\u5e01\u6027\u4ef7\u6bd4: ${ducatsCostEffective} (\u6839\u636e\u6807\u51c6\u503c\u8ba1\u7b97, 1\u767d\u91d1 = ${ducatsCostEffective}\u675c\u5361\u5fb7\u91d1\u5e01)`);
    }
    return parseList.join("\n");
};

const parseOrder = async () => {
    const itemName = getItemName();
    const orderDescriptionList = await api_GetOrderDescription(itemName);
    let parseOrderDetailList = orderDescriptionList.map((async orderDescription => {
        const {url_name: url_name} = orderDescription;
        const orderList = await api_GetOrderDetails(url_name);
        const standardPlatinum = parseStandardPlatinumPrice(groupByPlatinum(orderList));
        const parseResult = printParseOrderDetail(orderDescription, standardPlatinum);
        return parseResult;
    }));
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
        __publicField(this, "projectName");
        __publicField(this, "header");
        this.projectName = projectName;
        this.header = `[${projectName}]`;
    }
    log(...msg) {
        (() => {})(...this.contentInfo(...msg));
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
        return [ this.header, ...msg ];
    }
}

class EntryBranch {
    constructor() {
        __publicField(this, "branchList", []);
    }
    add(condition, callback) {
        if (typeof condition === "boolean") {
            this.branchList.push([ () => condition, callback ]);
        } else {
            this.branchList.push([ condition, callback ]);
        }
        return this;
    }
    default(callback) {
        this.add(true, callback);
        return this;
    }
    run() {
        const entry = this.branchList.find((entry2 => entry2[0]()));
        if (entry) {
            new Info("EntryBranch").log("\u8fdb\u5165\u5206\u652f", entry);
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
    const entryBranch = new EntryBranch;
    return new Promise(((resolve, reject) => {
        function returnElement(element) {
            if (!element) {
                reject(new Error("void Element"));
                return;
            }
            setTimeout((() => {
                dispatchEvent(new CustomEvent("getElement", {
                    detail: element
                }));
                resolve(element);
            }), delayPerSecond * 1e3);
        }
        entryBranch.add((() => !!document.querySelector(selector)), (() => {
            returnElement(document.querySelector(selector));
        })).add((() => !!MutationObserver), (() => {
            const timer = timeoutPerSecond && window.setTimeout((() => {
                observer.disconnect();
                returnElement();
            }), timeoutPerSecond * 1e3);
            const observer = new MutationObserver(observeElementCallback);
            function observeElementCallback(mutations) {
                mutations.forEach((mutation => {
                    mutation.addedNodes.forEach((addNode => {
                        if (!(addNode instanceof HTMLElement)) {
                            return;
                        }
                        const element = addNode.matches(selector) ? addNode : addNode.querySelector(selector);
                        if (element) {
                            timer && clearTimeout(timer);
                            returnElement(element);
                        }
                    }));
                }));
            }
            observer.observe(parent, {
                subtree: true,
                childList: true
            });
        })).default((() => {
            const intervalDelay = 500;
            let intervalCounter = 0;
            const maxIntervalCounter = Math.ceil((timeoutPerSecond * 1e3 || 20 * 1e3) / intervalDelay);
            const timer = window.setInterval((() => {
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
            }), intervalDelay);
        })).run();
    }));
}

const getEl = document.querySelector.bind(document);

document.querySelectorAll.bind(document);

const addAlertNode = (selector, content) => {
    const parentNode = getEl(selector);
    const standardPriceStringNode = GM_addElement("div", {
        style: "margin-left: 10px;"
    });
    standardPriceStringNode.innerHTML = '<a class="link">\u6807\u51c6\u4ef7</a>';
    standardPriceStringNode.addEventListener("click", (() => {
        content = `<div style="text-align: left">${content.split("\n").map((item => `<p>${item}</p>`)).join("")}</div>`;
        Swal.fire({
            titleText: "\u6807\u51c6\u4ef7",
            html: content,
            position: "center",
            info: "info",
            width: 800,
            showConfirmButton: true,
            timer: 30 * 1e3
        });
    }));
    parentNode.appendChild(standardPriceStringNode);
    return standardPriceStringNode;
};

(async () => {
    const entryBranch = new EntryBranch;
    entryBranch.add(document.URL.startsWith("https://warframe.market/zh-hans/items/"), ItemSearchFunction);
    async function ItemSearchFunction() {
        let parseOrderList;
        let parseOrderString;
        parseOrderList = await parseOrder();
        parseOrderString = parseOrderList.join("\n--------------------------------\n");
        const initPriceElement = (() => {
            let priceElement;
            return async () => {
                if (priceElement) {
                    priceElement.remove();
                }
                await elementWaiter('[class^="wiki-desc--"]');
                priceElement = addAlertNode('[class^="wiki-desc--"]', parseOrderString);
                console.info(parseOrderString);
            };
        })();
        await initPriceElement();
        freshListenerPushState((async () => {
            parseOrderList = await parseOrder();
            parseOrderString = parseOrderList.join("\n--------------------------------\n");
            await initPriceElement();
        }));
    }
})();
