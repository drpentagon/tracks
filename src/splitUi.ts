const menuElement: HTMLElement = document.querySelector(".js_split-menu");

export default class SplitCell {
  element: HTMLElement;
  child1: SplitCell;
  child2: SplitCell;
  depth: number;
  itemData: any;

  constructor(element: HTMLElement, depth: number = 0) {
    this.element = element;
    // this.element.addEventListener("click", this.handleClick);
    this.depth = depth + 1;
  }

  addItem = (menuItem) => {
    if (this.itemData) {
      this.split(menuItem);
    } else {
      this.addContent(menuItem);
    }
  };

  split = (menuItem) => {
    const cell1: HTMLElement = document.createElement("section");
    const cell2: HTMLElement = document.createElement("section");
    cell1.classList.add("split-menu__cell");
    cell2.classList.add("split-menu__cell");
    this.child1 = new SplitCell(cell1);
    this.child2 = new SplitCell(cell2);
    this.child1.addItem(this.itemData);
    this.child2.addItem(menuItem);
    this.element.innerHTML = "";
    this.element.appendChild(cell1);
    this.element.appendChild(cell2);
    if (this.element.offsetWidth < this.element.offsetHeight) {
      this.element.classList.add("split-menu__cell--horizontal");
    }
  };

  addContent = (menuItem) => {
    this.element.style.backgroundColor = menuItem.background;
    this.element.style.color = menuItem.color;
    const p: HTMLElement = document.createElement("p");
    p.innerHTML = menuItem.headline;
    this.element.appendChild(p);
    this.itemData = menuItem;
  };

  handleClick = () => {
    const child1 = this.createCell("Left " + this.depth);
    const child2 = this.createCell("Right " + this.depth);
    this.element.innerHTML = "";
    this.element.appendChild(child1);
    this.element.appendChild(child2);

    this.child1 = new SplitCell(child1, this.depth);
    this.child2 = new SplitCell(child2, this.depth);

    if (this.element.offsetWidth < this.element.offsetHeight) {
      this.element.classList.add("split-menu__cell--horizontal");
    }

    this.element.removeEventListener("click", this.handleClick);
  };

  createCell = (text: string) => {
    const cell: HTMLElement = document.createElement("section");
    cell.classList.add("split-menu__cell");
    const r: Number = Math.floor(Math.random() * 256);
    const g: Number = Math.floor(Math.random() * 256);
    const b: Number = Math.floor(Math.random() * 256);
    cell.style.backgroundColor = `rgb(${r},${g},${b})`;
    const p: HTMLElement = document.createElement("p");
    p.innerHTML = text;
    cell.appendChild(p);
    return cell;
  };
}

const setup = async () => {
  if (menuElement) {
    const ui: SplitCell = new SplitCell(menuElement);

    if (menuElement.dataset.source) {
      const response = await fetch(menuElement.dataset.source);
      const projects = await response.json();
      projects.forEach((p) => ui.addItem(p));
    }
  }
};

setup();
