type MyUser = {
  name: string;
  id: string;
  email?: string;
  phone?: string;
};
type MyUserOptional = {
  name?: string;
  id?: string;
  email?: string;
};
const merge = (user: MyUser, override: MyUserOptional): MyUser => {
  return {
    ...user,
    ...override,
  };
};
//   console.log(merge({ name: 'Jack', id: '123', email: 'kashif@gmail.com' }, { email: 'zee@gmail.com' }));
//   the problem with this approach is that we have to write the same code again and again for different types so to fix this we have utility types called "Partial<Type>"
//   Partial<Type> - this will make all the properties of the type optional
// Question: why we need Partial<Type> ?
// Answer: to make all the properties of the type optional

type User = {
  name: string;
  id: number;
  email: string;
  phone?: number;
};

type UserOptional = Partial<User>;

const merge2 = (user: User, override: UserOptional) => {
  return { ...user, ...override };
};

// console.log(merge2({ name: 'Jack', id: 123, email: 'dontemail@gmail.com' }, { email: 'emailme@gmail.com' }));

//   Required<Type> - this will make all the properties of the type required
type RequiredUser = Required<User>;
//   Pick<Type, Properties> - this will pick the properties from the type
type JustEmailAndPhone = Pick<User, 'email' | 'phone'>;
//   Record<Keys, Type> - this will create a new type with the given keys and type
//   Omit<Type, Keys> - this will omit the given keys from the type
type UserWithoutID = Omit<User, 'id'>;
type UserKeys = User['id'];
const mapById = (users: User[]): Record<UserKeys, UserWithoutID> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;
    return { ...a, [id]: other };
  }, {});
};

const users = [
  { name: 'Jack', id: 123, email: '12' },
  { name: 'John', id: 456, email: 'dsf' },
];

// console.log(mapById(users));

// Parameters Type

type Name = {
  first: string;
  last: string;
};

function addFullName(name: Name): Name & { fullName: string } {
  return {
    ...name,
    fullName: `${name.first} ${name.last}`,
  };
}

type ParametersOfFunction = Parameters<typeof addFullName>[0][]; // this will give us the type of parameters of the function

const permuteRows = <T extends (args: Parameters<T>[0]) => ReturnType<T>>(iteratorFunc: T, data: Parameters<T>[0][]): ReturnType<T>[] => {
  return data.map(iteratorFunc);
};

// console.log(permuteRows(addFullName, [{ first: 'Jack', last: 'John' }]));

// Instance Type in TypeScript
type Constructable<ClassInstance> = new (...args: any[]) => ClassInstance;

function DeleteAble<BaseClass extends Constructable<{}>>(Base: BaseClass) {
  // {} same as object type
  return class extends Base {
    deleted: boolean = false;
    delete() {}
  };
}

class UserClass {
  constructor(public name: string) {}
}

class CarClass {
  constructor(public name: string) {}
}

const DeleteAbleCar = DeleteAble(CarClass);
const DeleteAbleUser = DeleteAble(UserClass);

type DeleteAbleUserInstance = InstanceType<typeof DeleteAbleUser>;
type DeleteAbleCarInstance = InstanceType<typeof DeleteAbleCar>;

class Profile {
  user: DeleteAbleUserInstance = new DeleteAbleUser('john');
  car: DeleteAbleCarInstance = new DeleteAbleCar('Ferrari');
}

const profile = new Profile();

//  console.log(profile.car);
//  console.log(profile.user);

// Let's how do we apply it on class ?

class PersonWithFullName<T> {
  constructor(public name: Name) {}

  getFullName() {
    return `${this.name.first} ${this.name.last}`;
  }
}

type A = ConstructorParameters<typeof PersonWithFullName>[0][]; // will give the the parameters we pass in the constructor

function createObjects<T extends new (...args: any[]) => any>(ObjectType: T, data: ConstructorParameters<T>[0][]): InstanceType<T>[] {
  return data.map((item) => new ObjectType(item));
}

const PersonWithFullName1 = createObjects(PersonWithFullName, [{ first: 'john', last: 'Doe' }]);

const person = PersonWithFullName1.map((obj) => obj.getFullName());
console.log(person);

export {};
