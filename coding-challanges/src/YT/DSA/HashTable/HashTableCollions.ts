class HashTableCollions {
  size: number;
  table: [string, string][][]; // [[["name", "Alex"]]] or [[["age", "25"], ["name", "Alex"]]]
  constructor(size: number) {
    this.table = new Array(size);
    this.size = size;
  }

  hash(key: string) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % this.size;
  }

  set(key: string, value: string) {
    // take string for our use
    const index = this.hash(key);
    // this.table[index] = value;
    let bucket = this.table[index]; // we are getting the data stored at that index

    if (!bucket) {
      this.table[index] = [[key, value]];
    } else {
      const sameKeyItem = bucket.find((item) => item[0] === key);
      if (sameKeyItem)
        sameKeyItem[1] =
          value; // if key found in the bucket update the value of that key in the bucket else add new item into the bucket
      // how bucket looks like [   [   ["name" "Alex"] item   ] bucket     ]  main array
      // there can be multiple items in same bucket only if they have same index
      else bucket.push([key, value]);
    }
  }

  get(key: string) {
    const index = this.hash(key);
    // return this.table[index];
    const bucket = this.table[index];

    if (bucket) {
      const sameKeyItem = bucket.find((item) => item[0] === key);
      if (sameKeyItem) return sameKeyItem[1];
    }
    return undefined;
  }

  remove(key: string) {
    const index = this.hash(key);
    // this.table[index] = undefined;

    const bucket = this.table[index];
    if (bucket) {
      const sameKeyItem = bucket.find((item) => item[0] === key);
      if (sameKeyItem) {
        bucket.splice(bucket.indexOf(sameKeyItem), 1);
        // sameKeyItem = undefined;
      }
    }
  }

  display() {
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i]) {
        console.log(i, this.table[i]);
      }
    }
  }
}

let hash = new HashTableCollions(20);

hash.set('name', 'Bruce');
hash.set('age', '25');
hash.display();
console.log(hash.get('name'));
hash.set('mane', 'Clark');
hash.display();
hash.set('name', 'Diane');
hash.remove('name');
hash.display();
