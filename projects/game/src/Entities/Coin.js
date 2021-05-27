import State from "../State.js"
import Vec from "../Vec.js"

class Coin {
    constructor({ position, basePosition, wobble }){
        this.position = position
        this.basePosition = basePosition
        this.wobble = wobble
        this.size = new Vec({ x: .6, y: .6 })
    }    
    
    static WOBBLE_SPEED = 8
    static WOBBLE_DIST = .07

    static create({ position }){
        const basePosition = position.plus(new Vec({ x: .2, y: .1 }))

        return new Coin({ position: basePosition, basePosition, wobble: (Math.random() * Math.PI * 2) })
    }

    get type(){
        return 'coin'
    }

    collide({ state }){
        let { level, actors, status } = state

        const filteredeActors = actors.filter(actor => actor != this)
 
        if(!filteredeActors.some(actor => actor.type === 'coin')){
            status =  'won'
        }

        return new State({ level, actors: filteredeActors, status })
    }

    update({ time }){
        const wobble = this.wobble + time * Coin.WOBBLE_SPEED
        const wobblePosition = Math.sin(wobble) * Coin.WOBBLE_DIST

        return new Coin({ 
            position: this.basePosition.plus(new Vec({ x: 0, y: wobblePosition })),
            basePosition: this.basePosition,
            wobble
        })
    }
}

export default Coin