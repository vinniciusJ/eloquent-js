import ColorSelect from '../tools/ColorSelect.js'
import ToolSelect from '../tools/ToolSelect.js'
import SaveButton from '../SaveButton.js'
import LoadButton from '../LoadButton.js'
import UndoButton from '../UndoButton.js'
import PixelEditor from '../Entities/PixelEditor.js'
import Picture from '../Entities/Picture.js'

import { draw, fill, pick, createRectangle as rect, updateStateInHistory } from '../utils.js'

const startState = {
    tool: "draw",
    color: "#000000",
    picture: Picture.empty(60, 30, "#f0f0f0"),
    done: [],
    doneAt: 0
}

class PixelEditorController {
    constructor(){
        this.state = startState
        this.tools = { draw, fill, pick, rect }
        this.controls = [ ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton ]
    }

    static initialize(){
        let { state, tools, controls} = new PixelEditorController(startState)

        const app = new PixelEditor(startState, {
            tools, 
            controls,
            dispatch: action => {
                state = updateStateInHistory(state, action)

                app.syncState(state)
            }
        })

        return app.dom
    }
}

export default PixelEditorController