import {OnChangeBase} from '../types'
import {SuggestList} from './SuggestList'
import {useState} from 'react'

const withAutoComplete= <TProps extends OnChangeBase>(
	Component:React.ComponentType<TProps>,
) => {
	
	return (props:TProps ) => {
		const [visible,setVisible]= useState<Boolean>(false)
		const [searchParam,setSearchParam]= useState<string>('')
		const onChange=  (param:string) => {
			props.onChange(param)	
			setSearchParam(param)
			if(param.length) setVisible(true)	
			else setVisible(false)	
		}

		return (
			<>
				<Component {...props} onChange={onChange} />
				{visible && <SuggestList searchParam={searchParam} data={props.data} />}
			</>
		)
	}
}	

export {withAutoComplete}