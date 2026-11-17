import { useAnecdoteActions } from "../store"
import { useNotificationActions } from "../store"

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const addAnecdote = (e) => {    
    e.preventDefault()    
    const content = e.target.anecdote.value    
    add(content)
    e.target.reset()
    setNotification(`You added '${content}'`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" data-testid="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm