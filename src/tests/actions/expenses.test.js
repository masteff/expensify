import {addExpense, editExpense, removeExpense} from '../../actions/expenses'

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
    const expenseData = {
        description: 'rent',
        amount: 10999,
        createdAt: 1000,
        note: 'This was rent'
    }
    const action = addExpense(expenseData)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
        ...expenseData,
        id: expect.any(String)
    }
    })
})

test('should setup add expense actin object with default', () => {
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
        description: '', 
        note: '', 
        amount: 0, 
        createdAt: 0,
        id: expect.any(String)
    }
    })
})