import { createElement } from "../Utils.js"
import PictureCanvas from "./PictureCanvas.js"

class PixelEditor{
    constructor(state, config){
        const { tools, controls, dispatch } = config

        this.state = state
        this.canvas = new PictureCanvas(state.picture, position => {
            const tool = tools[this.state.tool]

            const onMove = tool(position, this.state, dispatch)

            if(onMove){
                return position => onMove(position, this.state)
            }
        })

        this.controls = controls.map(Controll => new Controll(state, config))
        this.dom = createElement('div', {}, this.canvas.dom, createElement('br'), ...this.controls.reduce((a, c) => a.concat(" ", c.dom), []))
        
    }

    syncState(state){
        this.state = state
        this.canvas.syncState(state.picture)

        this.controls.forEach(control => control.syncState(state))
    }
}

export default PixelEditor