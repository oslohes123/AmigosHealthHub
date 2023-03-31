export default function isBranded(foodIdentifier) {
  const regex = /\d/;
  return regex.test(foodIdentifier) || foodIdentifier.length >= 24;
}
