import { faker } from "@faker-js/faker"
import { useEffect, useState } from "react"

export const useWords = () => {
  const [words, setWords] = useState<string>('')

  useEffect(() => {
    setWords(faker.word.words(15))
  }, [])

  return {
    words
  }
}