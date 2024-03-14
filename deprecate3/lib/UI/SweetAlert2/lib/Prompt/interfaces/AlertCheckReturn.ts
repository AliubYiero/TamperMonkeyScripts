/**
 * InputPrompt.ts
 * created by 2023/9/21
 * @file Input输入框
 * @author  Yiero
 * */

export interface AlertCheckReturn {
	isConfirmed: boolean,
	isDenied: boolean,
	isDismissed: boolean,
	dismiss?: "cancel",
	value?: unknown,
}
