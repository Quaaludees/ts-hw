"use strict";
const user = {
    name: 'Vasa',
    age: 8,
    skills: ['ts', 'js']
};
function pickKeys(obj, keys) {
    return keys.reduce((acc, el) => {
        return {
            ...acc,
            [el]: obj[el]
        };
    }, {});
}
const test = pickKeys(user, ["age", 'skills']);
