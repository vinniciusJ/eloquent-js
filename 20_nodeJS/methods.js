const mime = require('mime')

const { stat, readdir, rmdir, unlink } = require('fs/promises')
const { getURLPath } = require('./path')
const { createReadStream, createWriteStream } = require('node:fs')

const methods = Object.create(null)

methods.GET = async request => {
    const path = getURLPath(request.url)
    let stats

    try{
        stats = await stat(path)
    }
    catch(error){
        if(error.code != 'ENOENT'){
            throw error
        }
        else{
            return { status: 404, body: 'File not found' }
        }
    }

    if(stats.isDirectory()){
        return { body: (await readdir(path)).join('\n') }
    }
    else{
        return { body: createReadStream(path), type: mime.getType(path) }
    }
}

methods.DELETE = async request => {
    const path = getURLPath(request.url)
    let stats

    try{
        stats = await stat(path)
    }
    catch(error){
        if(error.code != 'ENOENT'){
            throw error
        }
        else{
            return { status: 204 }
        }
    }

    if(stats.isDirectory()){
        await rmdir(path)
    }
    else {
        await unlink(path)
    }

    return { status: 204 }
}

const pipeStream = (from, to) => {
    return new Promise((resolve, reject) => {
        from.on('error', reject)
        to.on('error', reject)
        to.on('finish', resolve)
        from.pipe(to)
    })
}

methods.PUT = async request => {
    const path = getURLPath(request.url)

    await pipeStream(request, createWriteStream(path))

    return { status: 204 }
}

exports.methods = methods