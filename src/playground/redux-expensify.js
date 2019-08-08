import {createStore, combineReducers} from 'redux'
import uuid from 'uuid'

const addExpense = (
    {
        description ='', 
        note = '', 
        amount = 0, 
        creatdAt = 0
    } = {}
        ) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        creatdAt
    }
})

const removeExpense  = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
})

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
})

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

// expenses reducer
const expensesReducerState = []
const expensesReducer = (state = expensesReducerState, action) => {
    switch (action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter((expense) => expense.id !== action.id)
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }else{
                    return expense
                }
            })
        default:
            return state;
    }
}
//Filters reducer 
const filtersReducerState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate:undefined
}
const filtersReducer = (state = filtersReducerState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_DATE':
            return {...state, sortBy: 'date'}
        case 'SORT_BY_AMOUNT':
            return {...state, sortBy: 'amount'}
        case 'SET_START_DATE':
            return {...state, startDate: action.startDate}
        case 'SET_END_DATE':
            return {...state, endDate: action.endDate}
        default:
            return state
    }
}

//Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {

    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.creatdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || expense.creatdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch
    }).sort((a,b) => {
        if(sortBy === 'date'){
            return a.creatdAt < b.creatdAt ? 1 : -1
        }
        else if (sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1
        }
    })
}

// store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
); 

store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filters)
    console.log(visibleExpenses);
})

const expense1 = store.dispatch(addExpense({description:'rent', amount: 100, creatdAt: 0}))
const expense2 = store.dispatch(addExpense({description:'car', amount: 300, creatdAt: 0}))

// store.dispatch(removeExpense({id: expense1.expense.id}))

// store.dispatch(editExpense(expense2.expense.id,{amount:500})

// store.dispatch(setTextFilter('car'))
// store.dispatch(setTextFilter(''))

store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// store.dispatch(setStartDate(0))
// store.dispatch(setEndDate(0))

