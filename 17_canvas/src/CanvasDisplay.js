const sprites = {
    player: document.createElement('img'),
    others: document.createElement('img')
}

sprites.player.src = '../images/player.png'
sprites.others.src = '../images/sprites.png'

const SCALE = Symbol('SCALE')
const PLAYER_X_OVERLAP = Symbol('PLAYER_X_OVERLAP')

class CanvasDisplay {
    constructor({ parent, level }){
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.canvas.width = Math.min(600, level.width * CanvasDisplay[SCALE])
        this.canvas.height = Math.min(450, level.width * CanvasDisplay[SCALE])
        this.flipPlayer = false
        this.viewport = {
            left: 0,
            top: 0,
            width: this.canvas.width / CanvasDisplay[SCALE],
            height: this.canvas.height / CanvasDisplay[SCALE]
        }

        parent.appendChild(this.canvas)  
    }

    clear(){
        this.canvas.remove()
    }

    syncState({ state }){
        const { status, level, actors } = state

        this.updateViewport({ state })
        this.clearDisplay({ status })
        this.drawBackground({ level })
        this.drawActors({ actors })
    }

    updateViewport({ state }){
        const { viewport: view } = this, { player } = state
        const margin = view.width / 3

        const center = player.position.plus(player.size.times(.5))

        if(center.x < view.left + margin){
            view.left = Math.max(center.x - margin, 0)
        }
        else if(center.x > view.left + view.width - margin){
            view.left = Math.min(center.x + margin - view.width,state.level.width - view.width)
        }

        if(center.y < view.top + margin){
            view.top = Math.max(center.y - margin, 0)
        }
        else if(center.y > view.top + view.height - margin){
            view.top = Math.min(center.y + margin - view.height,state.level.height - view.height)
        }  
    }

    clearDisplay({ status }){
        if(status === 'won'){
            this.context.fillStyle = 'rgb(68, 191, 255)'
        }
        else if(status === 'lost'){
            this.context.fillStyle = 'rgb(44, 136, 214)'
        }
        else{
            this.context.fillStyle = 'rgb(52, 166, 251)'
        }

        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    drawBackground({ level }){
        const { top, left, width, height } = this.viewport

        const [ xStart, xEnd, yStart, yEnd ] = [
            Math.floor(left),
            Math.ceil(left + width),
            Math.floor(top),
            Math.floor(top + height)
        ]

        const scale = CanvasDisplay[SCALE]

        for(let y = yStart; y < yEnd; y++){
            for(let x = xStart; x < xEnd; x++){
                const tile = level.rows[y][x]

                if(tile === 'empty'){
                    continue
                }

                const screenX = (x - left) * scale
                const screenY = (y - top) * scale

                const tileX = tile === 'lava' ? scale : 0
                
                this.context.drawImage(sprites.others, tileX, 0, scale, scale, screenX, screenY, scale, scale)
            }
        }
    }

    drawPlayer({ player, x, y, width, height }){
        width += CanvasDisplay[PLAYER_X_OVERLAP] * 2
        x -= CanvasDisplay[PLAYER_X_OVERLAP]

        if(player.speed.x != 0){
            this.flipPlayer = player.x < 0
        }

        let tile = 8 

        if(player.speed.y != 0){
            tile = 9
        }
        else if(player.speed.y != 0){
            tile = Math.floor(Date.now() / 60) % 8
        }

        this.context.save()

        if(this.flipPlayer){
            flipHorizontally({
                context: this.context,
                quantity: x + width / 2
            })
        }

        let tileX = tile * width

        this.context.drawImage(sprites.player, tileX, 0, width, height, x, y, width, height)
        this.context.restore()
    }

    drawActors({ actors }){
        const draw = actor => {
            const scale = CanvasDisplay[SCALE]
            const [ width, height ] = [ actor.size.x * scale, actor.size.y * scale ]
            const [ x, y ] = [ (actor.position.x - this.viewport.left) * scale, (actor.position.y - this.viewport.top) * scale ]

            if(actor.type === 'player'){
                this.drawPlayer({ player: actor, x, y, width, height })
            }
            else{
                const tileX = (actor.type === 'coin' ? 2 : 1) * scale

                this.context.drawImage(sprites.others, tileX, 0, width, height, x, y, width, height)
            }

        }

        actors.forEach(draw)
    }

    static [SCALE] = 20
    static [PLAYER_X_OVERLAP] = 4
}

export default CanvasDisplay