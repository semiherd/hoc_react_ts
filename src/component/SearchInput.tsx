import {InputProps,InputChangeEvent} from '../types'
import {useDebounce} from '../service/UseDebounce'
import './style/SearchInput.css'

const SearchInput= (props:InputProps) => {
	
	const changeHandler= (e:InputChangeEvent) => {
		try{
			props.onChange(e.target.value)
		}catch(e){
			console.log(e)
		}
	}
	const debouncedCb:(e:InputChangeEvent)=>void = useDebounce(changeHandler, 500)
	
	return (
		<div className="search-bar">
			{props.children}
			<input 
				data-testid= "search-input" 
				type= "text"
				onChange= {(event) => debouncedCb(event)} 
				placeholder= "Search"
			/>
		</div>
	)
}

export { SearchInput }