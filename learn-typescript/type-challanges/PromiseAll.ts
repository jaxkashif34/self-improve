declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
  // Question: how many arguments does this function take ?
  // Answer: this function takes one argument
  // Question: what is the type of the argument ?
  // Answer: the type of the argument is a tuple
  // Question: what we are trying to do at this part tell me clearly readonly [...T]?
  // Answer: we are trying to tell that the tuple is readonly and the elements of the tuple are of type T
  // Question: can you explain me more about elements of the tuple are of type T?
  // Answer: the elements of the tuple are of type T means that the elements of the tuple can be of any type
  // Question: if the elements of tuple is of any type then we only need to extends from any but here we are extending it from any[]?
  // Answer: we are extending it from any[] because we want to tell that the elements of the tuple are of any type but the tuple itself is of type array
): Promise<{
  [key in keyof T]: Awaited<T[key]>; // Awaited<T> is a utility type that returns the type that is wrapped in a promise
  // Question: does not we get the union of Tuple like T[number] and here we are doing it like [key in keyof T]?
  // Answer: yes we get the union of Tuple like T[number] and here we are doing it like [key in keyof T] because we want to preserve the order of the tuple
  // Question: what will be the value of [key in keyof T] ?
  // Answer: the value of [key in keyof T] will be the index of the tuple
  // Question: i almost got it one last thing can you tell me why we are using {} instead i thought we should use [] inside Promise ?
  // Answer: we are using {} instead of [] because we want to return an object and not an array
  // Question: but we are getting array inside Promise<[1,2,3]>?
  // Answer: yes we are getting array inside Promise<[1,2,3]> but we are not returning an array we are returning an object
}>;

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);

type PromiseAllType = typeof promiseAllTest1;
