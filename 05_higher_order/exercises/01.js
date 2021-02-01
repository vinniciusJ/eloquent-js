let arrays = [[1, 2, 3], [4, 5], [6]]

let flattenedArray = arrays.reduce((flat, value) => flat.concat(value), [])

console.log('Using Array.prototype.reduce + Array.prototype.concat', flattenedArray)

flattenedArray = arrays.flat()

console.log('Using Array.prototype.flat => ', flattenedArray)