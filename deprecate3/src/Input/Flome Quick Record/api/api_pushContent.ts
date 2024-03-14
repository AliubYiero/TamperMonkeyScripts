/**
 * api_pushContent.ts
 * created by 2023/9/21
 * @file 推送内容给 Flome 的 API
 * @author  Yiero
 * */

export interface FlomeResponse {
	code: number;
	data: {
		content: string,
		creator_id: number,
		source: string,
		created_at: string,
		tags?: string[],
		updated_at: string,
		linked_memos: string[],
		linked_count: number,
		slug: string
	};
	message: string;
}

export const api_pushContent = async ( api: string, content: string ): Promise<FlomeResponse | Error> => {
	const response: Response = await fetch( api, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify( { content } ),
	} );
	
	return response.json();
}
