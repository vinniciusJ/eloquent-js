import State from "../State.js"
import Vec from "../Vec.js"

class Lava {
    constructor({ position, speed, reset }){
        this.position = position
        this.speed = speed
        this.reset = reset
        this.size = new Vec({ x: 1, y: 1 })
    }

    get type(){
        return 'lava'
    }

    collide({ state }){
        return new State({ level: state.level, actors: state.actors, status: 'lost' })
    }

    update({ time, state }){
        const newPosition = this.position.plus(this.speed.times(time))
        const hasTouchedLava = state.level.touches({
            position: newPosition,
            size: this.size,
            type: 'wall'
        }) 

        if(!hasTouchedLava){
            return new Lava({ position: newPosition, speed: this.speed, reset: this.reset })
        }
        else if(this.reset){
            return new Lava({ position: this.reset, speed: this.speed, reset: this.reset })
        }
        else {
            return new Lava({ position: this.position, speed: this.speed.times(-1) })
        }
    }

    static create({ position, char }){
        if(char === '='){
            return new Lava({ position, speed: new Vec({ x: 2, y: 0 }) })
        }
        else if(char === '|'){
            return new Lava({ position, speed:  new Vec({ x: 0, y: 2 }) })
        }
        else if(char === 'v'){
            return new Lava({ position, speed:  new Vec({ x: 0, y: 3 }) })
        }
    }
}

export default Lava 