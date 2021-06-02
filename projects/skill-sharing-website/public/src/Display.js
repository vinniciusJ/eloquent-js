import { createElement } from "./utils.js"

class Display{
    renderUserField(name, dispatch){
        return createElement('label', {}, 'Your name: ', createElement('input', {
            type: 'text',
            value: name,
            onchange(event){
                dispatch({ type: 'setUser', user: event.target.value })
            }
        }))
    }

    renderComment(comment){
        const author = createElement('strong', null, comment.author)

        return createElement('p', { className: 'comment' }, author, ': ', comment.message)
    }

    renderTalk(talk, dispatch){
        const deleteButton = createElement('button', {
            type: 'button',
            onclick(){
                dispatch({ type: 'deleteTalk', talk: talk.title })
            }
        }, 'Delete')

        const title = createElement('h2', null, talk.title, " ", deleteButton)

        const presenter = createElement('strong', null, talk.presenter)
        const summary = createElement('p', null, talk.summary)
        const comments = talk.comments.map(this.renderComment)

        const commentInput = createElement('input', { type: 'text', name: 'comment' }, " ")
        const addCommentButton = createElement('button', { type: 'submit' }, 'Add comment')

        const handleSubmit = event => {
            event.preventDefault()

            dispatch({ type: 'newComment', talk: talk.title, message: commentInput.value })

            event.target.reset()
        }

        const form = createElement('form', { onsubmit: handleSubmit }, commentInput, addCommentButton)

        const container = createElement('div', null, 'by ', presenter, summary, ...comments, form)

        return createElement('section', { className: 'talk' }, title, container)
    }

    renderTalkForm(dispatch){
        const title = createElement('input', { type: 'text' })
        const summary = createElement('input', { type: 'text' })

        const handleSubmit = event => {
            event.preventDefault()

            dispatch({ type: 'newTalk', title: title.value, summary: summary.value })

            event.target.reset()
        }

        return createElement(
            'form', { onsubmit: handleSubmit },
            createElement('h3', null, 'Submit a Talk'),
            createElement('label', null, 'Title: ', title),
            createElement('label', null, 'Summary: ', summary),
            createElement('button', { type: 'submit' }, 'Submit')
        )
    }
}

export default Display