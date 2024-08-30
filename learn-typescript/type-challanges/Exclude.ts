type MyExclude<T, U extends T> = T extends U ? never : T;
type MyExclude2<T, U> = U extends T ? never : T;
// Question:can you tell me the difference between these?

// @ts-expect-error
type NewType2 = MyExclude<'a' | 'b' | 'c', 's'>;
