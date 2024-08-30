const myForEach = <T>(items: T[], forEachCallback: (v: T) => void): void => {
  items.reduce((acc, item: T) => {
    forEachCallback(item);
    return undefined;
  }, undefined);
};

myForEach([1, 2, 3], (v) => console.log(`forEach ${v}`));

const myFilter = <T>(items: T[], callback: (v: T) => boolean): T[] => {
  return items.reduce((acc, item: T) => {
    if (callback(item)) {
      acc.push(item);
    }
    return acc;
  }, [] as T[]);
};

myFilter([1, 2, 3, 4, 5], (v) => v % 2 === 0);

const myMap = <T>(items: T[], callback: (v: T) => T): T[] => {
  return items.reduce((acc, item) => {
    acc.push(callback(item));
    return acc;
  }, [] as T[]);
};

myMap([1, 2, 3, 4, 5], (v) => v * 10);

export {}