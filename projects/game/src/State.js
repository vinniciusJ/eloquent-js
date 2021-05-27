import Utils from "./Utils.js"

class State{
    constructor({ level, actors, status }){
        this.level = level
        this.actors = actors
        this.status = status
    }

    static start({ level }){
        return new State({ level, actors: level.startActors, status: 'playing' })
    }

    get player(){
        return this.actors.find(actor => actor.type === 'player')
    }

    update({ time, keys }){
        const actors = this.actors.map(actor => actor.update({
            time, state: this, keys
        }))

        let newState = new State({ level: this.level, actors,status: this.status})

        if(newState.status !== 'playing'){
            return newState
        }

        const { player } = newState

        const hasPlayerTouchedLava = this.level.touches({
            position: player.position,
            size: player.size,
            type: 'lava'
        })

        if(hasPlayerTouchedLava){
            return new State({ level: this.level, actors, status: 'lost' })
        }

        actors.forEach(actor => {
            if(actor != player && Utils.overlap({ actor, player })){
                newState = actor.collide({ state: newState })
            }
        })

        return newState
    }
}

export default State