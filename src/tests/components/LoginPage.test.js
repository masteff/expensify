import React from 'react'
import {shallow} from 'enzyme'
import {LoginPage} from '../../components/LoginPage'

test('Should render login page correctly', () => {
    const wrapper = shallow(<LoginPage/>)
    expect(wrapper).toMatchSnapshot()
})

test('should call startLogin on Button Click', () => {
    const onClickSpy = jest.fn()
    const wrapper = shallow(<LoginPage startLogin={onClickSpy}/>)
    wrapper.find('button').simulate('click')
    expect(onClickSpy).toHaveBeenCalled()
})