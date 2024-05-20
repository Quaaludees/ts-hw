
const user = {
    name: 'Vasa',
    age: 8,
    skills: ['ts', 'js']
}


function pickKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    return keys.reduce((acc, el) => {
        return {
            ...acc,
            [el]: obj[el]
        }
    }, {} as Pick<T, K>);

}

const test = pickKeys(user, ["age", 'skills']);

