'use strict'

function canYouSpotTheProblem(){
    'use strict'

    for(counter = 0; counter < 10; counter++){
        console.log('Happy')
    }
}

//canYouSpotTheProblem() // 'use strict' retorna erro por não ter declaro o `counter` como `let` our `var`

// (String) -> name (Sempre que possível comentar o tipo esperado de uma variável ou parâmetro)
function Person(name) { 
    this.name = name
}

let person = Person('Ferdinand') 

console.log(name)

// como não foi criado uma instância de `Person`, o JS considera o `name` como uma variável global (sem o `use strict`)
