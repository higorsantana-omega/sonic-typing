export interface WordsProps {
  words: string
}

export function Words ({ words }: WordsProps) {
  return (
    <div className='text-slate-400'>
      {words}
    </div>
  )
}