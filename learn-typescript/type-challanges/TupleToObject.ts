type TupleToObject<T extends readonly (string | number | symbol)[]> = {
    [p in T[number]]: p
  }

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type Result = TupleToObject<typeof tuple>;
// Question: what value will pass to the Generic TupleToObject parameter when we pass typeof tuple?






