import axios from 'axios'
import {Country} from '../types'

type ResponseItem={
	name: {
		common: string
	}
	cca3: string
}

const fetchData = async ():Promise<Country[] | []> => {
	const data= await axios.get('https://restcountries.com/v3.1/all?status=true&fields=cca3,name')
		.then((response) => {	
			const countryList:ResponseItem[]= response.data
			if(countryList) {
				return Promise.all(countryList.map(item=> {
					return {
						name: item.name.common,
						code: item.cca3
					}
				}))	
			}else return []
		})
	return data
}
export {fetchData}