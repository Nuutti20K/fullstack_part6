import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import { useAnecdotes } from './hooks/useAnecdotes'
import useNotify from './hooks/useNotify'

const App = () => {
  const { anecdotes, isPending, isError, vote } = useAnecdotes()
  const { setMessage } = useNotify()

  const handleVote = (anecdote) => {
    vote(anecdote)
    setMessage(`anecdote '${anecdote.content}' voted`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
 
  if (isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App