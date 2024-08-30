type MyCapitalize<S extends string> = S extends `${infer FirstLetter}${infer Rest}` ? 
`${Uppercase<FirstLetter>}${Rest}` : S;

type A45 = MyCapitalize<'hello world'>; // expected to be 'Hello world'
