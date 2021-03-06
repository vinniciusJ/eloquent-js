// Calculando a média entre os códigos vivos e os mortos

function average(array){
    return array.reduce((a, b) => a + b) / array.length
}

function characterCount(script){
    return script.ranges.reduce((count, [ from, to ]) => count + (to - from), 0)
}

function countBy(items, groupName){
    let counts = []

    for(let item of items){
        let name = groupName(item)
        let known = counts.findIndex(c => c.name == name)

        if(known == -1 ){
            counts.push({ name, count: 1 })
        }
        else {
            counts[known].count++
        }
    }

    return counts
}

function characterScript(code){
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => code >= from && code < to))
            return script
    }

    return null
}

// Imprimindo quais scrips são usados numa string

function textScripts(text){
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0))

        return script ? script.name : 'none'
    })
    .filter(({ name }) => name != 'none')

    let total = scripts.reduce((n, { count }) => n + count, 0)

    if(total == 0) return 'No scripts found'

    return scripts.map(({ name, count }) => `${Math.round(count * 100 / total)}% ${name}`).join(', ')
}

function dominantDirection(text){
    const scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0))

        return script ? script.name : 'none'
    })
    .filter(({ name }) => name != 'none')

    const selectedScripts = scripts.map(script =>
        SCRIPTS.filter(s => s.name === script.name)
            .map(({ direction }) => ({ direction, count: script.count })))
            .flat()

    const sumTotalDirections = direction => 
        selectedScripts.filter(s => s.direction == direction).map(s => s.count)

    const totalLTR = sumTotalDirections('ltr') 
    const totalRTL = sumTotalDirections('rtl')

    console.log(totalRTL > totalLTR ? 'rtl' : 'ltr')
}
