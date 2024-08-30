/*Learning Again satisfies keyword in typescript */

type Color = string | { r: number; g: number; b: number };

const red: Color = 'red';
const green = 'green' as Color;
const blue = 'blue' satisfies Color;

// how we can create a type for color of r,g,b and the value range is 0 - 255

// Do you the difference between these three methods of annotating the types in typescript ?
// so if you hover on these red and green ts just knows that red and green are just Color type but if you hover on blue ts actually knows blue is string literal of blue
// and the advantage of blue string literal is that we can use the strings methods on blue but if we try to use string methods on red and green we actually don't get string methods
// this is because when you override the type to Color now the type checker believes it can be a string or can be an object so we are not aware of green or red is a string or object
// in ts as keyword is pretty dangerous as you are telling the compiler you knows better for instance if we make a green an object we can leave it with only one color without providing rest of them (green and blue) like this and ts will allow it but in this case g and b are supposed to be defined but we are not getting type errors

const green1 = { r: 0 } as Color;

// but with the first type annotation method (red) it works well if we use object type and leave any color it will throw error

// @ts-expect-error
const red1: Color = { r: 0 };

// and it works same with satisfies if we use object type and leave any color it will throw error

// @ts-expect-error
const blue1 = { r: 0 } satisfies Color;

// and it also works very will with "as const" with out "as const" it only knows that r,g or b is a number but with it it exactly knows the value of number (we can see that when hovering)
const blue2 = { r: 0, g: 233, b: 255 } as const satisfies Color;

// 2nd example

type UserCols = 'username' | 'nickname' | 'roles';

type User2ndExample = Record<UserCols, string | string[] | undefined>;

const user2ndExample: User2ndExample = {
  username: 'David',
  nickname: undefined,
  roles: ['admin', 'dev'],
};

// now when i want to use any array method on roles for undefined we handle it with optional chaining but it also give us an error of Property map does not exist on type string because we tell that in Record roles can also be string that's why it give that error

// @ts-expect-error
user2ndExample.roles?.map((role) => role);

// we can fix this by using satisfies operator instead of annotating the type after the variable name we use it with satisfies operator and we also don't need the optional chaining

const user2ndExampleSatisfies = {
  username: 'David',
  nickname: undefined,
  roles: ['admin', 'dev'],
} satisfies User2ndExample;

user2ndExampleSatisfies.roles.map((role) => role);

// 3rd Example

type Properties = 'red' | 'green' | 'blue';
type RGB = [red: number, green: number, blue: number];

const color: Record<Properties, RGB | string> = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
};

// @ts-expect-error
color.green.toUpperCase();

// now we can't use the string method on green we know that green is a string but typescript don't
// however we can narrow the type by in if block by checking the type of green like this but it will be a cumbersome when we have lots of types like this and additionally we need to write the condition which we don't want so using satisfies operator is great choice

if (typeof color.green === 'string') {
  color.green.toUpperCase();
}

const color2 = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
} satisfies Record<Properties, RGB | string>;

// now no need to check the type

color2.green.toUpperCase();

// what i understand is when we annotate a type after variable (user : User) or annotating with as keyword one thing i noticed is that we are telling the type of a variable before assigning value to it with as keyword i know we are annotating after the assigning the value but consider it as annotating it before the assigning so before assigning ts don't the type of a variable that's why we can't use the methods for that datatype but in case of satisfies we are doing it after assigning the values to the variable typescript knows the datatype of specific property or variable that's why we can use the methods for that datatype

type Connection = {};
declare function createConnection(host: string, port: string, reconnect: boolean, poolSize: number): Connection;

type Config = {
  host: string;
  port: number | string;
  tryReconnect: boolean | (() => boolean);
  poolSize?: number;
};

const config = {
  host: 'localhost',
  port: 8080,
  tryReconnect: () => true,
  poolSize: 10,
} as const satisfies Config;

function start() {
  let { host, port, tryReconnect } = config;
  createConnection(host, `${port}`, tryReconnect(), 10);
}

// Lets Learn satisfies operator in typescript from here
// https://blog.logrocket.com/getting-started-typescript-satisfies-operator/#:~:text=The%20satisfies%20operator%20is%20a,a%20definition%20of%20a%20type.

type StateName = 'Washington' | 'Detroit' | 'New Jersey';
type StateCoordinate = {
  x: number;
  y: number;
};

type MyState = StateName | StateCoordinate;

type User = {
  birthState: MyState;
  currentState: MyState;
};

const user: User = {
  birthState: 'Washington',
  currentState: {
    x: 10,
    y: 20,
  },
};

//   now if we try of convert birthState into uppercase then ts will throw an error

// user.birthState.toUpperCase(); // Property 'toUpperCase' does not exist on type 'MyState'.
//   This is because TypeScript is not sure of the value of birthState or whether it is a string or an object because we defined MyState as a union of a string and an object.
//    if we want to remove this error we need to check if the birthState property is string
if (typeof user.birthState === 'string') {
  user.birthState.toUpperCase();
}
//   Having to always validate whether it is a string can be frustrating and cumbersome. This is where the satisfies operator comes in.

const values = {
  birthState: 'Washington',
};

const coordinates = { currentState: { x: 10, y: 20 } };

const newUser = {
  birthState: 'Washington',
  currentState: coordinates.currentState,
} satisfies User;

newUser.birthState.toUpperCase(); // no error

//   Thanks to the satisfies operator; TypeScript knows that our birthState is a string and not an object because it has pre-validated/checked the values of all properties of the User.

//   Property name constraining with satisfies operator

type Keys = 'FirstName' | 'LastName' | 'Email' | 'Password' | 0;

type User1 = { [key in Keys]: string | number }; // iterates over all the union types of Keys and set the type of each key to string
type RecordUser = Partial<Record<Keys, string | number>>; // same as above but make all the properties optional

const user1 = {
  FirstName: 'John',
  LastName: 'Doe',
  Email: 'john@gmail.com',
  Password: '123456',
  0: 'zero',
  // age: 23, // we can't add age because age is not present in Keys
} satisfies RecordUser;

export {};

// array of sequence of 255 numbers (0-255)

const colorRange = Array.from({ length: 255 }, (_, i) => i);
