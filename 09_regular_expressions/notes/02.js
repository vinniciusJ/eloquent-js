// RegExp dinâmico
let user = 'nikoly'
let text = 'Nikoly is the one who sends nudes to Marck Zuckerberg'

// gi -> global & insesitive case

let regexp = new RegExp(`\\b(${user})\\b`, 'gi')

// console.log(text.replace(regexp, '_$1_'))

user = 'dea+hl[]rd'
text = 'This dea+hl[]rd guy is super annoying'

let escaped = user.replace(/[\\[.+*?(){|^$]/g, '\\$&')

regexp = new RegExp(`\\b${escaped}\\b`, 'gi')

// console.log(text.replace(regexp, '_$&_'))

// The Search Method

// String.prototype.search -> -1 | the first index of
// \S non-whitespace

// console.log('  word'.search(/\S/g))
// console.log(' '.search(/\S/))

// The lastIndex property

let pattern = /y/g

pattern.lastIndex = 3

let match = pattern.exec('xyzzy')

// console.log(match.index)
// console.log(pattern.lastIndex)

let global = /abc/g
let sticky = /abc/y


console.log(global.exec('xyz abc'))
console.log(sticky.exec('xyz abc'))
 
sticky.lastIndex =  4
console.log(sticky.exec('xyz abc'))


// Não chamar o método call de uma regex mais de uma vez, se usar, resetar o lastIndex, pois isso pode mudar a posição da string que começará a busca

let digit = /\d/g


console.log(digit.exec('here it is: 1'))
console.log(digit.exec('and now: 1')) 
digit.lastIndex = 0
console.log(digit.exec('and now: 1'))


// /g em String.prototype.match

// console.log('Banana'.match(/an/g))

// Usar /g somente quando precisa usar o lastIndex

// Iterando sobre matches

let input = 'A string with 3 numbers in it... 42 and 88'
let number = /\b\d+\b/g

while(match = number.exec(input)){
    console.log(`Found ${match[0]} at ${match.index}`)
}


