import { CarData } from "../type";
import { drawCarBlock } from "../pages/drawPage";

export function loadDataToCarBlocks(dataArray: CarData[]): void {
  const parentNode = <HTMLElement>document.querySelector(".car-blocks-wrapper");
  Array.from(parentNode.children).forEach((el) => el.remove());
  dataArray.forEach((car) => {
    drawCarBlock(parentNode, car);
  });
}

export function updateCarPageData(carData: CarData): void {
  const { name, color, id } = carData;
  const carBlock = <HTMLElement>document.querySelector(`[data-id = '${id}']`);
  const nameEl = <HTMLElement>carBlock.querySelector(".car__name");
  const carImg = <SVGGraphicsElement>carBlock.querySelector(".car__img");
  nameEl.textContent = name;
  carImg.setAttribute("fill", color);
}

export function getCarInputData(inputType: string): string[] {
  const controlLine = <HTMLElement>(
    document.querySelector(`[data-type = '${inputType}']`)
  );
  const nameEl = <HTMLInputElement>controlLine.querySelector(".name-input");
  const colorEl = <HTMLInputElement>controlLine.querySelector(".color-input");
  return [nameEl.value, colorEl.value];
}

export function clearInputData(inputType: string): void {
  const controlLine = <HTMLElement>(
    document.querySelector(`[data-type = '${inputType}']`)
  );
  const nameEl = <HTMLInputElement>controlLine.querySelector(".name-input");
  const colorEl = <HTMLInputElement>controlLine.querySelector(".color-input");
  nameEl.value = "";
  colorEl.value = "#ff0000";
}
