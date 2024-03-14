/**
 * OrderDescription.ts
 * created by 2023/10/15
 * @file 商品介绍
 * @author  Yiero
 * */

// 商品介绍
export interface OrderDescription {
	"url_name": string,             // 商品key id (蛇形命名)
	"quantity_for_set": number,     // 需求数量(如果是组件)
	"item_name": string,            // 商品名称(中文)
	"description": string,          // 商品描述
	"wiki_link": string,            // wiki 链接
	"drop": []                      // 空
	"ducats"?: number               // 售出杜卡德金币数量
}
