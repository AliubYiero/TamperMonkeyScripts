export { Info };
class Info {
    static header = '[BiliBili直播回放/录制]';
    static contentInfo(msg) {
        return `${this.header} ${msg}`;
    }
    static info(msg) {
        console.info(this.contentInfo(msg));
    }
    static warn(msg) {
        console.warn(this.contentInfo(msg));
    }
    static error(msg) {
        console.error(this.contentInfo(msg));
    }
}
