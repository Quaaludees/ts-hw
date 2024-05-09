"use strict";
class HrenMap {
    constructor(initialDate) {
        this.stateMap = {};
        initialDate.forEach(([key, value]) => {
            this.set(key, value);
        });
    }
    set(key, value) {
        const hash = this.getHash(key);
        this.stateMap[hash] = value;
    }
    get(key) {
        const hash = this.getHash(key);
        return this.stateMap?.[hash];
    }
    has(key) {
        const hash = this.getHash(key);
        if (this.stateMap[hash]) {
            return true;
        }
        return false;
    }
    delete(key) {
        const hash = this.getHash(key);
        if (this.stateMap[hash]) {
            delete this.stateMap[hash];
            return true;
        }
        return false;
    }
    clear() {
        this.stateMap = {};
    }
    getHash(key) {
        let hash = 0;
        const keyToString = JSON.stringify(key);
        for (let i = 0; i < keyToString.length; i++) {
            const chr = keyToString.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash.toString();
    }
}
// const test = new HrenMap([
//     ["огурец", 500],
//     ["помидор", 350],
//     ["лук", 50]
// ])
// console.log(test)
// console.log(test.has('огурец'))
// console.log(test.get('огурец'))
// console.log(test.get('помидор'))
// test.set('помидор', 500);
// console.log(test.get('помидор'))
// test.set('помидор222', 500);
// console.log(test.get('помидор222'))
// console.log(test.delete('помидор222'))
// const test2 = {
//     vasa: 'luk'
// }
//
// test.set(test2, test2);
// console.log(test.get(test2));
