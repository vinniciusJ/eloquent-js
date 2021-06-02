function readStream(stream){
    return new Promise((resolve, reject) => {
        let data = ''

        stream.on('error', reject)
        stream.on('data', chunk => data += chunk.toString())
        stream.on('end', () => resolve(data))
    })
}

exports.readStream = readStream