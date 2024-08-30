class MyNode<T> {
  left: MyNode<T> | null = null;
  right: MyNode<T> | null = null;
  value: T;
  height: number = 1;

  constructor(value: T) {
    if (!value) throw Error("Please provide a valid value");
    this.value = value;
  }
}

class AVLTree<T extends number | string> {
  root: MyNode<T> | null = null;

  private getHeight(node: MyNode<T> | null): number {
    return node ? node.height : 0;
  }

  private updateHeight(node: MyNode<T>): void {
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  private getBalanceFactor(node: MyNode<T> | null): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  private rotateRight(y: MyNode<T>): MyNode<T> {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  private rotateLeft(x: MyNode<T>): MyNode<T> {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  private balance(node: MyNode<T>): MyNode<T> {
    this.updateHeight(node);

    const balanceFactor = this.getBalanceFactor(node);

    if (balanceFactor > 1) {
      if (this.getBalanceFactor(node.left!) < 0) {
        node.left = this.rotateLeft(node.left!);
      }
      return this.rotateRight(node);
    }

    if (balanceFactor < -1) {
      if (this.getBalanceFactor(node.right!) > 0) {
        node.right = this.rotateRight(node.right!);
      }
      return this.rotateLeft(node);
    }

    return node;
  }

  private _insert(node: MyNode<T> | null, value: T): MyNode<T> {
    if (node === null) {
      return new MyNode(value);
    }

    if (value < node.value) {
      node.left = this._insert(node.left, value);
    } else if (value > node.value) {
      node.right = this._insert(node.right, value);
    } else {
      return node;
    }

    return this.balance(node);
  }

  add(value: T): void {
    if (!value) throw Error("Please provide a valid value");
    this.root = this._insert(this.root, value);
  }

  private _deleteNode(node: MyNode<T> | null, value: T): MyNode<T> | null {
    if (!node) return null;
    if (value < node.value) {
      node.left = this._deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._deleteNode(node.right, value);
    } else {
      if (!node.left && !node.right) {
        return null;
      }
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }
      const minValueNode = this._getMinValueNode(node.right)!;
      node.value = minValueNode.value;
      node.right = this._deleteNode(node.right, node.value);
    }
    return this.balance(node);
  }

  deleteNode(value: T): void {
    this.root = this._deleteNode(this.root, value);
  }

  private _getMinValueNode(node: MyNode<T> | null): MyNode<T> | null {
    while (node && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  inOrderTraversal(root = this.root): void {
    if (!root) return;
    if (root.left) this.inOrderTraversal(root.left);
    console.log(root.value);
    if (root.right) this.inOrderTraversal(root.right);
  }

  preOrderTraversal(root = this.root): void {
    if (!root) return;
    console.log(root.value);
    if (root.left) this.preOrderTraversal(root.left);
    if (root.right) this.preOrderTraversal(root.right);
  }

  postOrderTraversal(root = this.root): void {
    if (!root) return;
    if (root.left) this.postOrderTraversal(root.left);
    if (root.right) this.postOrderTraversal(root.right);
    console.log(root.value);
  }
}

const avlTree = new AVLTree<number>();

avlTree.add(3);
avlTree.add(2);
avlTree.add(1);

console.log(avlTree.root);
