// //Objects
// const book = {
//     title: 'ego is the enemy',
//     author: 'ryan',
//     publisher: {
        
//     }
// }

// const {name: publisherName = 'Self-Published'} = book.publisher

// console.log(publisherName);

const address = ['emser', 'berlin', 'BE', '12051']

const [, , state, zip] = address

console.log(zip);

const item = ['coffee (hot)', 2, 2.5, 2.75]

const [coffee,,price] = item

console.log(`A ${coffee} costs ${price}`);