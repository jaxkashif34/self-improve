type Prop<T> = {
  get: () => T;
  set: (v: T) => void;
};

function createProps<T>(val: T): Prop<T> {
  return {
    get: () => val,
    set: (v: T) => (val = v),
  };
}

type PropMap = {
  name: string;
  age: number;
};

type PropType<K extends keyof PropMap = keyof PropMap> = {
  [P in K]: Prop<PropMap[P]>;
}[K];

type Props = {
  [P in keyof PropMap]: PropType<P>;
};

const props: Props = {
  name: createProps('liz'),
  age: createProps(18),
};

type Key = keyof Props;

const a = props.name;
const b = a.get();

a.set(b);

function x<K extends keyof Props>(key: K) {
  const y = props[key];
  const z = y.get();

  y.set(z); // fix error here 
}

x("age")


