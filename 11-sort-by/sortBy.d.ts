//
// declare module 'sort-by' {
//    export default function sortBy<T>(
//        ...args: Array<T[keyof T] extends any ?`${keyof T}.${keyof T[keyof T]}`: keyof T | `-${keyof T}`>
//    ): (a: T, b: T) => number;
// }

type PathType<T> = T extends object
    ? {
        [K in keyof T]: `${Exclude<K, symbol>}${PathType<T[K]> extends never ? '' : `.${PathType<T[K]>}`}`
    }[keyof T]
    : never;

declare module 'sort-by' {
    export default function sortBy<T>(
        ...args: Array<PathType<T>|`-${keyof T}` | `-${PathType<T>}`>): (a: T, b: T) => number;
}
