import {SuggestListProps,Country} from '../types'
import {Option} from './Option'
import './style/Option.css'

export const SuggestList= (props:SuggestListProps) => {
	
	if(!props.data.length) {
		return (
			<div className="option-list">
				<h1 className="option">No Suggestion Found</h1>
			</div>
		)
	}
	
	return (
		<div className="option-list" data-testid="option-list">
			{props?.data?.map((item:Country,index:number) => {
				if(index<10)
					return <Option key={item.code} searchParam={props.searchParam} data={item} />
				else return null
			})}
		
		</div>
	)
}