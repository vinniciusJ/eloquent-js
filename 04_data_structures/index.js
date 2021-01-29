// Objetos

// Propriedades com nomes inválidos de variáveis devem ser inseridas entre aspas

const description = {
    work: 'Went to work',
    'touched tree': 'Touched a tree'
}

console.log(description['touched tree'])

// Copiando as propriedades de um objeto para o outro

let model = { a: 1, b: 2 }

Object.assign(model, { c: 3, d: 4 })

console.log('Object.assign => ', model)

