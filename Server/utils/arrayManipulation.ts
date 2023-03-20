export function removeDuplicates(arr: Array<any>) {
    return [...new Set(arr)];
}


export function countElementsInArray(arr: Array<any>){
    return  arr.reduce((acc: any, curr: any) => (acc[curr] = (acc[curr] || 0) + 1, acc), {});    
}
