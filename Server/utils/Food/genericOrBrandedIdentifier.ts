/**
 * Checks if the food identifier is a generic or branded identifier
 * @param foodIdentifier
 * @returns boolean
 */
export function isBranded (foodIdentifier: string): boolean {
  const regex = /\d/
  return regex.test(foodIdentifier) || foodIdentifier.length >= 24
}
