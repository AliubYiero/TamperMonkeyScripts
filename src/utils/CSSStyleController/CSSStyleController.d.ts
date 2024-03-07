import { CSSRuleMap } from './interfaces';
/**
 * 写入新样式
 *
 * 不能直接使用 `new CSSStyleSheet()` 创建,
 * 某些情况下使用 `new CSSStyleSheet()` 创建的 StyleSheet 无法注入页面
 *
 * @param { string } cssRuleString 包含了将要插入的规则的 DOMString, 详细规则见 CSSStyleSheet.insertRule
 * @tutorial https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleSheet/
 * */
export declare class CSSStyleController {
    /**
     * 样式元素 (样式表依附的 style 元素)
     */
    private styleElement;
    /**
     * 样式表
     */
    private styleSheet;
    /**
     * @constructor
     */
    constructor(cssRuleString?: string);
    /**
     * 获取当前样式表的长度
     * @readonly
     * */
    get length(): number;
    /**
     * 内部缓存的 CSS 样式表对象
     *
     * @todo 有更好的缓存方式? 等找到了再更新 (目前是手动更新缓存 (通过 .push() 和 .delete() 方法))
     *
     * @private
     * */
    private _cssRules;
    /**
     * 获取当前样式表的规则对象
     * @readonly
     */
    get cssRules(): CSSRuleMap;
    /**
     * 以字符串数组的形式展示当前样式表中所有的样式 /
     * 或者展示输入参数(样式表)中的所有样式
     *
     * @returns { string[] } 字符串数组, 每个元素为一个样式规则 (已自动格式化缩进)
     */
    show(cssRuleMap?: CSSRuleMap): string[];
    /**
     * 展示当前样式表中所有的样式
     *
     * @returns { string } 样式字符串 (已自动格式化缩进)
     */
    toString(): string;
    /**
     * 添加 CSS 样式到样式表中
     *
     * 如果当前样式表中存在样式, 则在原样式的基础上添加样式
     * */
    add(cssRuleString: string): this;
    /**
     * 删除某个选择器对应的 CSS 样式
     * */
    delete(selector: string): this;
    /**
     * 强制添加 CSS 规则到样式表中
     *
     * 如果当前样式表中存在同样选择器的样式, 则会失效 / 覆盖原来的样式
     * */
    push(cssRule: string | CSSRuleMap): this;
    /**
     * 移除整个样式表
     * */
    remove(): void;
    /**
     * 更新内部的 CSS 规则缓存
     * */
    private freshCssRules;
    /**
     * 创建一个新的样式表到页面中
     * */
    private createStyleSheet;
    /**
     * 匹配同层级的CSS字符串, 将 CSS 字符串转化成 CSS 规则数组
     *
     * @param { string } cssContent CSS规则字符串
     *
     * @return { string[] } CSS规则数组
     * */
    private matchBrackets;
}
