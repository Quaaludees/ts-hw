

interface IA {
    a: number;
    b: string;
}

interface IB {
    a: number;
    c: boolean;
}

let a:IA = { a:5, b: ''};
let b:IB = { a:10, c: true};
const v = {
    a: 11, b: 2, c: 5, d: 4
}

function pickKeys2<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    return keys.reduce((acc, el) => {
        return {
            ...acc,
            [el]: obj[el]
        }
    }, {} as Pick<T, K>);

}


// function difference<T extends object, D extends object>(a: T, b: D): Exclude<T, D> {
//     const keysA = Object.keys(a) as Array<keyof T>;
//     const keysB = Object.keys(b) as Array<keyof T>;
//     const keysPick = keysA.filter((key: keyof T) => !keysB.includes(key));
//     return pickKeys2(a, keysPick) as Exclude<T, D>;
// }

function difference<T extends object, D extends object>(a: T, b: D): Pick<T, Exclude<keyof T, keyof D>> {
    const keysA = Object.keys(a) as Array<keyof T>;
    const keysB = Object.keys(b) as Array<keyof D>;
    const keysPick = keysA.filter((key: keyof T) => !keysB.includes(key as unknown as keyof D));
    return pickKeys2(a, keysPick) as Pick<T, Exclude<keyof T, keyof D>>;
}


console.log(difference(a,b))
const test2  = difference(v, b);

