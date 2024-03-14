/**
 * OrderDetail.ts
 * created by 2023/10/15
 * @file 商品详细信息
 * @author  Yiero
 * */

export interface OrderDetail {
	"platinum": number, // 售出价格(白金)
	"quantity": number, // 售出数量
	"visible": boolean,    // 是否可见
	"order_type": "sell" | 'buy',   // 订单状态(买入 或者 卖出)
	"user": {
		"status": "offline" | 'online' | 'ingame'     // 玩家在线状态
		"last_seen": string,       // 玩家上次查看warframe market时间
		"ingame_name": string,     // 玩家游戏名称
		"reputation": number,
		"locale": string,
		"avatar": string,
		"id": string,
		"region": string,
	},
	"platform": "pc" | 'ps4' | 'swi' | 'xbox',
	"creation_date": string,
	"last_update": string,
	"id": string,
	"region": string
}
