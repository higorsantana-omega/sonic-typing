import { useState } from "react"
import { useTyping } from "./useTyping"
import { useWords } from "./useWords"

export type Action = 'finish' | 'start' | 'run'

export const useSystem = () => {
  const [action, setAction] = useState<Action>('start')
  const { words } = useWords()
  const {
    clearTyped, 
    resetTotal,
    cursor,
    typed,
    totalTyped
  } = useTyping(action !== 'finish')

  return {
    typed,
    words
  }
}