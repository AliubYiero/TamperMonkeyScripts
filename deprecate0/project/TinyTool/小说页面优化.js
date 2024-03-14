"use strict";
GM_addStyle(`
	.showtxt {
		font-size: 30px;
	}
	
	div.content > div:nth-child(4),
	#center_tip,
	div.content > div.link,
	#wrapper > .header,
	#wrapper > .nav,
	#wrapper > div.book.reader > div.path,
	#content > span,
	.footer {
		display: none;
	}
	
	#wrapper, html {
		background: #f8f8f8;
	}
	.content {
		background: #ffffff;
	}
`);
window.onload = () => {
    try {
        switchToNextPage();
    }
    catch {
        location.reload();
    }
};
function fireKeyEvent(el, evtType, keyCode) {
    let evtObj;
    if (document.createEvent) {
        evtObj = document.createEvent("UIEvents");
        evtObj.initUIEvent(evtType, true, true);
        delete evtObj.keyCode;
        if (typeof evtObj.keyCode === "undefined") {
            Object.defineProperty(evtObj, "keyCode", { value: keyCode });
        }
        else {
            evtObj.key = String.fromCharCode(keyCode);
        }
        if (typeof evtObj.ctrlKey === "undefined") {
            Object.defineProperty(evtObj, "ctrlKey", { value: true });
        }
        else {
            evtObj.ctrlKey = true;
        }
        el.dispatchEvent(evtObj);
        return;
    }
}
const checkPageBottom = (function () {
    let isTop = false;
    let isBottom = false;
    let resetPageStatus = () => {
        isTop = false;
        isBottom = false;
    };
    return function () {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop === 0) {
            if (isTop) {
                resetPageStatus();
                return 37;
            }
            isTop = true;
            scrollBy(0, 1);
        }
        else if (scrollTop + clientHeight >= scrollHeight) {
            if (isBottom) {
                resetPageStatus();
                return 39;
            }
            isBottom = true;
            scrollBy(0, -1);
        }
    };
})();
const debounce = function (fn, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(fn, delay * 1000);
    };
};
function switchToNextPage() {
    window.addEventListener('scroll', debounce(() => {
        const keyEventCode = checkPageBottom();
        if (keyEventCode) {
            fireKeyEvent(document, "keydown", keyEventCode);
        }
    }, 0.1));
}
