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
}

export default Level