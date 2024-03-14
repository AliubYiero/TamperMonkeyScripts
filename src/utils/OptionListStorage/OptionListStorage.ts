export class OptionListStorage {
	static #options: NodeListOf<Element>;
	
	static get(): NodeListOf<Element> {
		return this.#options;
	}
	
	static set( optionList: NodeListOf<Element> ) {
		this.#options = optionList;
	}
}
