const { parse } = require('url')
const { resolve, sep } = require('path')

const baseDirectory = process.cwd()

const getURLPath = url => {
    const { pathname } = parse(url)
    const path = resolve(decodeURIComponent(pathname).slice(1))

    if(path != baseDirectory && !path.startsWith(`${baseDirectory}${sep}`)){
        throw { status: 403, body: 'Forbidden' }
    }

    return path
}

exports.getURLPath = getURLPath