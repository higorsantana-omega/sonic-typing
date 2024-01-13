import { Character } from "./Character"
import { Cursor } from "./Cursor"

export interface TypingProps {
  typedCharacters: string
  words: string
  className?: string
}

export function Typing ({ typedCharacters, words, className }: TypingProps) {
  const characters = typedCharacters.split('')

  return (
    <div className={`${className}`}>
      {
        characters.map((character, index) => {
          return (
            <Character
              key={`${character}_${index}`}
              character={character} 
              expected={words[index]!}
            />
          )
        })
      }

      <Cursor />
    </div>
  )
}