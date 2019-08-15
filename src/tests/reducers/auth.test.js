import authReducer from '../../reducers/auth'

test('should handle login coorectly', () => {
    const action = {
        type: 'LOGIN',
        uid: '1234'
    }
    const state = authReducer({}, action)
    expect(state).toEqual({
        uid: '1234'
    })
})

test('should handle logout correctly', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({uid: '1234'},action)
    expect(state).toEqual({})
})