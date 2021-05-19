import Vec from "../Vec.js"

class Lava {
    constructor({ position, speed, reset }){
        this.position = position
        this.speed = speed
        this.reset = reset
    }

    get type(){
        return 'Lava'
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

Lava.prototype.size = new Vec({ x: 1, y: 1 })

export default Lava 