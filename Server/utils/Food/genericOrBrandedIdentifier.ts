export function isBranded(foodIdentifier:string): boolean {
    let regex = /\d/;
    return regex.test(foodIdentifier) || foodIdentifier.length >= 24
}