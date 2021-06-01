import { createElement } from "../Utils.js"

class ToolSelect{
    constructor(state, {tools, dispatch } ){
        this.select = createElement('select', {
            onchange:  () => dispatch({ tool: this.select.value }) 
        },
            ...Object.keys(tools).map(key => createElement('option', { selected: key == state.tool }, key))
        )

        this.dom = createElement('label', { }, '🖌 Tool: ', this.select)
    }

    syncState(state){
        this.select.value = state.tool
    }
}

export default ToolSelect