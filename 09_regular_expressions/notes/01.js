// Regular Expression Sintex
const reg1 = RegExp('abc')
const reg2 = /abc/

// A \ é usada para que o `+` não tenha significado na expressão e que seja lido como um char como os outros

const eighteenPlus = /eighteen\+/

console.log(/abc/.test('abcdef'))
console.log(/abc/.test('edgabc'))

// Procurando números dentro de uma string
console.log(`Is there any number in this sentence (In 1922)?`, /[0123456789]/.test('In 1922'))

console.log(`Is there any number in this sentence (In 1922)`, /[0-9]/.test('In 1922'))

// \d -> qualquer digito

let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/

console.log()

console.log(`Is "01-30-2003 15:20" a valid format?`, dateTime.test('01-30-2003 15:20'))

console.log(`Is "30-jan-2003 15:20" a valid format?`,dateTime.test('30-jan-2003 15:20'))

// ^ inverção

const notBinary = /[^01]/

console.log()

console.log('Is it a binary number?', notBinary.test('1100100010100110'))

console.log('Is it a binary number?', notBinary.test('1100100020100110'))

// + indica que o elemento pode ser repetido mais que uma vez
// * igual ao +, porém também permite que seja igual a 0 as vezes

console.log()

console.log(/'\d+'/.test(`'123'`))
console.log(/'\d+'/.test(`''`))
console.log(/'\d*'/.test(`'123'`))
console.log(/'\d+'/.test(`''`))

console.log()

// ? optional char

let neighbour = /neighbou?r/

console.log('Neighbour ->', neighbour.test('neighbour'))
console.log('Neighbor ->', neighbour.test('neighbor'))

// {min, max} -> que um char pode ocorrer

dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/

console.log('Is "1-30-2003 8:45" a valid format?', dateTime.test('1-30-2003 8:45'))

console.log()

// (...) conta como somente um elemento
// i -> torna a expressão case insensitive

let cartoonCrying = /boo+(hoo+)+/i

console.log('Is he crying?', cartoonCrying.test('Boohoooohoohooo'))

console.log()

// RegExp.prototype.exec -> retorna `null` se não foi encontrado e um objeto com as informações se for encontrado

let match = /\d+/.exec('one two 100')

console.log('RegExp.prototype.exec')
console.log([...match])
console.log(match.index)

let quotedText = /'([^']*)'/

console.log()
console.log('Quoted text ->', quotedText.exec(`she said 'hello'`))

console.log(/bad(ly)?/.exec('bad'))
console.log(/(\d)+/.exec('123'))
console.log()

// \b -> \d{1,2} matches com `100`, enquanto \b\d{1,2}\b não

const getDate = string => {
    let data = /(\b\d{1,2})\b-(\b\d{1,2}\b)-(\b\d{4}\b)/.exec(string)

    if(data){
        let [ _, month, day, year ] = data

        return new Date(year, month - 1, day)
    }
    
    return null
}

console.log(getDate('01-30-2003'))

// | escolha igual ao ||

let animalCount = /\b\d+ (pig|cow|chicken)s?\b/

console.log(animalCount.test('15 pigs'))
console.log(animalCount.test('15 pigchickens'))

// String.prototype.replace

//console.log('Borobudur'.replace(/[ou]/, 'a'))

// //g -> aplica a todos ao invés de somente o primeiro elemento

//console.log('Borobudur'.replace(/[ou]/g, 'a'))

// \w caractere não alfabético 


console.log(
`Liskov, Barbara
McCarthy, John
Wadler, Philip`
.replace(/(\w+), (\w+)/g, '$2 $1')
)

let simpleText = 'the cia and fbi are...'

//console.log(simpleText.replace(/\b(fbi|cia)\b/g, str => str.toUpperCase()))

let stock = '1 lemon, 2 cabbages, and 101 eggs'

const minusOne = (match, amount, unit) => {
    amount = Number(amount) - 1

    if(amount === 1) 
        unit = unit.slice(0, unit.length - 1)
    else if(amount == 0)
        amount = 'no'
    
    return `${amount} ${unit}`
}

console.log(stock.replace(/(\d+) (\w+)/g, minusOne))

// Excluindo todos os comentário de um código JS

// { +, *, ?, {} } => greedy
// { +?, *?, ??, {}? } => nongreedy

const stripComments = code => code.replace(/\/\/.*|\/\*[^]*?\*\//g, "")

console.log(stripComments('1 + /* 2 */3'))
console.log(stripComments('x = 10 // ten!'))
console.log(stripComments('1 /* a */+/* b */ 1'))
