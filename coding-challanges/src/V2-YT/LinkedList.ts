import { LinkedList } from "../YT/DSA/LinkedList/linkedList";
export {};
const list = new LinkedList<number>();

list.append(2);
list.append(4);
list.append(3);
// list.append(14);
// list.append(15);

const list2 = new LinkedList<number>();

list2.append(5);
list2.append(6);
list2.append(4);

class LinkedList2<T extends number> extends LinkedList<T> {
  constructor() {
    super(); // by calling super method it calls the constructor of the parent class. In this case, it calls the constructor of the LinkedList class.
  }

  zipper(list1: LinkedList<T>, list2: LinkedList<T>): LinkedList<T> {
    const zipperList = new LinkedList<T>();

    let list1Node = list1.head;
    let list2Node = list2.head;

    while (list1Node || list2Node) {
      if (list1Node) {
        zipperList.append(list1Node.value);
        list1Node = list1Node.next;
      }

      if (list2Node) {
        zipperList.append(list2Node.value);
        list2Node = list2Node.next;
      }
    }

    return zipperList;
  }

  addTwoLinkedLists(list1: LinkedList<T>, list2: LinkedList<T>) {
    const summedList = new LinkedList();

    let currentList1 = list1.head;
    let currentList2 = list2.head;
    let carry = 0;
    while (currentList1 || currentList2 || carry) {
      /*
      we are add carry here because lets say we have to add 99 and 1 so if we don't add carry here
       it will only loops through two times and 1 at carry will not have any chance to add in the 
       total so that's why we need to add carry in the loop condition to make sure every thing is 
       add up into the result
      [
        1----> carry
        9   9
        +   1
        -----
        0   0
      ] so in this see if we don't include carry in loop condition it will not get a chance to add 
      up into the result and result of 99 + 1 = 00 instead of 100

      [
    1---1----> carry
        9   9
        +   1
        -----
    1   0   0
      ] so if we add carry in loop condition it will produce the accurate result

      */
      let value1 = 0;
      let value2 = 0;
      if (currentList1) {
        value1 = currentList1.value;
        currentList1 = currentList1.next;
      }
      if (currentList2) {
        value2 = currentList2.value;
        currentList2 = currentList2.next;
      }

      const sum = value1 + value2 + carry;

      carry = Math.floor(sum / 10);
      /* this carry will add up in the next iteration (next iteration) of numbers

      ############ SIMPLE RULE ############

      when we divide any number > 10 it will simply remove the last digit and provide us the
      left part if we do floor(14/10) -> 1 you see when we divide 14 with 10 it removes the 0
      (last digit) and give us remaining same if we do floor(54/10)-> 5 it works with any
      number like some random number floor(423/10)-> 423 and if we divide any number with 100
      it will start removing last 2 digits

      //    1 ----> carry
      // 1  2   7
      //    4   5
      // --------
      // 1  7   2

      // in the first iteration 2 is digit and will be added as the first node value then 7 and at last 1

      */

      const digit = sum % 10; // digit will be add the node value
      // digit is the single digit value
      // modulus is basically the value left behind after a number is divide un-completely
      /*
      we are getting digit value by taking modulus cuz modulus will give us the left-over 
      value behind by dividing it to the provided number (10 ITC) and digit will then added 
      to the node representing the single digit of the total sum number

      ############ SIMPLE RULE ############
      like when we divide any number > 10 will deduct the last digit and gives us the
      part before the last digit but in modulus it will only gives us the last digit
      if the number is (643 % 10)-> 3 it will always works like that 
      */

      summedList.append(digit);
    }
    return summedList;
  }
}

const zipperLinkedList = new LinkedList2();

zipperLinkedList.addTwoLinkedLists(list, list2).print();
