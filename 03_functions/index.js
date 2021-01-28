// Funções recursivas

// Ex: Encontrar a solução matemática para um número, podendo somente adicionar 5 ou multiplicar por 3

const findSolution = target => {
    const find = (current, history) => {
        if(current == target){
            return history
        }
        else if(current > target){
          return null
        }
        else{
            return find(current + 5, `(${history}) + 5`) || 
                   find(current * 3, `(${history}) * 3`) 
        }
    }
    return find(1, '1')
}

findSolution(24)

// Declarar funções com nomes óbvios

const zeroPad = (number = 0, width = 0) => {
    let string = String(number)

    while(string.length < width){
        string = `0${string}`
    }

    return string
} 

const printFarmInventory = (...args) => {
    args.forEach(arg => {
        const [ key ] = Object.keys(arg)

        console.log(`${zeroPad(arg[key], 3)} ${key[0].toUpperCase() + key.substr(1)}`)
    })
}

printFarmInventory({ cows: 5 }, { chickens: 10 }, { pigs: 9 })

