class Picture{
    constructor(width, height, pixels){
        this.width = width
        this.height = height
        this.pixels = pixels
    }

    static empty(width, height, color){
        const pixels = new Array(width * height).fill(color);

        return new Picture(width, height, pixels)
    }

    pixel(x, y){
        return this.pixels[x + y * this.width]
    }

    draw(pixels){ 
        const copiedPixels = [...this.pixels]

        pixels.forEach(({ x, y, color }) => {
            copiedPixels[x + y * this.width] = color
        })

        return new Picture(this.width, this.height, copiedPixels)
    }
}

export default Picture