const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
]

function createRow(values, type = 'td'){
    const parentNode = document.createElement('tr')

    for(let text of values){
        const node = document.createElement(type)

        node.innerText = text

        if(typeof text === 'number'){
            node.style.textAlign = 'right'
        }

        parentNode.appendChild(node)
    } 
    
    return parentNode
}

function createTable(heading, rows){
    const table = document.createElement('table')

    table.append(heading)
    rows.forEach(row => table.appendChild(row))

    return table
}

function displayTable(table){
    const container = document.querySelector('#mountains')

    container.append(table)
}

const heading = createRow(Object.keys(MOUNTAINS[0]), 'th')
const rows = MOUNTAINS.map(mountain => createRow(Object.values(mountain)))

const table = createTable(heading, rows)

displayTable(table)