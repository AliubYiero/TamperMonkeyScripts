"use strict";
class FunctionChainCall {
    callChain;
    constructor() {
        this.callChain = [];
    }
    set(fn, params = []) {
        this.callChain.push([fn, params]);
    }
    setList(array) {
        array.forEach((fn) => {
            if (!Array.isArray(fn)) {
                this.set(fn);
                return;
            }
            this.set(fn[0], fn[1]);
        });
    }
    show() {
        console.info(this.callChain);
    }
    async call() {
        let returnString;
        while (this.callChain[0]) {
            if (returnString === 'stop') {
                return;
            }
            else if (returnString === 'skip') {
                this.callChain.shift();
                continue;
            }
            const fn = this.callChain[0];
            returnString = await fn[0].apply(null, fn[1]);
            this.callChain.shift();
        }
    }
}
const functionChainCall = new FunctionChainCall();
class SubmitAnswerStatusChange {
    static isSubmit = false;
    static submit() {
        this.isSubmit = true;
    }
    static close() {
        this.isSubmit = false;
    }
    static fresh() {
        this.close();
    }
}
class OptionObserver extends MutationObserver {
    constructor(Node, callback) {
        super(callback);
        super.observe(Node, {
            childList: true
        });
    }
}
function urlJudge(urlHeader) {
    if (typeof urlHeader === 'string') {
        urlHeader = new RegExp(urlHeader);
    }
    return !!document.URL.match(urlHeader);
}
function bindPageReloadEvent() {
    console.log('Bind page reload event.');
    function reloadPage() {
        console.info('Reload Page.');
        location.reload();
    }
    window.addEventListener('hashchange', reloadPage);
    let _pushState = window.history.pushState;
    window.history.pushState = function () {
        setTimeout(reloadPage, 1000);
        return _pushState.apply(this, arguments);
    };
}
function removeExtraElement() {
    GM_addStyle(`
		/* 居中主容器 */
		.app-main {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0;
		}
		
		/* 优化主容器UI */
		.middle-container {
			padding: 10px ${16 + 19 + 16 + 10}px;
			border-radius: 10px;
		}
		
		/* 隐藏多余元素 */
		.vip-quanyi,
		.new-footer,
		.header,
		.answer-box-detail,
		.answer-box-detail,
		.vip-tips,
		.right-float-window,
		.page-main .pull-right > :not(.serch-form)
		{
			display: none;
		}
	`);
}
function unlockRandomOption() {
    if (!urlJudge(/https:\/\/www\.zaixiankaoshi\.com\/mnks\/\?paperid/)) {
        return;
    }
    localStorage.removeItem('openRandomOption');
    console.info('Remove Origin Random Option Btn. ');
    const formContainer = document.querySelectorAll('div.box-card > form > div');
    let randomOptionLabel;
    formContainer.forEach(formItem => {
        if (formItem.querySelector('label')?.innerText === '选项乱序') {
            randomOptionLabel = formItem;
        }
    });
    const randomOptionBtn = randomOptionLabel.querySelector('div');
    randomOptionBtn.remove();
    const reRandomOptionBtnContainer = document.createElement('form');
    reRandomOptionBtnContainer.id = 'random-option-container';
    reRandomOptionBtnContainer.style.height = '40px';
    reRandomOptionBtnContainer.style.lineHeight = '40px';
    reRandomOptionBtnContainer.innerHTML = `
		<input type="radio" name="randomOption" id="random-option--open" value="true">
		<label for="random-option--open">开启</label>
		<input type="radio" name="randomOption" id="random-option--close" value="false">
		<label for="random-option--close">关闭</label>
		<!-- <div style="text-indent: 2em;color:red;background:#f8f8f8;">请注意，当您开启本脚本的随机选项时，您需要使用键盘选择选项，使用鼠标选择选项会出现选项映射错误导致无法获得正确答案。</div> -->
	`;
    randomOptionLabel.append(reRandomOptionBtnContainer);
    reRandomOptionBtnContainer.addEventListener('change', e => {
        localStorage.setItem('openRandomOption', e.target.value);
    });
}
function addQuickOption() {
    if (!urlJudge(/https:\/\/www\.zaixiankaoshi\.com\/mnks\/\?paperid/)) {
        return;
    }
    console.info('Add quick question choose option. ');
    const tableContainer = document.querySelector('.custom-table');
    const colList = tableContainer.querySelectorAll('tr:not(:last-of-type)');
    colList.forEach(col => {
        const row = col.querySelector('td:nth-of-type(2)');
        const colInput = row.querySelector('input');
        const { min, max } = colInput;
        const maxBtn = document.createElement('button');
        maxBtn.classList.add('el-button');
        maxBtn.innerText = 'Max';
        maxBtn.addEventListener('click', e => {
            e.preventDefault();
            colInput.value = max;
        });
        const minBtn = document.createElement('button');
        minBtn.classList.add('el-button');
        minBtn.innerText = 'Min';
        minBtn.addEventListener('click', e => {
            e.preventDefault();
            colInput.value = min;
        });
        const tenPercentBtn = document.createElement('button');
        tenPercentBtn.classList.add('el-button');
        tenPercentBtn.innerText = '10%';
        tenPercentBtn.addEventListener('click', e => {
            e.preventDefault();
            colInput.value = String(Math.ceil(parseInt(max) * 0.1));
        });
        row.append(maxBtn);
        row.append(minBtn);
        row.append(tenPercentBtn);
    });
}
functionChainCall.set(addQuickOption);
function isAnswerUI() {
    const localURL = document.URL.split('/');
    console.log(localURL[localURL.length - 2]);
    if (['online', 'simulation'].indexOf(localURL[localURL.length - 2]) === -1) {
        console.info('非答题界面，已退出');
        bindPageReloadEvent();
        return 'stop';
    }
}
function useRandomOption() {
    if (localStorage.getItem('openRandomOption') !== 'true' || !urlJudge('https://www.zaixiankaoshi.com/mnks/simulation/')) {
        return;
    }
    console.info('Use Random Option.');
    const optionContainer = document.querySelector('.select-left');
    const optionList = optionContainer.querySelectorAll('.option');
    let optionArray = [];
    optionList.forEach(option => {
        optionArray.push(option);
    });
    optionArray = optionArray.sort((a, b) => {
        return Math.random() - 0.5;
    });
    console.log(optionArray);
    const upperAlphaList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    for (let i = 0; i < optionArray.length; i++) {
        const option = optionArray[i];
        option.querySelector('.before-icon').innerText = upperAlphaList[i];
    }
    optionArray.forEach(option => {
        optionContainer.append(option);
    });
}
function setLargeFont() {
    if (!urlJudge(/https:\/\/www\.zaixiankaoshi\.com\/mnks\/\?paperid/)) {
        return;
    }
    const LargeFontBtn = document.querySelector('div.clearfix.font-set span:nth-of-type(3)');
    LargeFontBtn.click();
}
function initOption() {
    new OptionObserver(document.querySelector('.qusetion-box'), e => {
        console.info('Change question');
        SubmitAnswerStatusChange.fresh();
    });
}
let optionList;
function getOptionContainer() {
    optionList = document.querySelectorAll('.options-w > .option');
    try {
        new OptionObserver(document.querySelector('.top-hd'), e => {
            new OptionObserver(document.querySelector('.options-w'), e => {
                console.info('Fresh Options: ');
                optionList = document.querySelectorAll('.options-w > .option');
            });
        });
    }
    catch (e) {
    }
}
function bindKeyboardEvent() {
    try {
        window.addEventListener('keydown', e => {
            const chosenOptionNumber = parseInt(e.key) - 1;
            if (chosenOptionNumber >= 0 && chosenOptionNumber < optionList.length) {
                console.info('Enter Option Chosen');
                optionList[chosenOptionNumber]?.click();
                return;
            }
            const submitAnswer = document.querySelectorAll('.topic [style="clear: both;"]');
            if (submitAnswer.length === 2 && !SubmitAnswerStatusChange.isSubmit && ['Enter'].indexOf(e.key) !== -1) {
                SubmitAnswerStatusChange.submit();
                submitAnswer[0].querySelector('button').click();
                return;
            }
            SubmitAnswerStatusChange.fresh();
            if (['ArrowLeft'].indexOf(e.key) !== -1 || ['NumpadSubtract'].indexOf(e.code) !== -1) {
                document.querySelector('.next-preve > button:nth-of-type(1)').click();
            }
            else if (['Enter', '+', 'ArrowRight'].indexOf(e.key) !== -1) {
                const rightBtn = document.querySelector('.next-preve > button:nth-of-type(2)');
                if (rightBtn.disabled && urlJudge('https://www.zaixiankaoshi.com/mnks/simulation/')) {
                    let submitBtn = document.querySelector('.submit-btn');
                    submitBtn.click();
                    return;
                }
                rightBtn.click();
            }
        });
    }
    catch (e) {
        console.error(e);
        const isReloadPage = confirm(`
KeyBoard binding got an error, should fresh this page to reload?
按键绑定失败。是否需要重新刷新页面重新载入脚本？
		`);
        if (isReloadPage) {
            location.reload();
        }
    }
}
const fnList = [
    removeExtraElement,
    unlockRandomOption,
    isAnswerUI,
    useRandomOption,
    setLargeFont,
    initOption,
    getOptionContainer,
    bindKeyboardEvent
];
functionChainCall.setList(fnList);
window.onload = () => {
    setTimeout(() => {
        functionChainCall.call();
    }, 1000);
};
