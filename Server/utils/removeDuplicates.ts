export default function removeDuplicates(arr: Array<any>) {
    return [...new Set(arr)];
}