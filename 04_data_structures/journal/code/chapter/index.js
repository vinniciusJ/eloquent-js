function phi([n00, n01, n10, n11]) {
    return (
        (n11 * n00 - n10 * n01) /
        Math.sqrt(
            (n10 + n11) *
            (n00 + n01) *
            (n01 + n11) *
            (n00 + n10)
        )
    )
}  

function tableFor(event, journal){
    let table = [ 0, 0, 0, 0 ]

    for(let i = 0; i < journal.length; i++){
        let entry = journal[i], index = 0

        if(entry.events.includes(event)) index += 1
        if(entry.squirrel) index += 2

        table[index] += 1
    }

    return table
}

function journalEvents(journal){
    let events = []

    for(let entry of journal){
        for(let event of entry.events){
            if(!events.includes(event)) events.push(event)
        }
    }

    return events
}

function max(...numbers) {
    let result = -Infinity

    for (let number of numbers) {
        if (number > result) result = number
    }

    return result
}
  
let list = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null
        }
    }
}

