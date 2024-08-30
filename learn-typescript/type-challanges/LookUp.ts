(() => {
  interface Cat {
    type: 'cat';
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
  }

  interface Dog {
    type: 'dog';
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
    color: 'brown' | 'white' | 'black';
  }

  type Animal = Cat | Dog;

  type LookUp<T extends { type: string }, K extends T['type']> = T extends T ? (T['type'] extends K ? T : never) : never;

  type A = LookUp<Animal, 'dog'>; // expected to be `Dog`
  type B = LookUp<Animal, 'cat'>; // expected to be `Cat`

  //   Question: can you help me to find out the problem here LookUp return never and I don't understand why?
  //   Answer: the problem is that you are not distributing the type T in LookUp<T, K> you are treating it as a single unit so you need to distribute it
  //   Question: how do you know that I am not distributing the type T in LookUp<T, K>?
  //   Answer: because you are not using the generic type T in the extends condition
  // Question: In this case T is union of Cat and Dog and I'm not distributing it right?
  // Answer: yes, you are not distributing it, you are treating it as a single unit
  //   Question: what is a naked type parameter?
  //   Answer: a naked type parameter is a type parameter that is not wrapped in a tuple
})();
