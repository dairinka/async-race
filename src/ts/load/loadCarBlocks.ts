import { CarData } from "../type";
import { drawCarBlock } from "../pages/drawPage";

export function loadDataToCarBlocks(dataArray: CarData[]) {
  const parentNode = <HTMLElement>document.querySelector(".car-blocks-wrapper");
  Array.from(parentNode.children).forEach((el) => el.remove());
  dataArray.forEach((car) => {
    drawCarBlock(parentNode, car);
  });
}
