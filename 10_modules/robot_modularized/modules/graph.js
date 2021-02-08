function buildGraph(edges){
    const graph = Object.create(null)

    function addEdge(from, to){
        if(graph[from] == null){
            graph[from] = { [to]: 1 }
        }
        else{
            graph[from] = { ...graph[from], [to]: 1 }
        }
    }

    for(let [ from, to ] of edges){
        addEdge(from, to)
        addEdge(to, from)
    }

    return graph
}

exports.buildGraph = buildGraph