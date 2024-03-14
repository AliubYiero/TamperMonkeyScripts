/**
 * 多选题提交状态改变
 * @class
 * */
export class SubmitAnswerStatusChange {
	static isSubmit: Boolean = false;
	
	/**
	 * @static
	 * 状态改变：提交
	 * */
	static submit() {
		this.isSubmit = true;
	}
	
	/**
	 * @static
	 * 状态改变：取消提交
	 * */
	static close() {
		this.isSubmit = false;
	}
	
	/**
	 * @static
	 * 状态改变：更新提交
	 * */
	static fresh() {
		this.close();
	}
}
