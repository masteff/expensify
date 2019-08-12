import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'


test('should set default state', () => {
    const state = expensesReducer(undefined, {type:'@@INIT'})
    expect(state).toEqual([])
})

test('should remove expense with valid id', () =>{
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '1'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[1], expenses[2]])
})

test('should remove expense with invalid id', () =>{
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should edit expense', () => {
    const updates = {
        description: 'Bread',
        note: '',
        amount: 2000,
        createdAt: 1
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '2',
        updates
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0],{...expenses[1], ...updates}, expenses[2]])
})

test('should not edit expense with in valid id', () => {
    const updates = {
        description: 'Bread',
        note: '',
        amount: 2000,
        createdAt: 1
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '5',
        updates
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should add expense', () => {
    const addExpense = {
        id: '4',
        description: 'Gum',
        note: '',
        amount: 195,
        createdAt: 0
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense: addExpense
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([...expenses, addExpense])    
})

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[1]])
})

