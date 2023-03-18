export function isBranded(foodIdentifier) {
    let regex = /\d/;
    return regex.test(foodIdentifier) || foodIdentifier.length >= 24
}