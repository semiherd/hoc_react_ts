import axios from 'axios'
import {mockedData} from '../../__mock__/MockedData'
import {fetchData} from '../FetchData'

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>
beforeEach(() => {
	jest.resetAllMocks();
 });

it('requests and gets list of country from the Api', async () => {
	mockedAxios.get.mockImplementation(() => Promise.resolve({ data: mockedData }));

	const responseData = await fetchData();
	expect(axios.get).toHaveBeenCalledTimes(1);
	expect(responseData).toEqual(mockedData);
 })

 it('no data from the Api', async () => {
	mockedAxios.get.mockImplementation(() => Promise.resolve({ data: [] }));

	const responseData = await fetchData();
	expect(axios.get).toHaveBeenCalledTimes(1);
	expect(responseData).toEqual([]);
 });
