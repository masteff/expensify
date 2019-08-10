
export default (expenses) => {
    return expenses
    .map((expense) => expense.amount)
    .reduce((total, num) => total + num, 0 )
}