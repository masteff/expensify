import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../../actions/filters'
import moment from 'moment'

test('should set start date action object', () => {
    const action = setStartDate(moment(0))
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
})

test('should set end date action object', () => {
    const action = setEndDate(moment(0))
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
})

test('should set sort by amount action object', () => {
    const action = sortByAmount()
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})

test('should set sort by date action object', () => {
    const action = sortByDate()
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
})

test('should set text filter with input', () => {
    const action = setTextFilter('hallo')
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'hallo'
    })
})
test('should set text filter with default', () => {
    const action = setTextFilter()
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})