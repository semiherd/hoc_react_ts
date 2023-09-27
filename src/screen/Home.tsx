import {useState,useEffect} from 'react'
import {withAutoComplete} from '../component/WithAutoComplete'
import {SearchInput} from '../component/SearchInput'
import {SearchIcon} from '../component/SearchIcon'
import {fetchData} from '../service/FetchData'
import {Country} from '../types'

const InputWithAutoComplete = withAutoComplete(SearchInput);

const Home = () => {
	const [options,setOptions]= useState<Country[]|[]>([])
	const [visible,setVisible]= useState<Country[]|[]>([])
  
  const onChangeInput= async (param:string) => {
		const filtered= options
			.filter(val => val.name.toLowerCase().includes(param.toLowerCase()))
		setVisible(filtered)	
	}

	const handleData= async () => {
		try{
			const data= await fetchData()
			setOptions(data)
		}catch(e){
			return []
		}
	}

	useEffect(() => {
		handleData()
	},[])

  return (
		<InputWithAutoComplete 
			onChange={onChangeInput}
			data={visible}
		>
			<SearchIcon />
		</InputWithAutoComplete>
	)
}
export default Home