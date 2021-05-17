function talksAbout(node, string){
    if(node.nodeType === Node.ELEMENT_NODE){
        for(let child of node.childNodes){
            if(talksAbout(child, string)){
                return true
            }
        }
    }
    else if(node.nodeType === Node.TEXT_NODE){
        return node.nodeValue.indexOf(string) > -1
    }
}

function createElement(type, ...children){
    const node = document.createElement(type)

    for(let child of children){
        if(typeof child != 'string'){
            node.appendChild(child)
        }
        else{
            node.appendChild(document.createTextNode(child))
        }
    }
    
    return node
}

console.log(talksAbout(document.body, 'book'))

const italicElement = createElement('em', 'The Open Society and Its Enimies')
const boldElement = createElement('strong', 'Karl Popper')
const footer = createElement('footer', '-', boldElement, ', preface tp the second edition of ', italicElement, ', 1950')

document.querySelector('#quote').appendChild(footer)

console.log(document.querySelector('#quote').getBoundingClientRect())

const cat = document.querySelector('#cat')
let angle = Math.PI / 2

function animate(time, lastTime){
    if(lastTime != null){
        angle += (time - lastTime) * 0.001
    }

    cat.style.top = `${Math.sin(angle) * 20}px`
    cat.style.left = `${Math.cos(angle) * 200}px`

    console.log(cat.style.left)

    requestAnimationFrame(newTime => animate(newTime, time))
}

requestAnimationFrame(animate)