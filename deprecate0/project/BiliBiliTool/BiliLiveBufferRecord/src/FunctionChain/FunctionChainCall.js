export { FunctionChainCall };
class FunctionChainCall {
    callChain;
    constructor() {
        this.callChain = [];
    }
    set(fn, params = []) {
        this.callChain.push([fn, params]);
    }
    setList(array) {
        array.forEach(fn => {
            if (!Array.isArray(fn)) {
                this.set(fn);
                return;
            }
            this.set(fn[0], fn[1]);
        });
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
