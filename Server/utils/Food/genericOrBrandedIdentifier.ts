export function isBranded (foodIdentifier: string): boolean {
  const regex = /\d/
  return regex.test(foodIdentifier) || foodIdentifier.length >= 24
}
