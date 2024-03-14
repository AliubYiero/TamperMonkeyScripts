const { createStore, set, get, clear, } = require('idb-keyval');
export { LiveDB };
class LiveDB {
    databaseName;
    customStore;
    constructor(liveId) {
        this.databaseName = `live-id-${liveId}`;
        this.initDatabase();
    }
    initDatabase() {
        this.customStore = createStore(this.databaseName, 'live-buffer');
        clear(this.customStore).then(() => {
            console.log(`清空数据库${this.databaseName}`);
        });
    }
    get(key) {
        get(key, this.customStore).then((res) => {
            console.log(`成功从数据库 ${this.databaseName} 中获取数据 {${key}: ${res}`);
        }).catch((e) => {
            console.error(`发生错误: ${e}`);
        });
    }
    set(key, value) {
        set(key, value, this.customStore).then(() => {
            console.log(`成功放置数据 {${key}: ${value} 到数据库 ${this.databaseName} `);
        }).catch((e) => {
            console.error(`发生错误: ${e}`);
        });
    }
}
