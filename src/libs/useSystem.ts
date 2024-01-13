import { use, useCallback, useEffect, useState } from "react"
import { useTyping } from "./useTyping"
import { useWords } from "./useWords"
import { countErrors } from "~/utils/wordsResult"

export type Action = 'finish' | 'start' | 'run'

export const useSystem = () => {
  const [action, setAction] = useState<Action>('start')
  const [errors, setErrors] = useState<number>(0)
  const { words } = useWords()
  const {
    clearTyped, 
    resetTotal,
    cursor,
    typed,
    totalTyped
  } = useTyping(action !== 'finish')

  const starting = action === 'start' && cursor > 0
  const finished = cursor === words.length

  // const totalErrors = useCallback(() => {
  //   setErrors((prev) => prev + countErrors(typed, words.substring(0, cursor)))
  // }, [cursor, typed, words])

  // useEffect(() => {
  //   if (starting) {
  //     setAction('run')
  //   }
  // }, [starting])

  // useEffect(() => {
  //   if (finished) {
  //     setAction('finish')
  //     totalErrors()
  //     clearTyped()
  //   }
  // }, [clearTyped, finished, totalErrors])

  return {
    typed,
    words,
    errors,
    totalTyped,
    action
  }
}