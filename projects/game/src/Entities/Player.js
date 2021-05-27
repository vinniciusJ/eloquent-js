import Vec from "../Vec.js"

class Player {
    constructor({ position, speed }){
        this.position = position
        this.speed = speed
        this.size = new Vec({ x: .8, y: 1.5 })
    }

    static PLAYER_X_SPEED = 7
    static GRAVITY = 30
    static JUMP_SPEED = 17

    static create({ position }){
        const newPosition = position.plus(new Vec({ x: 0, y: -0.5 }))
        const speed = new Vec({ x: 0, y: 0 })

        return new Player({ position: newPosition, speed })
    }

    get type (){
        return 'player'
    }

    update({ time, state, keys }){
        let xSpeed = 0, { position, size } = this

        if(keys.ArrowLeft){
            xSpeed -= Player.PLAYER_X_SPEED
        }
        if(keys.ArrowRight){
            xSpeed += Player.PLAYER_X_SPEED
        }

        const movedX = position.plus(new Vec({ x: xSpeed * time, y: 0 }))

        if(!state.level.touches({ position: movedX, size, type: 'wall' })){
            position = movedX
        }

        let ySpeed = this.speed.y + time * Player.GRAVITY
        const movedY = position.plus(new Vec({ x: 0, y: ySpeed * time }))

        if(!state.level.touches({ position: movedY, size, type: 'wall' })){
            position = movedY
        }
        else if(keys.ArrowUp && ySpeed > 0){
            ySpeed = -Player.JUMP_SPEED
        }
        else {
            ySpeed = 0
        }

        return new Player({ position: position, speed: new Vec({ x: xSpeed, y: ySpeed }) })
    }
}

export default Player