import { createElement } from "./utils.js"

class UndoButton{
    constructor(state, { dispatch }){
        this.dom = createElement('button', {
            onclick: () => dispatch({ undo: true }),
            disabled: state.done.length == 0
        }, '⮪ Undo')
    }

    syncState(state){
        this.dom.disabled = state.done.length == 0
    }
}

export default UndoButton