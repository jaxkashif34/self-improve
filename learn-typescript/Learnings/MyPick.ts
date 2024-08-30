// implement your own custom Utility Type Pick functionality
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key];
};

// we are doing [key in K] here cuz we want to pick only the keys that are in K and provided as a second generic argument

interface Info {
  name: string;
  age: number;
  email?: string;
}

type NewType = MyPick<Info, 'age' | 'name' | 'email'>;
