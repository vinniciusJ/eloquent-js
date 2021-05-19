import Vec from "../Vec.js"

class Coin {
    constructor({ position, basePosition, wobble }){
        this.position = position
        this.basePosition = basePosition
        this.wobble = wobble
    }

    get type(){
        return 'coin'
    }

    static create({ position }){
        const basePosition = position.plus(new Vec({ x: .2, y: .1 }))

        return new Coin({ position: basePosition, basePosition: (Math.random() * Math.PI * 2) })
    }
}

Coin.prototype.size = new Vec({ x: .6, y: .6 })

export default Coin