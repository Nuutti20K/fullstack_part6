import { useAnecdotes, useFilter, useAnecdoteActions } from "../store"
import { useNotificationActions } from "../store"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()
  const { vote, remove } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  const sortedAnecdotes = filteredAnecdotes.toSorted((a, b) => b.votes - a.votes)

  const handleVote = (anecdote) => {
    vote(anecdote.id)
    setNotification(`you voted '${anecdote.content}'`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleRemove = (anecdote) => {
    remove(anecdote.id)
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
          {anecdote.votes === 0 && (
            <div>
              <button onClick={() => handleRemove(anecdote)}>delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList