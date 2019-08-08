import moment from 'moment'

const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    enddate: undefined
}

const altfilters = {
    text: 'bill',
    sortBy: 'amount',
    startDate: moment(0),
    enddate: moment(0).add(3, 'days')
}

export {filters, altfilters}