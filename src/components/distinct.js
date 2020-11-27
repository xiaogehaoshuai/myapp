export function distinct(a, b) {
    let arr = a.concat(b)
    let result = []
    let obj = {}

    for (let i of arr) {
        if (!obj[i]) {
            result.push(i)
            obj[i] = 1
        }
    }
    return result
}
export function distinct1(a, b) {
    let arr = a.concat(b)
    return Array.from(new Set(arr))
}
