import Vec from "../Vec.js"

class Player {
    constructor({ position, speed }){
        this.position = position
        this.speed = speed
    }

    get type (){
        return 'player'
    }

    static create({ position }){
        const newPosition = position.plus(new Vec({ x: 0, y: -0.5 }))
        const speed = new Vec({ x: 0, y: 0 })

        return new Player({ position: newPosition, speed })
    }
}

Player.prototype.size = new Vec({ x: .8, y: 1.5 })

export default Player