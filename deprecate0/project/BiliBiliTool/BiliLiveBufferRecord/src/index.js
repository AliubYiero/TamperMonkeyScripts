import { getLivePlayUrl } from './BiliInfo/Api';
(() => {
    let Go;
    (function (Go) {
        Go[Go["stop"] = 0] = "stop";
        Go[Go["next"] = 1] = "next";
        Go[Go["finial"] = 2] = "finial";
    })(Go || (Go = {}));
    function creatDatabase(res) {
    }
    getLivePlayUrl({ roomId: '169669', quality: 4 });
})();
