class State{
    constructor({ level, actors, status }){
        this.level = level
        this.actors = actors
        this.status = status
    }

    static start({ level }){
        return new State(level, level.startActors, 'playing')
    }

    get player(){
        return this.actors.find(actor => actor.type === 'player')
    }
}

export default State