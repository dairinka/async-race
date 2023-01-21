import { checkPage, getParam, saveParam } from "../localStorage/localStorage";
import { LSParam, Base, CarData } from "../type";
import { updateCountPage } from "../load/loadDataPage";
import { getDataForNewPage, getCurrentCar, getAllCarAmount } from "../..";
import { showMessage } from "../message/message";
import ServerData from "../load/serverData";

function listenPage() {
  const allWrapper = document.querySelector(".all-wrapper");
  allWrapper?.addEventListener("click", (event: Event) => {
    const target = <HTMLElement>event.target;
    removeSelected(target);
    const targetData = target.dataset.btn;
    let car, carId;
    if (target.closest(".car") !== null) {
      car = <HTMLElement>target.closest(".car");
      carId = <string>car.dataset.id;
    }
    console.log("target", targetData);
    switch (targetData) {
      case "next":
        nextPage();
        break;
      case "prev":
        prevPage();
        break;
      case "generate":
        break;
      case "garage":
        break;
      case "winners":
        break;
      case "create":
        break;
      case "update":
        break;
      case "race":
        break;
      case "reset":
        break;
      case "select":
        selectCar(carId as string);
        console.log("carId", carId);
        break;
      case "remove":
        break;
      case "start":
        break;
      case "stop":
        break;
    }
  });
}

async function nextPage(): Promise<void> {
  const allAmountCar: string = await getAllCarAmount();
  const currentPage: string = checkPage();
  const page = Number(currentPage);
  const allPage: number = Math.ceil(
    Number(allAmountCar) / Number(Base.limitCars)
  );
  if (page + 1 <= allPage) {
    const nextPage = String(page + 1);
    newPage(nextPage);
  } else {
    showMessage(`${currentPage} page is the last`);
  }
}

function prevPage(): void {
  const currentPage: string = checkPage();
  const page = Number(currentPage);
  if (page - 1 > 0) {
    const nextPage = String(page - 1);
    newPage(nextPage);
  } else {
    showMessage(`${currentPage} page is the first`);
  }
}

function newPage(page: string) {
  updateCountPage(page);
  getDataForNewPage(page);
  saveParam(LSParam.page, page);
}

async function selectCar(carId: string) {
  const { name, color } = await getCurrentCar(carId);
  const controlLine = <HTMLElement>(
    document.querySelector("[data-type = 'update']")
  );
  const inputName = <HTMLInputElement>controlLine?.querySelector(".name-input");
  const inputColor = <HTMLInputElement>(
    controlLine?.querySelector(".color-input")
  );
  const carBlock = document.querySelector(`[data-id = '${carId}']`);
  const carImg = carBlock?.querySelector(".car__img");
  // console.log("carBlock", carBlock);
  // console.log("carImg", carImg);
  inputName.value = name;
  inputColor.value = color;
  controlLine.classList.add("selected");
  carImg?.classList.add("selected");
  // console.log("controlLine", controlLine);
  // console.log("inputColor", inputColor);
}
function removeSelected(target: HTMLElement): void {
  const selectedEls: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".selected"
  );
  const inputsOfControlLine: NodeListOf<HTMLElement> = document.querySelectorAll(
    "[data-type = 'update'] .input"
  );
  if (
    selectedEls.length > 0 &&
    !Array.from(inputsOfControlLine).includes(target)
  ) {
    Array.from(selectedEls).forEach((el) => el.classList.remove("selected"));
  }
}
export default listenPage;
