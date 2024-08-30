// pluck mean = pick, extract, take
const pluck = <T, K extends keyof T>(items: T[], key: K): T[K][] => { // here T[K][] not means return 2D array it means return the array of values of provided key
  return items.map((item) => item[key]);
};

const dogs: { name: string; age: number }[] = [
  { name: 'Mimi', age: 12 },
  { name: 'Lulu', age: 13 },
];

pluck(dogs, 'age');
pluck(dogs, 'name');

interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addToCart: BaseEvent & { quantity: number; productID: string };
  checkout: BaseEvent;
}

const sendEvent = <Name extends keyof EventMap>(name: Name, data: EventMap[Name]): void => {
  console.log([name, data]);
};

sendEvent('addToCart', { productID: 'foo', user: 'bar', quantity: 1, time: 10 });
sendEvent('checkout', { time: 20, user: 'foo' });
