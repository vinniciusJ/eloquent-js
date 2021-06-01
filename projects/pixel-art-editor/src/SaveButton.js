import { createElement, drawPicture } from "./utils.js"

class SaveButton{
    constructor(state){
        this.picture = state.picture
        this.dom = createElement('button', {
            onclick: () => this.save()
        }, "💾 Save")
    }

    save(){
        const canvas = createElement('canvas')

        drawPicture(this.picture, canvas, 1)

        const link = createElement('a', {
            href: canvas.toDataURL(),
            download: 'pixelart.png'
        })

        document.body.appendChild(link)

        link.click()
        link.remove()
    }

    syncState(state){
        this.picture = state.picture 
    }
}

export default SaveButton