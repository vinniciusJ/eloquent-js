// Interface -> Object

const weekDay = function(){
    const days = [ 
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
    ]

    return {
        name: number => days[number],
        number: name => days.indexOf(name)
    }
}()

// Esse método acima foi muito usado no passado no desenvolvimento web, mas hoje é obsoleto

