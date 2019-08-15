import {shallow} from 'enzyme'
import React from 'react'
import {Header} from '../../components/Header'



test('should render Header corectly', () => {
    const wrapper = shallow(<Header startLogout={()=>{}}/>)
    expect(wrapper).toMatchSnapshot()
})

test('should call startLogout on Button Click', () => {
    const onClickSpy = jest.fn()
    const wrapper = shallow(<Header startLogout={onClickSpy}/>)
    wrapper.find('button').simulate('click')
    expect(onClickSpy).toHaveBeenCalled()
})