export function keyboardAllowed (code: string) {
  const startsWith = ['Digit', 'Key']
  const isEqual = ['Backspace', 'Space']
  return startsWith.some(key => code.startsWith(key)) || isEqual.some(key => code === key)
}