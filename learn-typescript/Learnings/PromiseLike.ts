// Note that PromiseLike is a type used to describe Promise-like objects and is not intended to be directly implemented. Instead, it helps TypeScript provide better type checking and inference for objects that resemble Promises but may have a different internal implementation.
// It's used to describe objects that are similar to Promises but may not fully adhere to the Promise specification. For example, objects that only implement the then() method, or objects that are not constructed via the Promise constructor.
// The PromiseLike interface is used by the global fetch() function, which returns a Promise-like object. The fetch() function is not a constructor, so it doesn't return a Promise object. However, it returns a Promise-like object, which has a then() method.
// The PromiseLike interface is also used by the global caches.match() function, which returns a Promise-like object. The caches.match() function is not a constructor, so it doesn't return a Promise object. However, it returns a Promise-like object, which has a then() method.
type MyPromiseLike<T> = {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: (value: T) => TResult1 | MyPromiseLike<TResult1>,
    onrejected?: (reason: any) => TResult2 | MyPromiseLike<TResult2>
  ): MyPromiseLike<TResult1 | TResult2>;
};

const delayed = (millisecond: number): MyPromiseLike<string> => {
  return new Promise((resolve, reject) => {
    setInterval(resolve, millisecond);
  });
};

const delayedTimeout: MyPromiseLike<number> = delayed(2000).then(() => {
  return 24;
});

delayedTimeout.then(
  (value) => {
    console.log(value);
  },
  () => {
    console.log('Timeout');
  }
);
