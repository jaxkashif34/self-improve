// Hash Table
// A hash table, also known as hash map, is a data structure that is used to store
// key-value pairs
// Given a key, you can associate a value with that key for very fast lookup
// JavaScript's Object is a special implementation of the hash table data structure.
// However, Object class adds its own keys. Keys that you input may conflict and
// overwrite the inherited default properties
// Maps which were introduced in 2015 allow you to store key-value pairs
// Writing your own hash table implementation is a very popular JavaScript interview
// question
// Application
// Hash Table are typically implemented where constant time lookup and insertion are required
// 1) Database indexing
// 2) Caches

class HashTable {
  size: number;
  table: (string | undefined)[];
  constructor(size: number) {
    this.table = new Array(size);
    this.size = size;
  }

  private hash(key: string) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % this.size; // we are dividing total by size because we want to return the index lesser than size
    // actually the modulus is whatever is left behind after division
    // and the remainder of a division operation can't be greater than the divisor.
  }

  set(key: string, value: string) {
    // key is string for this case
    const index = this.hash(key);
    this.table[index] = value;
  }

  get(key: string) {
    const index = this.hash(key);
    return this.table[index];
  }

  remove(key: string) {
    const index = this.hash(key);
    this.table[index] = undefined;
  }

  display() {
    this.table.forEach((item, index) => {
      if (this.table[index]) {
        console.log(`${index} : ${this.table[index]}`);
      }
    });
  }
}

const hash = new HashTable(3);

export {};
