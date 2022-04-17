export default class BST<Type> {
  leftChild: BST<Type>;
  rightChild: BST<Type>;
  value: Type;
  height: number;

  insert(value: Type, compare = this.compare): BST<Type> {
    if (!this.value) {
      this.value = value;
      this.height = 1;
    } else if (compare(this.value, value)) {
      if (!this.leftChild) this.leftChild = new BST<Type>();
      //this.height = Math.max(
      this.leftChild.insert(value, compare);
      //    this.height
      // );
      //   if (this.getBalance() > 1) {
      //     if (compare(this.leftChild.value, value)) this.rotateLeftLeft();
      //     else this.rotateLeftRight();
      //   }
    } else {
      if (!this.rightChild) this.rightChild = new BST<Type>();
      //   this.height = Math.max(
      this.rightChild.insert(value, compare);
      //     this.height
      //   );
      //   if (this.getBalance() < -1) {
      //     if (compare(this.rightChild.value, value)) this.rotateRightLeft();
      //     else this.rotateRightRight();
      //   }
    }

    //return this.height;
    return null;
  }

  search(value: Type, compare = this.compare): Type {
    if (this.value === value) return value;
    const nextBranch = compare(this.value, value)
      ? this.leftChild
      : this.rightChild;

    return nextBranch ? nextBranch.search(value, compare) : null;
  }

  getBalance(): number {
    const l = this.leftChild ? this.leftChild.height : 0;
    const r = this.rightChild ? this.rightChild.height : 0;
    return l - r;
  }

  rotateLeftLeft(): void {
    console.log("LEFT LEFT");

    // current.left => left.right
    // current.left.right = current
  }

  rotateLeftRight(): void {
    console.log("LEFT RIGHT");
  }

  rotateRightRight(): void {
    console.log("RIGHT RIGHT");
  }

  rotateRightLeft(): void {
    console.log("RIGHT LEFT");
  }

  traverse(): Type[] {
    let ret: Type[] = [];
    if (this.leftChild) ret = this.leftChild.traverse();
    ret.push(this.value);
    if (this.rightChild) return [...ret, ...this.rightChild.traverse()];
    return ret;
  }

  getDepth(depth: number = 0): number {
    const l = this.leftChild ? this.leftChild.getDepth(depth) : 0;
    const r = this.rightChild ? this.rightChild.getDepth(depth) : 0;
    return Math.max(l, r) + 1;
  }

  isBalanced(): boolean {
    const l = this.leftChild ? this.leftChild.getDepth() : 0;
    const r = this.rightChild ? this.rightChild.getDepth() : 0;
    return Math.abs(l - r) <= 1;
  }

  compare(a: Type, b: Type): boolean {
    return a > b;
  }
}
