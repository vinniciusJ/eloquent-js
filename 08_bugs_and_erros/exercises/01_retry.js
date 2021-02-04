class MultiplicatorUnitFailure extends Error {}

const primitiveMultiply = (a, b) => {
    if(Math.random() < 0.2)
        return a * b
    else 
        throw new MultiplicatorUnitFailure('Klunk')
}

const reliableMultiply = (a, b) => {
    let result = 0

    try{
        result = primitiveMultiply(a, b)
    }
    catch{
        result = reliableMultiply(a, b)
    }

    return result
}

console.log(reliableMultiply(8, 8))