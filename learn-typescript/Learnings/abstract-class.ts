export {};
abstract class StreetFighter {
  constructor() {}

  move() {}
  fight() {
    console.log(`${this.name()} attack with ${this.getSpecialAttack()}`);
  }

  abstract getSpecialAttack(): string; // abstract methods or variables are those whose implementation are defined in those subclasses whose are extended from that abstract class which have abstract methods and if we make a class abstracted then we can't initiate it using new keyword
  abstract name(): string;
}

class Ryu extends StreetFighter {
  // if we will not implement these methods ts will give an error
  getSpecialAttack(): string {
    return 'Hadoken';
  }
  name(): string {
    return 'Ryu';
  }
}

class ChunLi extends StreetFighter {
  getSpecialAttack(): string {
    return 'Lightening Kick';
  }
  override name(): string {
    return 'Chun-Li';
  }
}
const ryu = new Ryu();
const chunLi = new ChunLi();

// ryu.fight();
chunLi.fight();
