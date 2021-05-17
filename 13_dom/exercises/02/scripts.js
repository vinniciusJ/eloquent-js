function getElementsByTag(node, tagName){
    const { children } = node, elements = []

    for(let child of children){
        if(child.nodeName.toLowerCase() === tagName.toLowerCase()){
            elements.push(child)
        }
        else if(child.children.length){
            const foundElements = getElementsByTag(child, tagName)

            foundElements.map(foundEl => elements.push(foundEl))
        }
    }

    return elements
}

console.log(getElementsByTag(document.body, "h1").length)

console.log(getElementsByTag(document.body, "span").length)

let para = document.querySelector("p")

console.log(getElementsByTag(para, "span").length)

