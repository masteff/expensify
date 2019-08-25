import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import selectExpenses from '../selectors/expenses'
import selectTotalExpenses from '../selectors/expenses-total'
import numeral from 'numeral'

export const ExpenseSummary = ({total, number}) => {
    const expenseWord = number === 1 ? 'expense' : 'expenses'

    return (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">Viewing <span>{number}</span> {expenseWord} with totalling of <span>{numeral(total/100).format('$0,0.00')}</span></h1>
            <div className="page_header__actions">
                <Link className="button" to="/create">Add Expense</Link>
            </div>
        </div>
    </div>
    )
}
    

const mapStateToProps = (state) => ({
    total: selectTotalExpenses(selectExpenses(state.expenses,state.filters)),
    number: selectExpenses(state.expenses,state.filters).length
})

export default connect(mapStateToProps)(ExpenseSummary)