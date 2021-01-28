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

console.log(findSolution(24))