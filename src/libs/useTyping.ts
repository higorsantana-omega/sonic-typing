import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from "react"
import { keyboardAllowed } from "~/utils/keyboardAllowed"

export const useTyping = (enabled: boolean) => {
  const [typed, setTyped] = useState<string>('')
  const [cursor, setCursor] = useState<number>(0)

  const totalTyped = useRef(0)

  const clearTyped = useCallback(() => {
    setTyped('')
    setCursor(0)
  }, [])

  const resetTotal = useCallback(() => {
    totalTyped.current = 0
  }, [])
 
  const keydownHandler = useCallback(({ code, key }: KeyboardEvent) => {
    if (!enabled || !keyboardAllowed(code)) {
      return
    }

    if (key === 'Backspace') {
      setTyped(prev => prev.slice(0, -1))
      setCursor(-1)
      totalTyped.current -= 1
    } else {
      setTyped(prev => prev.concat(key))
      setCursor(cursor + 1)
      totalTyped.current += 1
    }
  }, [cursor, enabled])

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler as unknown as EventListener)

    return () => {
      window.removeEventListener('keydown', keydownHandler as unknown as EventListener)
    }
  }, [keydownHandler])

  return {
    cursor,
    typed,
    totalTyped: totalTyped.current,

    clearTyped,
    resetTotal
  }
}