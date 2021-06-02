import { createElement } from "./utils.js"
import Display from './Display.js'

const display = new Display()

class App{
    constructor(state, dispatch){
        this.dispatch = dispatch
        this.talkDOM = createElement('div', { className: 'talks' })
        this.dom = createElement('div', null, display.renderUserField(state.user), this.talkDOM, display.renderTalkForm(dispatch))

        this.syncState(state)
    }

    syncState(state){
        if(state.talks != this.talks){
            this.talkDOM.textContent = ""

            for(let talk of state.talks){
                this.talkDOM.appendChild(display.renderTalk(talk, this.dispatch))
            }

            this.talks = state.talks
        }
    }
}

export default App