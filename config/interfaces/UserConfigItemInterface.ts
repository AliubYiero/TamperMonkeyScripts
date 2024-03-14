/**
 * 通用用户配置项接口
 * */
export interface UserConfigItemInterface {
	/** 配置标题 */
	title: string;
	/** 配置描述 */
	description: string;
	/** 配置类型 */
	type: 'text' | 'checkbox' | 'number' | 'select' | 'mult-select' | 'textarea';
	/** 配置默认值 */
	default?: string | number | boolean | unknown[];
	/** 列表选择器的候选 (select 和 mult-select 可用) */
	values?: unknown[];
	/** 动态显示绑定的values,值是以$开头的key,value需要是一个数组 (select 和 mult-select 可用) */
	bind?: unknown[];
	/** 最小输入值 (text 和 number 可用) */
	min?: number;
	/** 最大输入值 (text 和 number 可用) */
	max?: number;
	/** 单位 (number 可用) */
	unit?: string;
	/** 是否显示为密码框 (text 可用) */
	password?: boolean;
}

/**
 * 文本类型用户配置项接口
 * */
export type UserConfigTextItemInterface = Pick<
	UserConfigItemInterface, 'title' | 'description' | 'min' | 'max' | 'password'
> & {
	type: 'text';
	default: string;
};

/**
 * 选择框类型用户配置项接口
 * */
export type UserConfigCheckboxItemInterface = Pick<
	UserConfigItemInterface, 'title' | 'description'
> & {
	type: 'checkbox';
	default: boolean;
};

/**
 * 数组类型用户配置项接口
 * */
export type UserConfigSelectItemInterface = Pick<
	UserConfigItemInterface, 'title' | 'description' | 'values' | 'bind'
> & {
	type: 'select' | 'mult-select';
	default: unknown[];
};

/**
 * 数字类型用户配置项接口
 * */
export type UserConfigNumberItemInterface = Pick<
	UserConfigItemInterface, 'title' | 'description' | 'min' | 'max' | 'unit'
> & {
	type: 'number';
	default: number;
}

/**
 * 文本域类型用户配置项接口
 * */
export type UserConfigTextareaItemInterface = Pick<
	UserConfigItemInterface, 'title' | 'description'
> & {
	type: 'textarea';
	default: string;
}
