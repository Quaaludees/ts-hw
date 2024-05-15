"use strict";
const obj = {
    a: 1,
    b: 2,
};
const obj2 = {
    1: 'c',
    2: 'e',
};
function swap(obj) {
    return Object.fromEntries(Object.entries(obj).map((el) => el.reverse()));
}
console.log(swap(obj2));
console.log(swap(obj));
