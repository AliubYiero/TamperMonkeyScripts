"use strict";
function watchReadLoaderBtn() {
    function addRead(btnElement) {
        btnElement.click();
    }
    let callback = e => {
        const btn = videoHeader.querySelector('.btnNotView');
        if (btn) {
            console.info('标记已看');
            addRead(btn);
            readLoaderBtnObserver.disconnect();
        }
    };
    let videoHeader = document.querySelector('.video-info-detail');
    const readLoaderBtnObserver = new MutationObserver(callback);
    readLoaderBtnObserver.observe(videoHeader, {
        childList: true,
    });
}
function watchFavorLoaderBtn() {
    function addFavor(btnElement) {
        btnElement.click();
    }
    let callback = e => {
        console.log('触发快速收藏', e);
        const btn = toolbar.querySelector('.quick-favorite:not(.on)');
        if (btn) {
            addFavor(btn);
            favorLoaderBtnObserver.disconnect();
        }
    };
    let toolbar = document.querySelector('.video-toolbar-left');
    const favorLoaderBtnObserver = new MutationObserver(callback);
    favorLoaderBtnObserver.observe(toolbar, {
        subtree: true,
        childList: true,
        characterData: true,
    });
}
window.onload = () => {
    setTimeout(() => {
        watchReadLoaderBtn();
        watchFavorLoaderBtn();
    }, 2000);
};
