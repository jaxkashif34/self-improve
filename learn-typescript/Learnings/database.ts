interface Database<T, K> {
  get(id: K): T;
  set(id: K, value: T): void;
}

interface PersistAble {
  saveToString(): string;
  reStoreFromString(valueToStore: string): void;
}

class InMemoryDatabase<T, K extends PropertyKey> implements Database<T, K> {
  db: Record<K, T> = {} as Record<K, T>;
  // we are using the type assertion here because
  // The error message is saying that the type of the object being assigned to this.db is {}, which is not compatible with Record<K, T>. This is likely because the object being assigned is missing the required keys and values of type T. 
  get(id: K): T {
    return this.db[id];
  }
  set(id: K, value: T): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDB<T, K extends PropertyKey> extends InMemoryDatabase<T, K> implements PersistAble {
  saveToString(): string {
    return JSON.stringify(this.db);
  }

  reStoreFromString(valueToStore: string): void {
    this.db = JSON.parse(valueToStore);
  }
}

const myDB = new PersistentMemoryDB<number, string>();

myDB.set('foo', 42);
console.log(myDB.get('foo'));
const saved = myDB.saveToString(); // saving and getting the saved value
// myDB.reStoreFromString(saved); // converting string format into object format

const myDB2 = new PersistentMemoryDB<number, string>();

myDB2.reStoreFromString(saved);
console.log(myDB2.get('foo'));

export {}