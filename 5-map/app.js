"use strict";
class HrenMap {
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
const hashMap = new HrenMap();
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
