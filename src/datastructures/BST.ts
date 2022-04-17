class Node<Type> {
  left: Node<Type>;
  right: Node<Type>;
  value: Type;
  height: number;

  constructor(value: Type) {
    this.value = value;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

export default class BST<Type> {
  root: Node<Type>;
  compare: Function;

  constructor(compare: Function = null) {
    this.compare = compare || this.defaultCompare;
  }

  insert(value: Type) {
    this.root = this.insertToNode(value, this.root);
  }

  insertToNode(value: Type, node: Node<Type>): Node<Type> {
    if (!node) return new Node<Type>(value);

    if (this.compare(node.value, value))
      node.left = this.insertToNode(value, node.left);
    else if (this.compare(value, node.value))
      node.right = this.insertToNode(value, node.right);
    else return node;

    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));

    if (this.getBalance(node) > 1) {
      if (this.compare(value, node.left.value)) {
        console.log("LEFT RIGHT");
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
      } else if (this.compare(node.left.value, value)) {
        console.log("RIGHT");
        return this.rightRotate(node);
      }
    } else if (this.getBalance(node) < -1) {
      if (this.compare(value, node.right.value)) {
        console.log("LEFT");
        return this.leftRotate(node);
      } else if (this.compare(node.right.value, value)) {
        console.log("RIGHT LEFT");
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
      }
    }

    return node;
  }

  rightRotate(y: Node<Type>): Node<Type> {
    const x: Node<Type> = y.left;
    const T2: Node<Type> = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    return x;
  }

  leftRotate(x: Node<Type>): Node<Type> {
    const y: Node<Type> = x.right;
    const T2: Node<Type> = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    return y;
  }

  height(node: Node<Type>): number {
    if (!node) return 0;
    return node.height;
  }

  getBalance(node: Node<Type>): number {
    if (!node) return 0;
    return this.height(node.left) - this.height(node.right);
  }

  defaultCompare(a: Type, b: Type): boolean {
    return a > b;
  }
}
