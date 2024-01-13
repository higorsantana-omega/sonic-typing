export function countErrors (character: string, expected: string) {
  return expected.split('').reduce((errors, char, index) => {
    const current = character[index]

    if (current !== char) {
      errors++
    }

    return errors
  }, 0)
}

export function calculateAccurancy (errors: number, total: number) {
  if (total <= 0) return 0

  const corrects = total - errors
  return (corrects / total) * 100
}