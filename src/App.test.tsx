import App from './App'
import {SuggestList} from './component/SuggestList'
import {Country} from './types'
import {SearchInput} from './component/SearchInput'
import {SearchIcon} from './component/SearchIcon'
import {withAutoComplete} from './component/WithAutoComplete'
import { render,screen,waitFor,within,fireEvent } from '@testing-library/react'

const mockFn = jest.fn()

const InputWithAutoComplete = withAutoComplete(SearchInput);

test('renders initial search input', async () => {
  render(	<App />
  )
  const searchInput = screen.getByTestId('search-input') as HTMLInputElement
  const searchPlaceholder = screen.getByPlaceholderText('Search') as HTMLInputElement
  fireEvent.change(searchPlaceholder, { target: { value: 'arg' } })
  await waitFor(() => expect(searchInput).toBeVisible())
})


test('calls onChange function with typed string on search input change', async () => {
  render(	<InputWithAutoComplete 
      onChange={mockFn}
      data={[]}
    >
      <SearchIcon />
    </InputWithAutoComplete>
  )
  const searchInput = screen.getByTestId('search-input') as HTMLInputElement
  const searchPlaceholder = screen.getByPlaceholderText('Search') as HTMLInputElement
  fireEvent.change(searchPlaceholder, { target: { value: 'arg' } })
  await waitFor(() => expect(searchInput.value).toBe('arg'))
  await waitFor(() => expect(mockFn).toHaveBeenCalledWith('arg'))
})

test('renders first 10 option on the screen', async () => {
  const searchParam='arg'
  const data= [
    { "name": "Afghanistan", "code": "AF" },
    { "name": "Åland Islands", "code": "AX" },
    { "name": "Albania", "code": "AL" },
    { "name": "Algeria", "code": "DZ" },
    { "name": "American Samoa", "code": "AS" },
    { "name": "AndorrA", "code": "AD" },
    { "name": "Angola", "code": "AO" },
    { "name": "Anguilla", "code": "AI" },
    { "name": "Antarctica", "code": "AQ" },
    { "name": "Antigua and Barbuda", "code": "AG" },
    { "name": "Argentina", "code": "AR" },
    { "name": "Barbados", "code": "BB" },
    { "name": "Belarus", "code": "BY" },
    { "name": "Belgium", "code": "BE" },
    { "name": "Belize", "code": "BZ" }
  ]
  render(<SuggestList searchParam={searchParam} data={data} />)
  const optionList= screen.getByTestId('option-list') as HTMLDivElement
  expect(optionList).toBeVisible()
  expect(optionList.classList.contains('option-list')).toBe(true)
  const optionItems= within(optionList).getAllByRole('heading',{level:1})
  expect(optionItems).toHaveLength(10)
})

test('renders first n options if it is less than 10 on the screen', async () => {
  const searchParam='arg'
  const data= [
    { "name": "Antigua and Barbuda", "code": "AG" },
    { "name": "Argentina", "code": "AR" },
    { "name": "Barbados", "code": "BB" },
    { "name": "Belarus", "code": "BY" },
    { "name": "Belgium", "code": "BE" },
    { "name": "Belize", "code": "BZ" }
  ]
  render(<SuggestList searchParam={searchParam} data={data} />)
  const optionList= screen.getByTestId('option-list') as HTMLDivElement
  expect(optionList).toBeVisible()
  expect(optionList.classList.contains('option-list')).toBe(true)
  const optionItems= within(optionList).getAllByRole('heading',{level:1})
  expect(optionItems).toHaveLength(data.length)
  await Promise.all([
    optionItems.map((item,index) => {
      expect(item.classList.contains('option')).toBe(true)
      expect(item).toHaveTextContent(data[index].name)
    })
  ])
})

test('renders -no suggestion found- text when prop-data is empty array', async () => {
  const searchParam='arg'
  const nodata:(Country[]|[])= []
  render(<SuggestList searchParam={searchParam} data={nodata} />)
  const optionItems= screen.getByRole('heading',{level:1})
  expect(optionItems).toHaveTextContent('No Suggestion Found')
  expect(optionItems.classList.contains('option')).toBe(true)
})

test('renders no-list when searchParam is empty string', async () => {
  const searchParam=''
  const nodata:(Country[]|[])= []
  render(<SuggestList searchParam={searchParam} data={nodata} />)
  const optionList= screen.queryByTestId('option-list') as HTMLDivElement
  expect(optionList).toBeNull()  
})

