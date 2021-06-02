var { parse } = require("url")
const { readStream } = require("./utils")

class Router {
    constructor(){
        this.routes = []
    }

    add(method, url, handler){
        this.routes.push({ method, url, handler })
    }
    resolve(context, request){
        const path = parse(request.url).pathname

        for(let { method, url, handler } of this.routes){
            const match = url.exec(path)

            if(!match || request.method != method){
                continue
            }

            const URLParts = match.slice(1).map(decodeURIComponent)

            return handler(context, ...URLParts, request)
        }

        return null
    }
}
const router = new Router()

const pathExp = /^\/talks\/([^\/]+)$/

router.add('GET', pathExp, async (server, title) => {
    if(title in server.talks){
        return {
            body: JSON.stringify(server.talks[title]),
            headers: { 'Content-Type': 'application/json' }
        }
    }
    else {
        return { status: 404, body: `No talk '${title}' found` }
    }
})

router.add('DELETE', pathExp, async (server, title) => {
    if(title in server.talks){
        Reflect.deleteProperty(server.talks, title)

        server.update()
    }

    return { status: 204 }
})

router.add('PUT', pathExp, async (server, title, request) => {
    const requestBody = await readStream(request)
    let talk

    try{
        talk = JSON.parse(requestBody)
    }
    catch{
        return { status: 400, body: 'Invalid JSON' }
    }

    const verify = !talk || typeof talk.presenter != 'string' || typeof talk.summary != 'string'

    if(verify){
        return { status: 400, body: 'Bad talk data' }
    }

    server.talks[title] = { 
        title,
        presenter: talk.presenter,
        summary: talk.summary,
        comments: []
    }

    server.update()

    return { status: 204 }
})

const postPathExp =  /^\/talks\/([^\/]+)\/comments$/

router.add('POST', postPathExp, async (server, title, request) => {
    const requestBody = await readStream(request)
    let comment

    try{
        comment = JSON.parse(requestBody)
    }
    catch{
        return { status: 400, body: 'Invalid JSON' }
    }

    const verify = !comment || typeof comment.author != 'string' || typeof comment.message != 'string'

    if(verify){
        return { status: 400, body: 'Bad comment data' }
    }
    else if(title in server.talks){
        server.talks[title].comments.push(comment)
        server.update()

        return { status: 204 }
    }
    else{
        return { status: 404, body: `No talk '${title}' found` }
    }
})

const getPathExp = /^\/talks$/

router.add('GET', getPathExp, async (server, request) => {
    const tag = /"(.*)"/.exec(request.headers['if-none-match'])
    const wait = /\bwait=(\d+)/.exec(request.headers['prefer'])

    if(!tag || tag[1] != server.version){
        return server.talkResponse() 
    }
    else if(!wait){
        return { status: 304 }
    }
    else{
        return server.waitForChanges(Number(wait[1]))
    }
})

module.exports = router 