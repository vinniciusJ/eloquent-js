import App from "./src/App.js"

const fetchData = (URL, options) => {
    return fetch(URL, options).then(response => {
        if(response.status < 400){
            return response
        }
        else{
            throw new Error(response.statusText)
        }
    })
}

const encodeTalkURL = title => `talks/${encodeURIComponent(title)}`

const reportError = error => alert(String(error))

const handleAction = (state, action) => {
    const actions = {
        setUser(){
            localStorage.setItem('userName', action.user)

            return Object.assign({}, state, { user: action.user })
        },
        setTalks(){
            return Object.assign({}, state, { talks: action.talks })
        },
        newTalk(){
            fetchData(encodeTalkURL(action.title), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    presenter: state.user,
                    summary: action.summary
                })
            }).catch(reportError)
        },
        deleteTalk(){
            fetchData(encodeTalkURL(action.talk), {
                method: 'DELETE'
            }).catch(reportError)
        },
        newComment(){
            fetchData(`${encodeTalkURL(action.talk)}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author: state.user,
                    message: action.message
                })
            }).catch(reportError)
        }
    }

    const result = actions[action.type]()

    if(!!result){
        return result
    }

    return state
}

const pollTalks = async update => {
    let tag = undefined

    while(true){
        let response

        try{
            response = await fetchData('/talks', {
                headers: tag && {
                    'If-None-Match': tag,
                    'Prefer': 'wait=90'
                }
            })
        }
        catch(error){
            console.log(`Request failed: ${error}`)

            await new Promise(resolve => setTimeout(resolve, 500))

            continue
        }

        if(response.status == 304){
            continue
        }

        tag = response.headers.get('ETag')

        update(await response.json())
    }
}

const runApp = () => {
    const user = localStorage.getItem('userName') || 'Vinicius'
    let state, app

    const dispatch = action => {
        state = handleAction(state, action)

        app.syncState(state)
    }

    pollTalks(talks => {
        if(!app){
            state = { user, talks }
            app = new App(state, dispatch)

            document.body.appendChild(app.dom)
        }
        else{
            dispatch({ type: 'setTalks', talks })
        }
    }).catch(reportError)
}

runApp()