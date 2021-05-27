import Vec from './Vec.js'
import Coin from './Entities/Coin.js'
import Player from './Entities/Player.js'
import Lava from './Entities/Lava.js'

export const levelChars = {
    ".": "empty", 
    "#": "wall", 
    "+": "lava",
    "@": Player, 
    "o": Coin,
    "=": Lava, 
    "|": Lava, 
    "v": Lava
}

class Level {
    constructor({ plan }){
        let rows = plan.trim().split('\n').map(l => [...l])

        this.height = rows.length
        this.width = rows[0].length
        this.startActors = []

        this.rows = rows.map((row, y) => row.map((char, x) => {
            const type = levelChars[char]

            if(typeof type === 'string')
                return type
            
            this.startActors.push(type.create({ position: new Vec({ x, y }), char }))

            return 'empty'
        }))
    }

    touches({ position, size, type }){
        const [ xStart, xEnd, yStart, yEnd ] = [
            Math.floor(position.x),
            Math.ceil(position.x + size.x),
            Math.floor(position.y),
            Math.ceil(position.y + size.y)
        ]

        for(let y = yStart; y < yEnd; y++){
            for(let x = xStart; x < xEnd; x++){
                const isOutSide = (
                    x < 0 || x >= this.width || y < 0 || y >= this.height
                )

                const here = isOutSide ? 'wall' : this.rows[y][x]

                if(here === type){
                    return true
                }
            }
        }

        return false
    }
}

export default Level