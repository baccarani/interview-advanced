import { createContext, useContext, useState } from 'react'

type Note = {
  questions: string[]
  answers: string[]
}

type NoteProviderState = {
  note: Note
  setNote: (note: Note) => void
}

type NoteProviderProps = {
  children: React.ReactNode
}

const initialState: NoteProviderState = {
  note: { questions: [], answers: [] },
  setNote: () => ({ questions: [], answers: [] }),
}

const NoteContextProvider = createContext<NoteProviderState>(initialState)

const NoteProvider = ({ children, ...props }: NoteProviderProps) => {
  const [note, _setNote] = useState<Note>({ questions: [], answers: [] })

  const setNote = (note: Note): void => {
    _setNote(note)
  }

  return (
    <NoteContextProvider.Provider {...props} value={{ note, setNote }}>
      {children}
    </NoteContextProvider.Provider>
  )
}

export const useNote = () => {
  return useContext(NoteContextProvider)
}

export default NoteProvider