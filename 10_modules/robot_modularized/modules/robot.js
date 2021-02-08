const { find_path } = require('dijkstrajs')
const { roadGraph } = require('./roads')

function goalOrientedRobot({ place, parcels }, route){
    if(route.length == 0){
        let [ parcel ] = parcels

        if(parcel.place != place){
            route = find_path(roadGraph, place, parcel.place)
        }
        else {
            route = find_path(roadGraph, place, parcel.adress)
        }
    }

    return { direction: route[0], memory: route.slice(1) }
}

function runRobot(state, robot = goalOrientedRobot, memory = []){
    for(let turn = 0; ; turn++){
        if(state.parcels.length === 0){
            console.log(`Done in ${turn} turns`)
            
            break
        }

        let action = robot(state, memory)

        state = state.move(action.direction)
        memory = action.memory

        console.log(`Moved to ${action.direction}`)
    }
}


exports.runRobot = runRobot
  