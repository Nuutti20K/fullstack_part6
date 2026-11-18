import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useAnecdotes } from '../hooks/useAnecdotes'
import useNotify from '../hooks/useNotify'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const { setMessage } = useNotify()

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    try {
      await addAnecdote(content)
      setMessage(`created '${content}'`)
    } catch (error) {
      setMessage('too short anecdote, must have length 5 or more')
      console.log(`Error: ${error.message}`)
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm