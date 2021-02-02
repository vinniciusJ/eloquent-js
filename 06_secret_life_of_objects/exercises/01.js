class Vec{
    constructor(x, y){
        this.x = x
        this.y = y
        this.content = []

        for(let i = 0; i < y; i++){
            for(let j = 0; j < x; j++){
                this.content[i * x + j] = i * x + j
            }
        }
    }

    plus(vec){
        return new Vec((this.x + vec.x), (this.y + vec.y))
    }

    minus(vec){
        return new Vec((this.x - vec.x), (this.y - vec.y))
    }

    get length(){
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }
}

const toString = Symbol('toString')

Vec.prototype[toString] = function(){
    return `Vec { x: ${this.x}, y: ${this.y}}`
}

console.log(new Vec(3, 4).length)
console.log(new Vec(1, 2).plus(new Vec(2, 3))[toString]())
console.log(new Vec(1, 2).minus(new Vec(2, 3))[toString]())