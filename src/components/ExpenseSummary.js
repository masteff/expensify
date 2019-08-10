import React from 'react'
import {connect} from 'react-redux'
import selectExpenses from '../selectors/expenses'
import selectTotalExpenses from '../selectors/expenses-total'
import numeral from 'numeral'

export const ExpenseSummary = ({total, number}) => {
    const expenseWord = number === 1 ? 'expense' : 'expenses'
    return (
        <div>
        <h2>Viewing {number} {expenseWord} with totalling of {numeral(total/100).format('$0,0.00')}</h2>
    </div>
    )
}
    

const mapStateToProps = (state) => ({
    total: selectTotalExpenses(selectExpenses(state.expenses,state.filters)),
    number: selectExpenses(state.expenses,state.filters).length
})

export default connect(mapStateToProps)(ExpenseSummary)