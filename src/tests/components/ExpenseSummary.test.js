import React from 'react'
import {shallow} from 'enzyme'
import {ExpenseSummary} from '../../components/ExpenseSummary'

test('should redner Expense Summary with 1 expense coorectly', () => {
    const wrapper = shallow(<ExpenseSummary number={1} total={100}/>)
    expect(wrapper).toMatchSnapshot()
})

test('should redner Expense Summary with more expenses coorectly', () => {
    const wrapper = shallow(<ExpenseSummary number={5} total={100}/>)
    expect(wrapper).toMatchSnapshot()
})