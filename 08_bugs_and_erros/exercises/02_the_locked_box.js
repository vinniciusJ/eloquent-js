const box = {
    locked: true,
    _content: [],

    unlock(){ this.locked = false },
    lock(){ this.locked = true },

    get content(){
        if(this.locked) throw new Error('Locked')

        return this._content
    }
}

const withBoxUnlocked = fn => {
    let isLocked = box.locked

    if(!isLocked) return fn()

    box.unlock()

    try{
        return fn()
    }
    finally{
        box.lock()
    }
}

withBoxUnlocked(() => box.content.push('Gold piece'))

try{
    withBoxUnlocked(() => { throw new Error('Pirates on the horizon! Abort!') })
}
catch(error){
    console.log(`Error raised ${error}`)
}

console.log(box.locked)