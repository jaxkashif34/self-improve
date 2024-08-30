class Doggy {
  //   public name: string = ''; // instead of this we can set parameters to public passes to the constructor function
  constructor(public readonly name: string, public readonly age: number) {
    // this.name = name;
  }
}

const lg = new Doggy('LG', 10);
//   lg.name = 'Dog'; // we can change the name of the dog because it is not readonly property we don't want that so we need to set readonly flag in front of parameters passes to the constructor
console.log(lg.name);

//   ------> Statics <-----

class DogList {
  private doggies: Doggy[] = [];

  static instance: DogList = new DogList();
  static getInstance() {
    return this.instance;
  }

  private constructor() {}

  // addDog(dog: Doggy) {
  //   this.doggies.push(dog);
  // }
  addDog(dog: Doggy) {
    DogList.instance.doggies.push(dog);
  }

  getDogs() {
    return this.doggies;
  }
}

DogList.instance.addDog(lg);
DogList.instance.addDog(lg);

console.log(DogList.instance.getDogs());

export {}