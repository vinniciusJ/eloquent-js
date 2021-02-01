const every = (array, test) => {
    let status = true

    array.forEach(a => status = test(a))

    return status
}

console.log(every([1, 2, 5], n => n < 10))
console.log(every([2, 4, 16], n => n < 10))
console.log(every([], n => n < 10));