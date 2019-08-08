const add = require('./a');
const _ = require('lodash');

const sum = add(2, 3);

console.log(sum)

const arr = _.concat([1, 2], 3);
console.log(arr);