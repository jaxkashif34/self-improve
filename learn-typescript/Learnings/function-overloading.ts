export {};
function f1(): { a: number; b: string };
function f1(): { a: boolean; b: string };
// Question: in function overloading is this necessary to pass parameters ?
// Answer: No, it is not necessary to pass parameters in function overloading
// Question: then why it gives me error when i remove optional ? in parameter ?
function f1(args?: string) {
  if (args) {
    return { a: true, b: args };
  }
  return { a: 123, b: '123' };
}

function maybe<T>(fnOrP: () => T): T | undefined;
function maybe<T>(fnOrP: Promise<T>): Promise<undefined | T>;
function maybe<T>(
  fnOrP: (() => T) | Promise<T>
): T | undefined | Promise<undefined | T> {
  if (typeof fnOrP === 'function') return fnOrP();
  return fnOrP.then((res) => res);
}

const x = maybe(() => 'hello world'); // if we see the possible values of x  "string | Promise<string | undefined> | undefined" which is not very useful here function overloading comes into play and after defining function signature we will get the desired values types  "string | undefined"

(async () => {
  const result = await maybe(Promise.resolve('hello world'));
})();

type Widget = {
  name: string;
  env: 'Dev' | 'Prod';
  createdAt: Date;
};

const isString = (input: any): input is string => typeof input === 'string';
const isDate = (input: any): input is Date => input instanceof Date;
const isWidget = (w: any): w is Widget =>
  isString(w.name) && ['Prod', 'Dev'].includes(w.env) && isDate(w.createdAt);

// function overloading
function updateWidget(
  updateOrKey: Partial<Widget>,
  widgetOrValue: Widget
): Widget;
function updateWidget<K extends keyof Widget>(
  updateOrKey: K,
  widgetOrValue: Widget[K],
  widget: Widget
): Widget;

function updateWidget<K extends keyof Widget>(
  updateOrKey: Partial<Widget> | K,
  widgetOrValue: Widget | Widget[K],
  widget?: Widget
): Widget {
  if (isString(updateOrKey)) {
    if (!isWidget(widgetOrValue)) {
      if (isWidget(widget)) {
        return {
          ...widget,
          [updateOrKey]: widgetOrValue,
        };
      }
      throw new Error('Wrong args');
    }
    throw new Error('Wrong args');
  }
  if (isString(widgetOrValue) || isDate(widgetOrValue)) {
    throw new Error('Wrong args');
  }

  return {
    ...widgetOrValue,
    ...updateOrKey,
  };
}

// const w1 = updateWidget('name', { name: 'widget', env: 'Dev', createdAt: new Date() });
const w1 = updateWidget('createdAt', new Date(), {
  name: 'widget',
  env: 'Dev',
  createdAt: new Date(),
});
const w2 = updateWidget(
  { name: 'something', createdAt: new Date(), env: 'Dev' },
  { name: 'widget', env: 'Dev', createdAt: new Date() }
);
console.log(w2);

// again learning function overloading in ts

interface Coordinate {
  x: number;
  y: number;
}

function parseCoordinateFromObject(obj: Coordinate): Coordinate {
  return {
    ...obj,
  };
}

function parseCoordinateFromNumbers(x: number, y: number): Coordinate {
  return {
    x,
    y,
  };
}

// so in js we just create a simple function and check if the input is object then handles in diff way and if the input is number then we handle it in different way so it possible we can do in typescript
// so we will use function overloading

function parseCoordinate(obj: Coordinate): Coordinate; // overload signature
function parseCoordinate(stringCoord: string): Coordinate; // overload signature
function parseCoordinate(x: number, y: number): Coordinate; // overload signature
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  // implementation signature
  // so we are making arg2 optional cuz in the first overload signature we only accepts one argument but in second we accepts 2 so to make the implementation signature compatible we must make the number of parameters same so that's why we make the arg2 optional
  let coord: Coordinate = {
    x: 0,
    y: 0,
  };

  if (typeof arg1 === 'object') {
    coord = {
      ...(arg1 as Coordinate),
    };
  } else if (typeof arg2 === 'number' && arg2 !== undefined) {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  } else if (typeof arg1 === 'string') {
    const result = arg1
      .trim()
      .split(',')
      .map((pair) =>
        pair
          .trim()
          .split(':')
          .map((item) => item.trim())
      );

    for (let [key, value] of result) {
      // here it is raising the error of saying that item[0] keys can't be used here because its type is string and string can't be used here so we have to tell the ts that this is also the same keys as the keys of coord object that's why we use type assertion
      coord[key as keyof Coordinate] = parseFloat(value);
    }
  }

  return coord;
}

parseCoordinate(12, 23);
parseCoordinate({ x: 12, y: 23 });
parseCoordinate(' x : 12 , y : 23 ');
