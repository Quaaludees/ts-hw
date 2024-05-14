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
        if (!this.stateMap[hash]) {
            return undefined;
        }
        return this.stateMap[hash];
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
// console.log(test.get('огурец2'))
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
class HashMap {
    constructor(initialCapacity = 10) {
        this.buckets = new Array(initialCapacity);
        this.collisions = 0;
        this.capacity = initialCapacity;
    }
    set(key, value) {
        const bucketIndex = this.getIndex(key);
        if (this.buckets[bucketIndex]) {
            const findInd = this.buckets[bucketIndex].findIndex(el => el.key === key);
            if (findInd >= 0) {
                this.buckets[bucketIndex][findInd] = { key, value };
                console.log(findInd);
                return this;
            }
            this.buckets[bucketIndex].push({ key, value });
            if (this.buckets[bucketIndex].length > 1) {
                this.collisions++;
            }
        }
        else {
            this.buckets[bucketIndex] = [{ key, value }];
        }
        return this;
    }
    get(key) {
        const bucketIndex = this.getIndex(key);
        for (let arrayIndex = 0; arrayIndex < this.buckets[bucketIndex].length; arrayIndex++) {
            const entry = this.buckets[bucketIndex][arrayIndex];
            if (entry.key === key) {
                return entry.value;
            }
        }
    }
    delete(key) {
        const index = this.getIndex(key);
        const bucket = this.buckets[index];
        if (!bucket) {
            return;
        }
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                if (bucket.length > 1) {
                    this.collisions = this.collisions - 1;
                }
                bucket.splice(i, 1);
                return;
            }
        }
    }
    clearAll() {
        this.buckets = new Array(this.capacity);
        this.collisions = 0;
    }
    hash(key) {
        let hashValue = 0;
        const stringTypeKey = `${key}${typeof key}`;
        for (let index = 0; index < stringTypeKey.length; index++) {
            const charCode = stringTypeKey.charCodeAt(index);
            hashValue += charCode << (index * 8);
        }
        return hashValue;
    }
    getIndex(key) {
        const indexHash = this.hash(key);
        return indexHash % this.buckets.length;
    }
}
const hashMap = new HashMap();
hashMap.set('kotina', 81);
hashMap.set('psina', 1);
hashMap.set('strelka', 3);
hashMap.set('belka', 38);
hashMap.set('koshka', 28);
hashMap.set('sobaka', 18);
console.log(hashMap);
hashMap.delete('sobaka');
hashMap.delete('koshka');
console.log(hashMap);
