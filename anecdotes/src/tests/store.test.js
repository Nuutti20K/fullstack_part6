import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useFilter, useAnecdoteActions } from '../store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it('vote increments votes', async () => {
    const anecdote = { id: 1, content: 'Test', votes: 0 }
    useAnecdoteStore.setState({ anecdotes: [anecdote] })
    anecdoteService.update.mockResolvedValue({ ...anecdote, votes: anecdote.votes + 1 })

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.vote(1)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current[0].votes).toEqual(1)
  })
})

describe('useAnecdotes sorting', () => {
  const anecdotes = [
    { id: 1, content: 'A', votes: 3 },
    { id: 2, content: 'B', votes: 1 },
    { id: 3, content: 'C', votes: 6 }
  ]

  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes })
  })

  it('returns anecdotes sorted by votes', () => {
    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toEqual(anecdotes.toSorted((a, b) => b.votes - a.votes))
  })
})

describe('useAnecdotes filterin', () => {
  const anecdotes = [
    { id: 1, content: 'A', votes: 3 },
    { id: 2, content: 'B', votes: 2 },
    { id: 3, content: 'C', votes: 1 }
  ]

  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes })
  })
  
  it('returns all anecdotes with no filter', () => {
    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toHaveLength(3)
  })

  it('returns all anecdotes with no filter', () => {
    useAnecdoteStore.setState({ anecdotes, filter: 'a' })
    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toHaveLength(1)
  })
})
//  it('add appends a new note', async () => {
//    const newNote = { id: 2, content: 'New note', important: false }
//    noteService.createNew.mockResolvedValue(newNote)
//
//    const { result } = renderHook(() => useNoteActions())
//
//    await act(async () => {
//      await result.current.add('New note')
//    })
//
//    const { result: notesResult } = renderHook(() => useNotes())
//    expect(notesResult.current).toContainEqual(newNote)
//  })
//
//  it('toggleImportance flips important flag', async () => {
//    const note = { id: 1, content: 'Test', important: false }
//    useNoteStore.setState({ notes: [note] })
//    noteService.update.mockResolvedValue({ ...note, important: true })
//
//    const { result } = renderHook(() => useNoteActions())
//
//    await act(async () => {
//      await result.current.toggleImportance(1)
//    })
//
//    const { result: notesResult } = renderHook(() => useNotes())
//    expect(notesResult.current[0].important).toBe(true)
//  })
