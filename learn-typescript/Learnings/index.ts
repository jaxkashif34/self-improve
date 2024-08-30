// 1) we can use the same name for interfaces but not for types and class. Additionally interfaces types are merged automatically
// 2) we can use extends keyword to extend other interfaces and also other types (for types we have to use different name keyword ) in case of class we can use extends keyword to extend other classes. we can also extends types from other types
// 3) Syntax: type is defined using the type keyword, followed by a name and a type definition, whereas interface is defined using the interface keyword, followed by a name and a set of properties and methods.
// 4) Extensibility: Interfaces can be extended by other interfaces or classes using the extends keyword, while types cannot be extended.
// 5) Reusability: Types can be used to define unions, intersections, and other advanced types, which can be used in multiple places in your code. Interfaces, on the other hand, can only be used to define object types.
// 6) Aliasing: Types can be used to create aliases for existing types, while interfaces cannot. This means that you can create a new name for an existing type using the type keyword.
// 7) we can use dynamic keys in interfaces so that we can maintain required keys and optional keys
interface Person {
  name: string;
  age: number;
  [key: string]: any;
}
// ------>  Functions <--------
const pow = (x: number, y: number): string => {
  return Math.pow(x, y).toString();
};
pow(12, 3);
// ------> Generics <---------

const a1: Array<string> = ['1', '@', '4'];
const a2: Array<number> = [1, 3, 4];

type Job = {
  name: string;
  start: () => void;
  state: 'incomplete' | 'success' | 'failure';
};

type JobRun<J extends Job> = {
  job: J;
  state: 'queued' | 'running' | 'complete';
  onComplete: (cb: (job: J) => void) => void;
};

type SendEmailJob = Job & {
  recipientEmail: string;
  subject: string;
};

function enqueueJob<T extends SendEmailJob>(job: T): JobRun<T> {
  return {
    job,
    state: 'queued',
    onComplete: (cb: (job: T) => void) => cb(job),
  };
}

const j: SendEmailJob = {
  recipientEmail: 'kashif@gmail.com',
  subject: 'hello',
  name: 'Front-End Developer',
  start: () => {
    console.log('started');
  },
  state: 'incomplete',
};

const run = enqueueJob(j);

run.onComplete((job) => {
  console.log(job.name);
});

// ------> Regex <-------
const regex: RegExp = /foo/;

// ------>  Maps <---------

// if we want to use dynamic keys we have to use Record (build-in) Utility type Record<key, value>
const ids: Record<number, string> = {
  10: 'a',
  20: 'b',
};
ids[30] = 'c';
// console.log(ids);
