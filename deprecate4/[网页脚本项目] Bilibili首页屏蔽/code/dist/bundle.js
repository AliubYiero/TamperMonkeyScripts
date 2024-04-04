/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
// ==UserScript==
// @name        B站首页视频屏蔽
// @namespace   https://github.com/AliubYiero/TemperScripts
// @version     beta0.1
// @description 根据关键词/BV号/AV号/UP主名称屏蔽B站首页视频
// @author      Yiero
// @match       https://www.bilibili.com/
// @icon        https://www.bilibili.com/favicon.ico
// @require		file://D:\Blog\Daily\2023.12\[网页脚本项目] Bilibili首页屏蔽\code\dist\bundle.js
// @license     GPL
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @grant       GM_listValues
// ==/UserScript==

})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/lib/NodeLoader.ts
/**
 * NodeLoader.ts
 * created by 2023/12/31
 * @file 节点加载监听器
 * @author  Yiero
 * */
/** 动态加载类 */
class NodeListLoader {
  nodeContainer;
  dispatchEventName;
  /**
   * @constructor
   * @param nodeContainer - 节点加载的主容器的 Selector (该 Selector 的子元素为动态加载的节点)
   * @param [dispatchEventName = 'NodeUpdate'] - 分发Node节点加载时触发的事件名称
   * */
  constructor(nodeContainer, dispatchEventName = 'NodeUpdate') {
    // 绑定节点加载容器
    this.nodeContainer = nodeContainer;
    // 绑定事件名称
    this.dispatchEventName = dispatchEventName;
    // 初始化
    try {
      this.init();
    } catch (e) {
      console.error('Error: Node not found.\n目标节点未加载/不存在. ');
      return;
    }
    // 绑定动态更新监听
    this.updateObserver();
  }
  /**
   * 初始化事件, 检测节点是否存在
   * */
  init() {
    /**
     * 监听容器是否存在, 若不存在, 则报错
     * */
    if (!document.querySelector(this.nodeContainer)) {
      throw new Error('Node not found.');
    }
  }
  /**
   * 获取当前所有动态
   *
   * @Return { Node[] }
   * */
  get items() {
    // 为了返回的动态列表风格统一, 将NodeList转成Array<Node>
    return Array.from(document.querySelectorAll(this.nodeContainer));
  }
  /**
   * 节点加载监听器, 当节点更新时(加载), 分发一个事件(dynamicUpdate)提示动态更新, 并返回新加载的节点 Node[]
   * */
  updateObserver() {
    const nodeUpdateObserver = new MutationObserver(recordList => {
      // 新加载的节点
      const appendNodeList = [];
      // 将新加载的节点转化成Array<Node>的形式
      recordList.forEach(record => {
        appendNodeList.push(...Array.from(record.addedNodes));
      });
      // 分发事件, 返回新节点
      window.dispatchEvent(new CustomEvent(this.dispatchEventName, {
        detail: appendNodeList
      }));
    });
    nodeUpdateObserver.observe(document.querySelector(this.nodeContainer), {
      childList: true
    });
  }
}
;// CONCATENATED MODULE: ./src/config/config.ts
/**
 * config.ts
 * created by 2023/12/31
 * @file 全局总配置
 * @author  Yiero
 * */
const config = {
  // 节点容器
  nodeContainer: '.container.is-version8',
  dispatchEventName: 'NodeUpdate'
};
;// CONCATENATED MODULE: ./src/modules/parseVideoInfo.ts
/**
 * parseVideoInfo.ts
 * created by 2023/12/31
 * @file 处理视频信息容器
 * @author  Yiero
 * */
/**
 * 输入视频节点, 返回处理后的视频对象
 *
 * @parma videoNode - 视频容器节点
 * @return { VideoInfo } - 处理后的视频信息对象
 * */
const parseVideoInfo = videoNode => {
  /** 处理非正常视频容器, 直接抛出错误 */
  // if ( !( videoNode.classList.contains( 'feed-card' ) || ( videoNode.classList.contains( 'bili-video-card' ) && videoNode.classList.contains( 'is-rcmd' ) ) ) ) {
  // 	throw new Error( 'current node is not a video container' );
  // }
  /**
   * 处理视频标题
   * */
  const titleNode = videoNode.querySelector('.bili-video-card__info--tit > a');
  const title = titleNode.textContent;
  /**
   * 处理BV号
   * */
  /* BV号视频容器 */
  const bvLinkNode = videoNode.querySelector('.bili-video-card__image--link');
  const bvId = bvLinkNode.href.match(/(?<=\/)BV1.*$/)[0];
  /**
   * 处理up主昵称
   * */
  const upNameNode = document.querySelector('.bili-video-card__info--author');
  const upName = upNameNode.textContent;
  return {
    target: videoNode,
    title,
    bv: bvId,
    up: upName
  };
};
;// CONCATENATED MODULE: ./src/storage/BandVideoStorage.ts
/**
 * 生成唯一的 BandId
 *
 * 通过 将类型和屏蔽文本进行 base64 编码后截取前 32 位获取
 *  (先进行encodeURIComponent序列化转成 ASCII 码，再进行 base64 编码)
 * */
function generateBandId(content) {
  const encryptContent = btoa(encodeURIComponent(content));
  return encryptContent.slice(0, 32) + encryptContent.slice(-32);
}
class BandVideoStorage {
  static instance = new BandVideoStorage();
  videoMap = new Map();
  // 存储名
  storageName;
  /**
   * 私有化构造方法
   * */
  constructor() {
    /**
     * init
     * */
    // 存储名
    this.storageName = 'BandVideoList';
    /**
     * 给 videoMap 赋值
     * */
    if (this.videoMap.size === 0) {
      /*
      * 获取视频信息
      * */
      const videoInfoOriginList = GM_getValue(this.storageName) || [];
      /* 将视频信息转换成Map (Object -> Map) */
      this.videoMap = new Map(videoInfoOriginList);
    }
  }
  /**
   * 获取单例储存类
   * */
  static getInstance() {
    return this.instance;
  }
  /**
   * 获取视频信息
   * */
  get() {
    /* 返回视频信息 */
    return Array.from(this.videoMap.values());
  }
  /**
   * 设置视频信息
   *
   * @param {Array<{type: BandVideoType; content: string;}>} appendVideoList
   * */
  set(appendVideoList) {
    /**
     * 遍历 appendVideoList, 储存视频信息到 videoMap 中
     * */
    appendVideoList.forEach(appendVideoInfo => {
      const {
        type,
        content
      } = appendVideoInfo;
      /*  生成唯一的 BandId */
      const bandId = generateBandId(type + content);
      /* 存储视频信息, 通过唯一的 BandId 防止重复添加 */
      this.videoMap.set(bandId, {
        band_id: bandId,
        type,
        content
      });
    });
    // // fixme debugger
    // console.log( 'videoMap:', Array.from( this.videoMap ) )
    /**
     * 将 videoMap 写入本地存储
     * */
    GM_setValue(this.storageName, Array.from(this.videoMap));
  }
}

;// CONCATENATED MODULE: ./src/interfaces/BandReadInterface.ts
/**
 * BandReadInterface.ts
 * created by 2023/12/31
 * @file 屏蔽视频的接口
 * @author  Yiero
 * */
var BandVideoType;
(function (BandVideoType) {
  BandVideoType[BandVideoType["UP"] = 0] = "UP";
  BandVideoType[BandVideoType["Title"] = 1] = "Title";
  BandVideoType[BandVideoType["BV"] = 2] = "BV";
  BandVideoType[BandVideoType["AV"] = 3] = "AV";
})(BandVideoType || (BandVideoType = {}));
;// CONCATENATED MODULE: ./src/modules/BandVideoByTypeParser.ts
/**
 * 根据给定规则隐藏节点
 *
 * @param matchRule - 一个比较两个字符串并返回布尔值的函数。
 * @param {Object} matchContent - An object containing the target node, a list of BandReadInterface objects, and a content string.
 * @param {Node} matchContent.target - The target node to be hidden.
 * @param {BandReadInterface[]} matchContent.BandVideoList - A list of BandReadInterface objects.
 * @param {string} matchContent.content - The content string used for matching.
 */
const hideNodeByRule = (matchRule, matchContent) => {
  const {
    target,
    BandVideoList,
    content
  } = matchContent;
  /* 遍历寻找是否存在屏蔽的内容 */
  const foundBandUp = BandVideoList.find(item => {
    matchRule(content, item.content);
  });
  /* 未找到, 返回 */
  if (!foundBandUp) {
    return;
  }
  /* 找到, 屏蔽视频 */
  target.classList.add('hide');
  console.info('已屏蔽视频: ', content);
};
const BandVideoByTypeParser = {
  /**
   * 根据 UP 主名称屏蔽视频
   * */
  up(upName, target, BandVideoList) {
    hideNodeByRule((compareContent, originContent) => {
      return compareContent === originContent;
    }, {
      target,
      BandVideoList,
      content: upName
    });
  },
  /**
   * 根据视频标题关键字屏蔽视频
   * */
  title(title, target, BandVideoList) {
    hideNodeByRule((compareContent, originContent) => {
      return originContent.includes(compareContent);
    }, {
      target,
      BandVideoList,
      content: title
    });
  },
  /**
   * 根据视频BV号屏蔽视频
   * */
  bv(bvId, target, BandVideoList) {
    hideNodeByRule((compareContent, originContent) => {
      return compareContent === originContent;
    }, {
      target,
      BandVideoList,
      content: bvId
    });
  }
};
;// CONCATENATED MODULE: ./src/modules/bandVideo.ts




/**
 * 读取数据库, 隐藏已屏蔽的视频
 *
 * @param {Node[]} currentVideoNodeList - 当前加载的视频列表
 * */
const bandVideo = currentVideoNodeList => {
  /*
  * 遍历当前已加载的视频节点元素, 过滤掉非视频节点
  * */
  currentVideoNodeList = currentVideoNodeList.filter(videoNode => {
    const videoContainer = videoNode;
    /* 过滤文本节点 */
    if (!videoContainer.classList) {
      return false;
    }
    /* 过滤非视频节点 */
    return videoContainer.classList.contains('feed-card') || videoContainer.classList.contains('bili-video-card') && videoContainer.classList.contains('is-rcmd') && videoContainer.querySelector('.bili-video-card__info--author + .bili-video-card__info--date');
  });
  /*
  * 遍历当前已加载的视频节点元素, 处理成视频信息
  * */
  const parseVideoInfoList = currentVideoNodeList.map(videoContainer => parseVideoInfo(videoContainer));
  /**
   * 屏蔽视频
   * */
  const bandVideoFromNode = () => {
    const bandVideoStorage = BandVideoStorage.getInstance();
    /**
     * 遍历视频信息, 如果屏蔽列表存在屏蔽的视频, 则将对应视频屏蔽 (添加 hide 类)
     * */
    parseVideoInfoList.forEach(videoInfo => {
      const {
        target,
        up,
        bv,
        title
      } = videoInfo;
      Object.entries(videoInfo).forEach(item => {
        const key = item[0];
        const value = item[1];
        /**
         * 不处理 target
         * */
        if (key === 'target') {
          return;
        }
        const BandVideoList = bandVideoStorage.get();
        /* 定义枚举 (BandVideoTypeEnum) 反向映射 */
        const typeEnumMapper = ['up', 'title', 'bv', 'av'];
        // @ts-ignore
        const BandVideoListGroupByTypeObject = Object.groupBy(BandVideoList, bandVideoItem => {
          /**
           * 如果 BandVideoList 为空, 直接返回
           * */
          if (!bandVideoItem) {
            return;
          }
          /**
           * 按类型返回
           * */
          return typeEnumMapper[bandVideoItem.type];
        });
        // @ts-ignore
        BandVideoByTypeParser[key](value, target, BandVideoListGroupByTypeObject[key] || []);
      });
    });
  };
  bandVideoFromNode();
  /**
   * 数据库存储.
   * 将当前加载的视频信息存储到本地存储中
   * */
  const operateStorage = () => {
    const bandVideoStorage = BandVideoStorage.getInstance();
    const appendVideoList = parseVideoInfoList.map(videoInfo => {
      return {
        type: BandVideoType.BV,
        content: videoInfo.bv
      };
    });
    // // fixme debugger
    // console.log( 'appendVideoList: ', appendVideoList, parseVideoInfoList );
    bandVideoStorage.set(appendVideoList);
  };
  operateStorage();
};
;// CONCATENATED MODULE: ./src/modules/videoLoadedListener.ts



/**
 * 监听视频加载
 * */
function VideoLoadedListener() {
  /* 创建监听器 */
  const dynamicLoader = new NodeListLoader(config.nodeContainer, config.dispatchEventName);
  /* 获取当前已加载的视频节点元素 */
  let currentVideoNodeList = dynamicLoader.items;
  bandVideo(currentVideoNodeList);
  /**
   * 监听视频容器加载信息
   * */
  window.addEventListener(config.dispatchEventName, e => {
    /* 获取当前已加载的视频节点元素 */
    currentVideoNodeList = e.detail;
    bandVideo(currentVideoNodeList);
    // // fixme debugger
    // console.log( '当前屏蔽的视频列表: ', GM_getValue( 'BandVideoList' ) );
  });
}
;// CONCATENATED MODULE: ./libs/ElementWaiter.ts
/**
 * ElementWaiter.ts
 * created by 2023/12/31
 * @file 获取元素工具函数, 当目标元素未加载时, 等待页面载入
 * @author  Yiero
 * */
function elementWaiter(selector, config = document.body, timeoutPerSecond = 0, delayPerSecond = 0) {
  // 默认值赋予
  let parent = document.body;
  if (config && 'parent' in config) {
    delayPerSecond = config.delayPerSecond || 0;
    timeoutPerSecond = config.timeoutPerSecond || 0;
    parent = config.parent || document.body;
  }
  return new Promise((resolve, reject) => {
    /**
     * 工具函数: 延时返回目标元素函数
     * 提供两种获取目标元素的方式:
     * 1. 通过 Promise 返回值获取元素
     * 2. 根据分发的事件 'ElementGetter', 获取回调, 回调参数 e.detail 为目标元素
     * */
    function returnElement(element) {
      // 空元素, 抛出异常
      if (!element) {
        reject(new Error('Void Element'));
        return;
      }
      // 延时触发
      setTimeout(() => {
        // 触发事件 (element = e.detail);
        window.dispatchEvent(new CustomEvent('ElementGetter', {
          detail: element
        }));
        // 返回元素
        resolve(element);
      }, delayPerSecond * 1000);
    }
    // 分支1 - 元素已经载入, 直接获取到元素
    if (!!document.querySelector(selector)) {
      returnElement(document.querySelector(selector));
      return;
    }
    // 分支2 - 元素未载入, 使用MutationObserver获取元素
    else if (!!MutationObserver) {
      // 声明定时器
      const timer = timeoutPerSecond && window.setTimeout(() => {
        // 关闭监听器
        observer.disconnect();
        // 返回元素 reject
        returnElement();
      }, timeoutPerSecond * 1000);
      // 声明监听器
      const observer = new MutationObserver(observeElementCallback);
      function observeElementCallback(mutations) {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(addNode => {
            if (!(addNode instanceof HTMLElement)) {
              return;
            }
            // 获取元素
            const element = addNode.matches(selector) ? addNode : addNode.querySelector(selector);
            // 如果获取到元素
            if (element) {
              // 清空定时器
              timer && clearTimeout(timer);
              // 返回元素
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
    // 分支3 - 元素未载入, 浏览器无MutationObserver类, 使用定时器获取元素
    // 定时器延时: 500ms, 默认超时时间20s
    else {
      const intervalDelay = 500;
      let intervalCounter = 0;
      const maxIntervalCounter = Math.ceil((timeoutPerSecond * 1000 || 20 * 1000) / intervalDelay);
      const timer = window.setInterval(() => {
        // 定时器计数
        if (++intervalCounter > maxIntervalCounter) {
          // 超时清除计数器
          clearInterval(timer);
          // reject访问
          returnElement();
          return;
        }
        // 尝试获取元素
        const element = parent.querySelector(selector);
        // 获取到元素时
        if (element) {
          clearInterval(timer);
          returnElement(element);
        }
      }, intervalDelay);
    }
  });
}

;// CONCATENATED MODULE: ./src/modules/init.ts


/**
 * 初始化脚本
 * */
async function init() {
  /**
   * 等待视频容器加载
   * */
  await elementWaiter(config.nodeContainer);
  /**
   * 添加初始样式 (hide 屏蔽类)
   * */
  GM_addStyle('.feed-card.hide, .bili-video-card.hide { display: none !important; }');
}
;// CONCATENATED MODULE: ./src/index.ts


/**
 * 运行脚本
 * */
const run = (async () => {
  await init();
  /**
   * 处理视频信息
   * */
  VideoLoadedListener();
  /**
   * 测试函数
   * */
  (() => {
    // // fixme debugger
    // console.log( '当前屏蔽的视频列表: ', GM_getValue( 'BandVideoList' ) );
  })();
})();
})();

/******/ })()
;