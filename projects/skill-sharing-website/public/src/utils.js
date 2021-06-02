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