const menuElement: HTMLElement = document.querySelector(".js_split-menu");

const setup = async () => {
  if (menuElement) {
    if (menuElement.dataset.source) {
      const response: any = await fetch(menuElement.dataset.source);
      addMenuNode(menuElement, await response.json());
    }
  }
};

const addMenuNode = (el: HTMLElement, nodeData: any) => {
  el.classList.add("split-menu__cell");
  if (Array.isArray(nodeData) && nodeData.length >= 2) {
    setTimeout(() => {
      if (el.offsetWidth < el.offsetHeight) {
        el.classList.add("split-menu__cell--horizontal");
      }
      addChild(el, nodeData[0]);
      addChild(el, nodeData[1]);
    }, 0);
  } else {
    el.style.backgroundColor = nodeData.background;
    const p: HTMLElement = document.createElement("p");
    p.innerHTML = nodeData.headline;
    el.appendChild(p);
  }
};

const addChild = (parent: HTMLElement, childData: any) => {
  const child: HTMLElement = document.createElement("section");
  parent.appendChild(child);
  addMenuNode(child, childData);
};

setup();
