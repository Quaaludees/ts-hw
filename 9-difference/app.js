"use strict";
let a = { a: 5, b: '' };
let b = { a: 10, c: true };
function pickKeys2(obj, keys) {
    return keys.reduce((acc, el) => {
        return {
            ...acc,
            [el]: obj[el]
        };
    }, {});
}
// function difference<T extends object, D extends object>(a: T, b: D): Exclude<T, D> {
//     const keysA = Object.keys(a) as Array<keyof T>;
//     const keysB = Object.keys(b) as Array<keyof T>;
//     const keysPick = keysA.filter((key: keyof T) => !keysB.includes(key));
//     return pickKeys2(a, keysPick) as Exclude<T, D>;
// }
function difference(a, b) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    const keysPick = keysA.filter((key) => !keysB.includes(key));
    return pickKeys2(a, keysPick);
}
console.log(difference(a, b));
const test2 = difference(a, b);
