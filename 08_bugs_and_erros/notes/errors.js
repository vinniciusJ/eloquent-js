{

const promptNumber = (question, number) => {
    let result = Number(number) // seria o prompt aqui

    return Number.isNaN(result) ? null : result
}

// console.log(promptNumber('How many trees do you see?'))

// Exceptions

const getDirection = result => {
    if(result.toLowerCase() == 'left') return 'L'
    if(result.toLowerCase() == 'right') return 'R'
    
    throw new Error(`Invalid direction: ${result}`)
}

const look = () => {
    if(getDirection('left') == 'L')
        return 'a house'
    else
        return 'two angry bears'
}

/*try{
    console.log(`You see ${look()}`)
}
catch(error){
    console.log(`Something went wrong: ${error}`)
}*/

}

{

const accounts = { a: 100, b: 0, c: 20 }

const getAccount = accountName => {
    if(!accounts.hasOwnProperty(accountName))
        throw new Error(`No such account: ${accountName}`)
    
    return accountName
}

const transfer = ({ from, to }, amount) => {
    if(accounts[from] < amount) return

    let progress = false

    try{
        accounts[from] -= amount
        accounts[getAccount(to)] += amount
        
        progress = true
    }
    finally{
        if(!progress) accounts[from] += amount
    }
} 

transfer({ from: 'a', to: 'b' }, 50)
transfer({ from: 'b', to: 'z' }, 100) // Não ocorre nenhuma modificação nas contas

//console.log(accounts)

}

{

class InputError extends Error{}

const getDirection = direction => {
    if(direction.toLowerCase() ==='left') return 'L'
    if(direction.toLowerCase() === 'right') return 'R'

    throw new InputError(`Invalid direction: ${direction}`)
}

const loopStatus = false

while(loopStatus){
    try{
        let direction = getDirection('left')

        console.log(`You chose ${direction}`)
        break
    }
    catch(error){
        if(error instanceof InputError)
            console.log('Not a valid direction. Try again.')
        else
            throw error
    }
}

}
