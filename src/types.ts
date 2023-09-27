import React from "react"

export type InputProps={
	onChange: (param:string) => void
	children: React.ReactNode
}
export type OnChangeBase= {
	onChange: (param:string) => void
	children: React.ReactNode
	data: Country[]
}
export type Country = {
	name: string
	code: string
}
export type InputChangeEvent= React.ChangeEvent<HTMLInputElement>
export type NoData= {
	data: []
	searchParam: string
}
export type SearchType= {
	data: Country[]
	searchParam: string
}
export type SuggestListProps= NoData | SearchType
export type OptionType= {
	data: Country
	searchParam: string
}
