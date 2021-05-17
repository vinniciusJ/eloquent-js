const ballon = document.querySelector('#balloon')
let currentSize = ballon.style.fontSize || 16

window.addEventListener('keydown', ({ key }) => {
    const percent = currentSize * .1
    const newSize = key === 'ArrowUp' ? currentSize + percent : currentSize - percent

    currentSize = newSize
    ballon.style.fontSize = `${newSize}px`
})