import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'
import {startAddExpense, addExpense, editExpense, removeExpense} from '../../actions/expenses'
import expenses from '../fixtures/expenses'

const createMockStore = configureMockStore([thunk])

test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'})

    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should setup edit expense action object', () => {
    const action = editExpense('1234',{note: 'New note value'} )

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '1234',
        updates: {note: 'New note value'}
    })
})

test('should setup add expense actin object with provided values' ,() => {
    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to dabase and store', (done) => {
    const store = createMockStore({})
    const expenseData = {
        description: 'mouse',
        amount: 3000,
        note: ' Gut mouse',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then (() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        const val = snapshot.val()
        expect(val).toEqual(expenseData)
        done()
    })
})

test('should add expense wih defaults to dabase and store', (done) => {
    const store = createMockStore({})
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense({})).then (() => {
       
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        })
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        const val = snapshot.val()
        expect(val).toEqual(expenseDefaults)
        done()
    })
})

// test('should setup add expense action object with default', () => {
//     const action = addExpense()
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//         description: '', 
//         note: '', 
//         amount: 0, 
//         createdAt: 0,
//         id: expect.any(String)
//     }
//     })
// })