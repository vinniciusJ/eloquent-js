import Utils from './Utils.js'

const SCALE = 20

const drawGrid = ({ level }) => Utils.createElement({
    name: 'table',
    attrs: {
        class: 'background',
        style: `width: ${level.width * SCALE}px`,
    },
    ...level.rows.map(row => Utils.createElement({
        name: 'tr',
        attrs: { 
            style: `height: ${SCALE}px` 
        },
        ...row.map(type => Utils.createElement({
            name: 'td',
            attrs: { class: type }
        }))
    }))
})

const drawActors = ({ actors }) => Utils.createElement({
    name: 'div',
    attrs: {},
    ...actors.map(actor => {
        const node = Utils.createElement({
            name: 'div',
            attrs: {
                class: `actor ${actor.type}`
            }
        })

        node.style.width = `${actor.size.x * SCALE}px`
        node.style.height = `${actor.size.y * SCALE}px`
        node.style.left = `${actor.position.x * SCALE}px`
        node.style.top = `${actor.position.y * SCALE}px`

        return node
    })
})

class DOMDisplay {
    constructor({ parent, level }){
        this.dom = Utils.createElement({
            name: 'div',
            attrs: { class: 'game' },
            children: drawGrid({ level })
        })

        this.actorLayer = null

        parent.appendChild(this.dom)
    }

    clear(){
        this.dom.remove()
    }

    syncState({ state }){
        if(this.actorLayer){
            this.actorLayer.remove()
        }
    
        this.actorLayer = drawActors({ actors: state.actors })
        this.dom.appendChild(this.actorLayer)
        this.dom.className = `game ${state.status}`
    
        this.scrollPlayerIntoView({ state })
    }

    scrollPlayerIntoView({ state }){
        const [ width, height ] = [
            this.dom.clientWidth,
            this.dom.clientHeight
        ]
    
        const margin = width / 3;

        const [ left, top ] = [ this.dom.scrollLeft, this.dom.scrollTop ]
        const [ right, bottom ] = [ left + width, top + height ]
       
        const { player } = state
        const center = player.position.plus(player.size.times(.5)).times(SCALE)
    
        if(center.x < (left + margin)){
            this.dom.scrollLeft = center.x - margin
        }
        else if(center.x > (right - margin)){
            this.dom.scrollLeft = center.x + margin - width
        }
    
        if(center.y < (top + margin)){
            this.dom.scrollTop = center.y - margin
        }
        else if(center.y > (bottom - margin)){
            this.dom.scrollTop = center.y + margin - height
        }
    }
}

export default DOMDisplay