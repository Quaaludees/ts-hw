import sortBy from "sort-by";

type Users = {
    id: number,
    name: string,
    age: string,
    email: {
        pole: {
            test: string
        }
        primary: string
    }
};

let users = [{
    id: 7,
    name: 'Foo',
   age: '34',
    email: {
        primary: {
            pole: 'foo@email.com'
        },
        primary2: 'foo@email.com'
    },
    email2: { primary: 'bar@email.com' }
}, {
    id: 3,
    name: 'Baz',
    age: '67',
    email: {
        primary: {
            pole: 'foo@email.com'
        },
        primary2: 'foo@email.com'
    },
    email2: { primary: 'bar@email.com' }
}, {
    id: 4,
    name: 'Bar',
    age: '67',
    email: {
        primary: {
            pole: 'foo@email.com'
        },
        primary2: 'foo@email.com'
    },
    email2: { primary: 'bar@email.com' }
}];

console.log(users.sort(sortBy( 'age')));


