const obj: Record<string, number> = {
    a: 1,
    b: 2,
}
const obj2: Record<number, string> = {
    1: 'c',
    2: 'e',
}

type TypesKey = string | number | symbol;

function swap<T extends TypesKey, D extends TypesKey> (obj:Record<T, D>): Record<D, T> {
    return Object.fromEntries(Object.entries(obj).map((el) =>
        el.reverse()
    ));
}

console.log(swap(obj2));
console.log(swap(obj));