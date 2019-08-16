import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'
import {startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses,startRemoveExpense,startEditExpense} from '../../actions/expenses'
import expenses from '../fixtures/expenses'

const uid = 'thisismytestuid'
const defaultAuthState = {auth:{uid}}
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const expenseData = {}
    expenses.forEach(({id,description,note,amount, createdAt}) => {
        expenseData[id] = {description,note,amount, createdAt}
    })
    database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done())
})

test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'})
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should remove expense from firebase', (done) => {
    const store  = createMockStore(defaultAuthState)
    const id = expenses[2].id
    store.dispatch(startRemoveExpense({id})).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
    })
    return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toBeNull()
        done()
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

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState)
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        const val = snapshot.val()
        expect(val).toEqual(expenseData)
        done()
    })
})

test('should add expense wih defaults to dabase and store', (done) => {
    const store = createMockStore(defaultAuthState)
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        const val = snapshot.val()
        expect(val).toEqual(expenseDefaults)
        done()
    })
})

test('should setup set expense action with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })
        done()
    })
})

test('should update expense in firebae', (done) => {
    const store = createMockStore(defaultAuthState)
    const id = expenses[1].id
    const updates = {description: 'testdescription'}
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        })
        return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val().description).toBe('testdescription')
        done()
    })
})

