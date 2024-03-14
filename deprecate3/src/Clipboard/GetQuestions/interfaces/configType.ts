export interface ConfigType {
	website: string;
	params: {
		[ key: string ]: {
			replaceRule: ( questionInnerText: string ) => string;
			selector: string;
		};
		// @ts-ignore
		QA?: {
			replaceRule: ( questionInnerText: string ) => string;
			selector: string
		};
		checkbox: {
			replaceRule: ( questionInnerText: string ) => string;
			selector: string
		};
		judge: {
			replaceRule: ( questionInnerText: string ) => string;
			selector: string
		};
		radio: {
			replaceRule: ( questionInnerText: string ) => string;
			selector: string
		}
	}
}
