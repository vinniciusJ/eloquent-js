const rabbit = {
    type: 'White',
    speak(text){
        console.log(`The ${this.type} rabbit said "${text}"`)
    }
}

// Passando o this como parâmetro

rabbit.speak.call(rabbit, 'Hello')

// Prototype

console.log('Function Prototype -', Object.getPrototypeOf(rabbit.speak) == Function.prototype)
console.log('Object prototype -', Object.getPrototypeOf({}) == Object.prototype)
console.log('Array prototype -', Object.getPrototypeOf([]) == Array.prototype)

// Criando obj a partir de outro

const killerRabbit = Object.create(rabbit)

killerRabbit.type = 'killer'
killerRabbit.speak(`I'm gonna kill you!`)

// Classes

console.log()

// Constructor function

function Rabbit(type){
    this.type = type
}

Rabbit.prototype.speak = function(text){''
    console.log(`The ${this.type} rabbit said "${text}"`)
}

const kindRabbit = new Rabbit('kind')

kindRabbit.speak('Shall we be friends?')

console.log('Function proto default', Object.getPrototypeOf(Rabbit) === Function.prototype)
console.log('Instance of Rabbit prototype', Object.getPrototypeOf(kindRabbit) === Rabbit.prototype)

// Class notation

class Bird{
    constructor(type){
        this.type = type
    }
    speak(text){
        console.log(`The ${this.type} bird said "${text}"`)
    }
}

const happyBird = new Bird('happy')

happyBird.speak(`Hi, what's up?`)

// Class as value

const object = new class {
    printMessage(text){
        console.log(text)
    }
}

object.printMessage(`This is an example of class as a value`)

console.log()
// Map

const ages = new Map()

ages.set('Boris', 39)
ages.set('Liang', 22)
ages.set('Júlia', 62)

console.log(ages)
console.log()

console.log(`Júlia is ${ages.get('Júlia')}`)
console.log(`Is Jack's age known? ${ages.has('Jack') ? 'Yes' : 'No'}`)

console.log()

// Polymorphism

Rabbit.prototype.toString = function(){
    return `A(n) ${this.type} rabbit`
}

const newRabbit = new Rabbit('new')

console.log(String(newRabbit))
console.log()

// Symbols

// O nome das propriedades de um objeto pode ser "Symbols" além de "Strings"
// Não se pode criar um mesmo símbolo duas vezes diferente das strings

const nameSym = Symbol('name')

newRabbit[nameSym] = 'Dyogo'

console.log(nameSym)
console.log(newRabbit[nameSym])
console.log()

const toStringSym = Symbol('toString')

Array.prototype[toStringSym] = function(){
    return `${this.length} values`
}

console.log('.toString =>', [1, 2].toString())
console.log('[toStringSymbol] =>', [1, 2][toStringSym]())
console.log()

const usernameSym = Symbol('username')

const user = {
    [usernameSym]: 'Augusto',
    username: 'Nikoly'
}

console.log(user[usernameSym], user.username)
console.log()

// Getters and Setters

const varyingSize = {
    get size(){
        return Math.floor(Math.random() * 100)
    }
}

console.log('Get size 1 =>', varyingSize.size)
console.log('Get size 2 =>', varyingSize.size)


