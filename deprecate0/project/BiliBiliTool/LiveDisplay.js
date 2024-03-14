"use strict";
(() => {
    function formatterUnDisplayStyle() {
        let classList = [
            '.play-together-panel',
            '.entry-web',
            '.gift-planet-entry',
            '.activity-entry',
            '.popular-and-hot-rank',
            '.shop-popover',
            '.gift-left-part',
            '.function-card',
            '.bili-dyn-version-control',
            '.reply-notice',
            '.float-nav__btn--fixed',
        ];
        classList.push('');
        let displayStyleString = classList.join(' { display: none !important; }\n');
        return { data: displayStyleString };
    }
    function formatterLiveContentOverflow(prevReturn) {
        let displayStyleString = prevReturn.data;
        let classList = [
            `.live-skin-normal-a-text { overflow: visible !important; }`,
        ];
        let LiveContentOverflowString = classList.join('\n');
        return { data: displayStyleString + LiveContentOverflowString };
    }
    function writeToStyle(prevReturn) {
        let { data } = prevReturn;
        GM_addStyle(data);
    }
    function changeDynamicText() {
        console.log(document.URL);
        if (!(document.URL === 'https://t.bilibili.com/?tab=all' || document.URL === 'https://t.bilibili.com/')) {
            return;
        }
        setTimeout(() => {
            const dynamicTypeList = document.querySelectorAll('.bili-dyn-list-tabs__list > .bili-dyn-list-tabs__item');
            dynamicTypeList[0].innerText = '动态';
            dynamicTypeList[1].innerText = '视频';
            dynamicTypeList[2].innerText = '番剧';
        }, 2000);
    }
    const fnChains = [
        formatterUnDisplayStyle,
        formatterLiveContentOverflow,
        writeToStyle,
        changeDynamicText,
    ];
    let prevReturn = {};
    while (fnChains.length > 0) {
        prevReturn = fnChains.shift()(prevReturn);
    }
})();
