import { createElement } from "../Utils.js"

class ColorSelect{
    constructor(state, { dispatch }){
        this.input = createElement('input', {
            type: 'color',
            value: state.color,
            onchange: () => dispatch({ color: this.input.value })
        })

        this.dom = createElement('label', {}, '🎨 Color: ', this.input)
    }

    syncState(state){
        this.input.value = state.color
    }
}

export default ColorSelect