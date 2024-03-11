/**
 * codeConfig.ts
 * created by 2024/3/11
 * @file 盐
 * @author  Yiero
 * */

export const codeConfig: {
	data: string;
	XOR_CODE: bigint;
	MASK_CODE: bigint;
	MAX_AID: bigint;
	BASE: bigint
} = {
	XOR_CODE: 23442827791579n,
	MASK_CODE: 2251799813685247n,
	MAX_AID: 1n << 51n,
	BASE: 58n,
	data: 'FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf',
};
