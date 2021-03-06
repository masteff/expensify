import filtersReducer from '../../reducers/filters'
import moment from 'moment'

test('should setup default filter values', () => {
    const state = filtersReducer(undefined,{type: '@@INIT'})
    expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
    })
})

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined,{type: 'SORT_BY_AMOUNT'})
    expect(state.sortBy).toBe('amount')
})

test('should set sortBy to date', () => {
    const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
    }
    const state = filtersReducer(undefined,{type: 'SORT_BY_DATE'})
    expect(state.sortBy).toBe('date')
})

test('should set startDate', () => {
    const action = {
        type: 'SET_START_DATE',
        startDate: moment(1).valueOf()
    }
    const state = filtersReducer(undefined, action)
    expect(state.startDate).toBe(moment(1).valueOf())
})

test('should set endDate', () => {
    const action = {
        type: 'SET_END_DATE',
        endDate: moment(2).valueOf()
    }
    const state = filtersReducer(undefined, action)
    expect(state.endDate).toBe(moment(2).valueOf())
})

test('should set text filter', () => {
    const action = {
        type: 'SET_TEXT_FILTER',
        text: 'hola'
    }
    const state = filtersReducer(undefined, action)
    expect(action.text).toBe('hola')
})