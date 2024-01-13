import { cn } from "~/utils/cn"

export interface CharacterProps {
  character: string
  expected: string
}

export function Character ({ character, expected }: CharacterProps) {
  const correct = character === expected
  const whiteSpace = expected === ' '

  return (
    <span
      className={cn({
        'text-white': correct && !whiteSpace,
        'text-error': !correct && !whiteSpace,
        'bg-error/50': !correct && whiteSpace
      })}
    >
      {expected}
    </span>
  )
}