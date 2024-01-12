import { Cursor } from "./Cursor"

export interface TypingProps {
  typedCharacters: string
  className?: string
}

export function Typing ({ typedCharacters, className }: TypingProps) {
  const characters = typedCharacters.split('')

  return (
    <div className={`${className}`}>
      {
        characters.map((character, index) => {
          return <span key={`${character}_${index}`} className='text-primary'>{character}</span>
        })
      }

      <Cursor />
    </div>
  )
}