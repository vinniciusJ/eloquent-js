import Level from "./Level.js"
import State from "./State.js"
import Utils from "./Utils.js"

const keyBoardKeys = [ 'ArrowLeft', 'ArrowRight', 'ArrowUp' ]

class Controller{
    static ARROW_KEYS = Utils.trackKeys({ keys: keyBoardKeys })

    static runAnimation({ frameFunction }){
        let lastTime = null

        const frame = time => {
            if(lastTime !== null){
                let timeStep = Math.min(time - lastTime, 100) / 1000

                if(frameFunction(timeStep) === false){
                    return
                }
            }

            lastTime = time

            requestAnimationFrame(frame)
        }

        requestAnimationFrame(frame)
    }

    static runLevel({ level, Display }){
        const display = new Display({ parent: document.body, level })

        let state = State.start({ level }), ending = 1

        return new Promise(resolve => {
            const frameFunction = time => {
                state = state.update({ time, keys: Controller.ARROW_KEYS })

                display.syncState({ state })

                if(state.status === 'playing'){
                    return true
                }
                else if(ending > 0){
                    ending -= time
                    return true
                }
                else {
                    display.clear()

                    resolve(state.status)

                    return false
                }
            }

            Controller.runAnimation({ frameFunction })
        })
    }

    static async runGame({ plans, Display }){
        for(let level = 0; level < plans.length;){
            const plan = plans[level]

            let status = await Controller.runLevel({
                level: new Level({ plan }),
                Display
            })

            if(status === 'won'){
                console.log('hello')
                level++
            }
        }

        console.log(`You've won the game!`)
    }
}

export default Controller