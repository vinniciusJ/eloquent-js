import { createElement, drawPicture, getPointerPosition } from "../utils.js"

class PictureCanvas{
    static SCALE = 10

    constructor(picture, pointerDown){
        this.dom = createElement('canvas', {
            onmousedown: event => this.mouse(event, pointerDown),
            ontouchstart: event => this.touch(event,pointerDown)
        })

        this.syncState(picture)
    }

    syncState(picture){
        if(this.picture === picture){
            return
        }

        this.picture = picture

        drawPicture(this.picture, this.dom, PictureCanvas.SCALE)
    }

    mouse(downEvent, onDown){
        if(downEvent.button != 0){
            return
        }

        let position = getPointerPosition(downEvent, this.dom)
        let onMove = onDown(position)

        if(!onMove){
            return
        }

        const move = moveEvent => {
            if(moveEvent.buttons ==  0){
                this.dom.removeEventListener('mousemove', move)
            }
            else{
                const newPosition = getPointerPosition(moveEvent, this.dom)

                if(newPosition.x == position.x && newPosition.y == position.y){
                    return
                }

                position = newPosition

                onMove(position)
            }
        }

        this.dom.addEventListener('mousemove', move)
    }

    touch(startEvent, onDown){
        let position = getPointerPosition(startEvent.touches[0], this.dom)

        const onMove = onDown(position)

        startEvent.preventDefault()

        if(!onMove){
            return
        }

        const move = moveEvent => {
            const newPosition = getPointerPosition(moveEvent.touches[0], this.dom)

            if(newPosition.x == position.x && newPosition.y == position.y){
                return
            }

            position = newPosition
  
            onMove(position)
        }

        const end = () => {
            this.dom.removeEventListener('touchmove', move)
            this.dom.removeEventListener('touchend', end)
        }

        this.dom.addEventListener('touchmove', move)
        this.dom.addEventListener('touchend', end)
    }
}

export default PictureCanvas