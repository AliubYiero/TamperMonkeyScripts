"use strict";
const config = {
    inputText: ['本子', '套图', '画集', '音声', '书', '视频', '设定集',],
};
function bindRapiduplooadKeydown() {
    const inputElement = document.querySelector('#mzf-path-input');
    const rapiduplooad = document.querySelector('.swal2-show');
    console.log(rapiduplooad);
    rapiduplooad.onkeydown = e => {
        console.log(e);
        if (!e.key.match(/[0-9]/)) {
            return;
        }
        inputElement.value = 'Yiero/' + config.inputText[parseInt(e.key) - 1] || config.inputText[0];
    };
}
function bindBaiduKeydown() {
    const aimDirList = [];
    function getFirstDir() {
        const firstDirList = document.querySelectorAll('.treeview-');
        firstDirList.forEach((firstDir) => {
            if (firstDir.innerText === 'Yiero') {
                aimDirList.push(firstDir);
                firstDir.querySelector('.treeview-node-handler').click();
            }
        });
    }
    function getSecondDir() {
        const secondDirList = aimDirList[0].querySelectorAll('.treeview-');
        window.onkeydown = e => {
            console.log(e);
            if (!e.key.match(/[0-9]/)) {
                return;
            }
            console.log(secondDirList);
            secondDirList.forEach((secondDir) => {
                if (secondDir.innerText === config.inputText[parseInt(e.key)]) {
                    secondDir.querySelector('.treeview-node-handler').click();
                }
            });
        };
    }
    getFirstDir();
    if (aimDirList[0]) {
        setTimeout(getSecondDir, 500);
    }
}
let counter = 0;
let timer = setInterval(() => {
    if (document.querySelector('#mzf-path-input')) {
        console.log('获取秒传保存UI');
        clearInterval(timer);
        setTimeout(bindRapiduplooadKeydown, 500);
    }
    if (document.querySelector('#fileTreeDialog')) {
        console.info('获取百度云保存UI');
        clearInterval(timer);
        setTimeout(bindBaiduKeydown, 500);
    }
    if (counter++ >= 20) {
        console.warn('无获取');
        clearInterval(timer);
    }
}, 500);
