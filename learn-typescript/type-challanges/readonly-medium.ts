(() => {
  type MyReadonly2<T, K extends keyof T = keyof T> = {
    // Question: what extends keyword does here?
    // Answer: It is used to constraint the type of K to be a key of T
    // Question: what do you mean by constraint?
    // Answer: It means that K can only be a key of T
    // Question why we are using = keyof T?
    // Answer: It is used to set the default value of K to be a key of T
    // Question: why we need to use as keyword?
    // Answer: It is used to filter out the keys of T that are not in K
    // Question: If we provide K values i.e. title | invalid then K value is title | invalid and if we don't provide K value then what will be the value of K ?
    // Answer: If we don't provide K value then K value will be all the keys of T
    // Question: how it will all the values of T?
    // Answer: It will all the values of T because we are using = keyof T
    [p in keyof T as p extends K ? never : p]: T[p];
  } & {
    readonly [p in K]: T[p];
  };
  // @ts-expect-error
  type Error = MyReadonly2<Todo1, 'title' | 'invalid'>; // will not show error because we are ignoring it on top at line 15

  interface Todo1 {
    title: string;
    description?: string;
    completed: boolean;
  }

  interface Todo2 {
    readonly title: string;
    description?: string;
    completed: boolean;
  }

  interface Expected {
    readonly title: string;
    readonly description?: string;
    completed: boolean;
  }

  (() => {
    // Quiz: Implement a generic `MyReadonly<T, K>` which takes two type argument `T` and `K`.
    // `K` specify the set of properties of `T` that should set to Readonly. When `K` is not provided, it should make all properties readonly just like the normal `Readonly<T>`.

    type MyReadonly<T, K extends keyof T> = {
      [p in keyof T as p extends K ? never : p]: T[p];
    } & {
      readonly [p in K]: T[p];
    };

    type GeneratedType = MyReadonly<Todo, 'title' | 'completed'>;

    type Todo = {
      title: string;
      description: string;
      completed: boolean;
    };
  })();
})();
