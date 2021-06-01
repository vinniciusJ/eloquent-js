import { createElement, pictureFromImage } from "./utils.js"

class LoadButton{
    constructor(_, { dispatch }){
        this.dom = createElement('button', {
            onclick: () => this.startLoading(dispatch)
        }, "📁 Load")
    }

    startLoading(dispatch){
        const input = createElement('input', {
            type: 'file',
            onchange: () => this.finishLoading(input.files[0], dispatch)
        })

        input.click()
    }

    finishLoading(file, dispatch){
        if(!file){
            return
        }

        const reader = new FileReader()

        reader.addEventListener('load', () => {
            const image = createElement('img', {
                onload: () => dispatch({ picture: pictureFromImage(image) }),
                src: reader.result
            })
        })

        reader.readAsDataURL(file)
    }

    syncState(){}
}

export default LoadButton