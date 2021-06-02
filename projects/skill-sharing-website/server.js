const router = require('./router')
const ecstatic = require('ecstatic')
const { createServer } = require('http')

const defaultHeaders = { 'Content-Type': 'text/plain' }

class Server{
    constructor(talks){
        const fileSever = ecstatic({ root: './public' })

        this.talks = talks
        this.version = 0
        this.waiting = []

        this.server = createServer((request, response) => {
            const resolved = router.resolve(this, request)

            if(resolved){
                resolved.then(req => {
                    const { body, status = 200, headers = defaultHeaders } = req

                    response.writeHead(status, headers)
                    response.end(body)
                }).catch(error => {
                    if(error.status != null){
                        return error
                    }

                    return { body: String(error), status: 500 }
                })
            }
            else{
                fileSever(request, response)
            }
        })
    }

    start(port){
        this.server.listen(port, () => console.log('App is running'))
    }

    stop(){
        this.server.close()
    }

    talkResponse(){
        const talks = []

        for(let title of Object.keys(this.talks)){
            talks.push(this.talks[title])
        }

        return {
            body: JSON.stringify(talks),
            headers: {
                'Content-Type': 'application/json',
                'ETag': `"${this.version}"`,
                'Cache-Control': 'no-store'
            }
        }
    }

    waitForChanges(time){
        return new Promise(resolve => {
            this.waiting.push(resolve)

            setTimeout(() => {
                if(!this.waiting.includes(resolve)){
                    return
                }

                this.waiting = this.waiting.filter(r => r != resolve)

                resolve({ status: 304 })
            }, time * 1000)
        })
    }

    update(){
        this.version++

        const response = this.talkResponse()
        
        this.waiting.forEach(resolve => resolve(response))
        this.waiting = []
    }

    static initialize(){
        const server = new Server(Object.create(null))

        server.start(3300)
    }
}

Server.initialize()


