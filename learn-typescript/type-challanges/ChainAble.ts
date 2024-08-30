type Chainable<T = {}> = {
  option: <K extends string, V extends any>(key: K extends keyof T ? (V extends T[K] ? never : K) : K, value: V) => Chainable<Omit<T, K> & Record<K, V>>;
  get: () => T;
};
// Question: can you explain me why we are using & operator here ?
// Answer: because we need to merge the current key with the new key and value
declare const a23: Chainable<{}>;
const result23 = a23.option('foo', 123).option('name', 'type-challenges').option('bar', { value: 'Hello World' }).get();
// by using Omit we exclude the current key from the T type, then we can't use the current key in the next call of the option method, so we need to use Record to add the current key to the new type
// omit is because we need to exclude the current key from the T type and Record is because we need to add the current key to the new type
// like if
// .option("foo", "bar")
// and then we use again foo key and value is different from the previous value then omit will exclude the current key and overrides it with new value
// .option("foo", 123)
// and Record is to add the current key to the new value
