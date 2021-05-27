class Utils{
    static createElement({ name, attrs, ...children }){
        const node = document.createElement(name)

        Object.entries(attrs).forEach(([ key, value ]) => node.setAttribute(key, value))

        Object.values(children).forEach(child => node.appendChild(child))

        return node
    }

    static overlap({ actor, player }){
        return (
            (actor.position.x + actor.size.x) > player.position.x &&
            actor.position.x < (player.position.x + player.size.x) &&
            (actor.position.y + actor.size.y) > player.position.y &&
            actor.position.y < (player.position.y + player.size.y)
        )
    }

    static trackKeys({ keys }){
        const down = Object.create(null)

        const track = event => {
            if(keys.includes(event.key)){
                down[event.key] = event.type == 'keydown'

                event.preventDefault()
            }
        }

        window.addEventListener('keydown', track)
        window.addEventListener('keyup', track)

        return down
    }


}

export default Utils