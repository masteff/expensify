import {shallow} from 'enzyme'
import React from 'react'
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';

test('should render EDbP corectly', () => {
    const wrapper = shallow(<ExpenseDashboardPage/>)
    expect(wrapper).toMatchSnapshot()
})