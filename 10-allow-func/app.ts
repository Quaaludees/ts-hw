class User {

    @allowFunc((a: number) => a > 0)
    age: number = 40;
}

function allowFunc(fn: (a: number) => boolean) {
    return function(target: Object, propertyKey: string | symbol) {
        let value: number;
        const set = function(newValue: number) {
            if (fn(newValue) && Number.isInteger(newValue)) {
                value = newValue;
            } else {
                console.log(`Uhodi`)
            }
        }
        const get = function() {
            return value;
        }
        Object.defineProperty(target, propertyKey, {
            set: set,
            get: get
        })
    }
}

const user = new User();
user.age = 50;
console.log(user.age);
user.age = 50;
console.log(user.age);