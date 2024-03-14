export type {
	PrefSelectorList
}

interface PrefSelectorList {
	[ p: string ]: {
		[ p: string ]: {
			[ p: string ]: boolean | string | number
		}
	}
}
