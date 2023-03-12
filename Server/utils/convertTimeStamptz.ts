
//2023-03-12T17:47:47.856391+00:00
export const getDate = (date: string) => {
   const indexOfT =  date.indexOf("T")
    return date.slice(0, indexOfT); 
}


export const getTime = (date: string) => {
    const indexOfT =  date.indexOf("T");
    const indexOfDot=  date.indexOf(".");
    return date.slice(indexOfT+1, indexOfDot); 
 }