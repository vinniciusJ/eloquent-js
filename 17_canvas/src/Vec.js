class Vec {
    constructor({ x, y }){
        this.x = x
        this.y = y
    }

    plus(other){
        const [ x, y ] = [ this.x + other.x, this.y + other.y ]

        return new Vec({ x, y })
    }

    times(factor){
        const [ x, y ] = [ this.x * factor, this.y * factor ]

        return new Vec({ x, y })
    }
}

export default Vec