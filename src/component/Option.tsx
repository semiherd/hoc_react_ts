import {OptionType} from '../types'
import './style/Option.css'
import {Fragment} from 'react'

const highlightText= (str:string,highlightText:string) => {
	try{
		var splittedStr = str.split(new RegExp(`(${highlightText})`, "gi"));
		return splittedStr.map((part, index) => (
			<Fragment key={index}>
				{part.toLowerCase() === highlightText.toLowerCase() ? (
					<b style={{ borderRadius: '5px',backgroundColor: "#ADD8E6" }}>{part}</b>
				) : (
					part
				)}
			</Fragment>
		));
	}catch(e){
		return null
	}
}

const Option= (props:OptionType):JSX.Element => {
	const {searchParam,data}= props
	
	return (
		<h1 className="option">{highlightText(data.name,searchParam)}</h1>
	)
}
export { Option }