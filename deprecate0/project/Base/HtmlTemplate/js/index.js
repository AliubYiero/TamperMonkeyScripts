"use strict";
class MapJSON {
    static replacer(key, value) {
        if (value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()),
            };
        }
        else {
            return value;
        }
    }
    static reviver(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (value.dataType === 'Map') {
                return new Map(value.value);
            }
        }
        return value;
    }
    static stringify(values) {
        return JSON.stringify(values, this.replacer);
    }
    static parse(value) {
        return JSON.parse(value, this.reviver);
    }
}
class LocalStorage {
    key;
    valueType;
    constructor(key, valueType = 'String') {
        this.key = key;
        this.valueType = valueType;
        if (!this.get()) {
            switch (valueType) {
                case 'String':
                    this.set('');
                    break;
                case 'Array':
                    this.set('[]');
                    break;
                case 'Object':
                    this.set('{}');
                    break;
            }
        }
    }
    set(value) {
        localStorage.setItem(this.key, value);
    }
    get() {
        return localStorage.getItem(this.key);
    }
    checkRepeat(values) {
        let map = new Map();
        for (const key in values) {
            map.set(values[key], key);
        }
        let newReturn;
        if (Array.isArray(values)) {
            newReturn = [];
            for (let value of map.keys()) {
                newReturn.push(value);
            }
        }
        else {
            newReturn = {};
            for (let key of map.keys()) {
                newReturn[key] = map.get(key);
            }
        }
        return newReturn;
    }
    append(values) {
        let localhostStorage = JSON.parse(this.get());
        if (this.valueType === 'String' && typeof values === 'string') {
            this.set(values);
            return;
        }
        switch (this.valueType) {
            case 'String':
                localhostStorage = values;
                break;
            case 'Array':
                localhostStorage.push(values);
                break;
            case 'Object':
                for (let key in values) {
                    localhostStorage[key] = values[key];
                }
                break;
        }
        localhostStorage = this.checkRepeat(localhostStorage);
        this.set(JSON.stringify(localhostStorage));
    }
    static set(key, value) {
        localStorage.setItem(key, value);
    }
    static get(key) {
        return localStorage.getItem(key);
    }
}
window.addEventListener('load', () => {
    function bindCloseContainerEvent() {
        document.querySelector('.close-icon')?.addEventListener('click', () => {
            document.querySelector('.dialog-container')?.classList.add('enable-display');
        });
    }
    function bindConfigSubmitEvent() {
        const storage = new LocalStorage('liveID', 'Array');
        function submitContent() {
            const inputBtn = document.querySelector('.config-input');
            if (inputBtn.value === '') {
                return;
            }
            storage.append(inputBtn.value);
            inputBtn.value = '';
        }
        document.querySelector('.submit-config')?.addEventListener('click', e => {
            e.preventDefault();
            submitContent();
        });
        document.querySelector('.input-area')?.addEventListener('keydown', e => {
            if (['Enter'].indexOf(e.key) === -1) {
                return;
            }
            submitContent();
        });
    }
    function getConfig() {
        const configList = JSON.parse(LocalStorage.get('liveID'));
        function createPElement(content) {
            const pNode = document.createElement('p');
            pNode.className = 'config-item';
            pNode.innerText = content;
            return pNode;
        }
        function writeConfigsToContainer() {
            const mainDetailContainer = document.querySelector('.config-detail');
            configList.forEach((liveID) => {
                mainDetailContainer?.appendChild(createPElement(liveID));
            });
        }
        writeConfigsToContainer();
    }
    const functionChain = [
        bindCloseContainerEvent,
        bindConfigSubmitEvent,
        getConfig,
    ];
    while (functionChain.length > 0) {
        if (Array.isArray(functionChain)) {
            functionChain[0].apply(null, functionChain[1]);
        }
        else {
            functionChain.apply(null);
        }
        functionChain.shift();
    }
});
