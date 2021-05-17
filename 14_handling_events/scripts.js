/* window.addEventListener("keydown", event => {
    if (event.key == " " && event.ctrlKey) {
        console.log("Continuing!")
    }
}) */
/* window.addEventListener("click", event => {
    let dot = document.createElement("div")
    dot.className = "dot"
    dot.style.left = (event.pageX - 4) + "px"
    dot.style.top = (event.pageY - 4) + "px"
    document.body.appendChild(dot)
  }) */

/* let lastX // Tracks the last observed mouse X position
let bar = document.querySelector("div")

bar.addEventListener("mousedown", (event) => {
    if (event.button == 0) {
        lastX = event.clientX

        window.addEventListener("mousemove", moved)
        event.preventDefault() // Prevent selection
    }
})

function moved(event) {
    if (event.buttons == 0) {
        window.removeEventListener("mousemove", moved)
    } else {
        let dist = event.clientX - lastX
        let newWidth = Math.max(10, bar.offsetWidth + dist)
        bar.style.width = newWidth + "px"
        lastX = event.clientX
    }
} */
/* function update(event) {
    for (let dot; dot = document.querySelector("dot");) {
        dot.remove()
    }

    for (let i = 0; i < event.touches.length; i++) {
        let { pageX, pageY } = event.touches[i]

        let dot = document.createElement("dot")

        dot.style.left = (pageX - 50) + "px"
        dot.style.top = (pageY - 50) + "px"

        document.body.appendChild(dot);
    }
}

window.addEventListener("touchstart", update);
window.addEventListener("touchmove", update);
window.addEventListener("touchend", update); */

// Web Worker

const squareWorker = new Worker('./webworker.js')

squareWorker.addEventListener('message', event => {
    console.log(`The worker responded: ${event.data}`)
})

squareWorker.postMessage(10)
squareWorker.postMessage(20)