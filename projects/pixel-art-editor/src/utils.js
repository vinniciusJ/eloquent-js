import PictureCanvas from './Entities/PictureCanvas.js'
import Picture from './Entities/Picture.js'

export const updateState = (state, action) => {
    return Object.assign({}, state, action)
}

export const createElement = (type, props, ...children) => {
    const node = document.createElement(type)

    if(props){
        Object.assign(node, props)
    }

    children.forEach(child => {
        if(typeof child !== 'string'){
            node.appendChild(child)
        }
        else{
            node.appendChild(document.createTextNode(child))
        }
    })

    return node
}

export const drawPicture = (picture, canvas, scale) => {
    canvas.width = picture.width * scale
    canvas.height = picture.height * scale

    const context = canvas.getContext('2d')

    for(let y = 0; y < picture.height; y++){
        for(let x = 0; x < picture.width; x++){
            context.fillStyle = picture.pixel(x, y)
            context.fillRect(x * scale, y * scale, scale, scale)
        }
    }
}

export const getPointerPosition = (position, node) => {
    const rect = node.getBoundingClientRect()

    return {
        x: Math.floor((position.clientX - rect.left) / PictureCanvas.SCALE),
        y: Math.floor((position.clientY - rect.top) / PictureCanvas.SCALE)
    }
}

export const draw = (position, state, dispatch) => {
    const drawPixel = ({ x, y }, state ) => {
        dispatch({ picture: state.picture.draw([{ x, y, color: state.color }]) })
    }

    drawPixel(position, state)

    return drawPixel
}

export const createRectangle = (start, state, dispatch) => {
    const drawRectangle = position => {
        const [ xStart, yStart, xEnd, yEnd ] = [
            Math.min(start.x, position.x),
            Math.min(start.y, position.y),
            Math.max(start.x, position.x),
            Math.max(start.y, position.y),
        ]

        const drawnRects = []

        for(let y = yStart; y < yEnd; y++){
            for(let x = xStart; x < xEnd; x++){
                drawnRects.push({ x, y, color: state.color })
            }
        }

        dispatch({ picture: state.picture.draw(drawnRects)})
    }

    drawRectangle(start)

    return drawRectangle
}

const around = [
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 }
]

export const fill = ({ x, y }, state, dispatch) => {
    const targetColor = state.picture.pixel(x, y)
    const drawn = [ { x, y, color: state.color } ]

    for(let done = 0; done < drawn.length; done++){
        for(let { dx, dy } of around){
            const x = drawn[done].x + dx
            const y = drawn[done].y + dy

            const verify = (
                x >= 0 && x < state.picture.width &&
                y>= 0 && y < state.picture.height &&
                state.picture.pixel(x, y) == targetColor &&
                !drawn.some(pixel => pixel.x == x && pixel.y == y)
            )

            if(verify){
                drawn.push({ x, y, color: state.color })
            }
        }
    }
    dispatch({ picture: state.picture.draw(drawn) })
}

export const pick = ({ x, y }, state, dispatch) => {
    dispatch({ color: state.picture.pixel(x, y )})
}

export const pictureFromImage = image => {
    const [ width, height ] = [
        Math.min(100, image.width),
        Math.min(100, image.height)
    ]
    console.log(image.width, image.height, width, height)
    const canvas = createElement('canvas', { width, height })
    const context = canvas.getContext('2d')

    context.drawImage(image, 0, 0)

    const pixels = [], { data } = context.getImageData(0, 0, width, height)

    const toHex = number => number.toString('16').padStart(2, '0')

    for(let i = 0; i < data.length; i += 4){
        const [ r, g, b ] = data.slice(i, i + 3)

        pixels.push(`#${toHex(r)}${toHex(g)}${toHex(b)}`)
    }

    return new Picture(width, height, pixels)
}

export const updateStateInHistory = (state, action) => {
    if(action.undo === true){
        if(state.done.length == 0){
            return state
        }

        return Object.assign({}, state, {
            picture: state.done[0],
            done: state.done.slice(1),
            doneAt: 0
        })
    }
    else if(action.picture && state.doneAt < (Date.now() - 1000)){
        return Object.assign({}, state, action, {
            done: [ state.picture, ...state.done ],
            doneAt: Date.now()
        })
    }
    else {
        return Object.assign({}, state, action)
    }
}