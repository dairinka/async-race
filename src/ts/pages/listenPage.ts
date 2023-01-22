import {
  checkPage,
  removeParam,
  saveParam,
  getParam,
  checkLSParam,
} from "../localStorage/localStorage";
import {
  LSParam,
  Base,
  InputType,
  CarData,
  EngineData,
  ServerStatus,
  ServerMessage,
} from "../type";
import { updateCountPage, updateAmountOnPage } from "../load/loadDataPage";
import {
  clearInputData,
  getCarInputData,
  updateCarPageData,
} from "../load/loadCarBlocks";
import {
  getDataForPage,
  getCurrentCar,
  getAllCarAmount,
  updateCarOnServer,
  createCarOnServer,
  removeCarOnServer,
  generateCarOnServer,
} from "../..";
import { showMessage } from "../message/message";
import carsName from "../../asset/data/carsName";
import color from "../../asset/data/color";
import { abortConnect, goCar, startEngine } from "../engine/controlEngine";
import { animationCar, stopAnimation } from "../animation/animate";
import AnimationCar from "../animation/animateCar";

function listenPage() {
  const allWrapper = document.querySelector(".all-wrapper");
  allWrapper?.addEventListener("click", (event: Event) => {
    const target = <HTMLElement>event.target;
    checkRemoveSelected(target);
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
        generateCar();
        break;
      case "garage":
        break;
      case "winners":
        //loadWinnerPage();
        break;
      case "create":
        createNewCar();
        break;
      case "update":
        updateCar();
        break;
      case "race":
        //raceCars();
        break;
      case "reset":
        break;
      case "select":
        selectCar(carId as string);
        break;
      case "remove":
        removeCar(carId as string);
        break;
      case "start":
        startCar(carId as string);
        break;
      case "stop":
        break;
    }
  });
  checkLSParam("listenPage()");
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
  getDataForPage(page);
  saveParam(LSParam.page, page, "function newPage()");
  checkLSParam("newPage()");
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
  inputName.value = name;
  inputColor.value = color;
  controlLine.classList.add("selected");
  carImg?.classList.add("selected");
  saveParam(LSParam.carId, carId, "function selectCar()");
  // /////////////////////////////////
  // console.log("inputColor", inputColor);
  checkLSParam("selectCar()");
}

function checkRemoveSelected(target: HTMLElement): void {
  const controlLine = <HTMLElement>(
    document.querySelector("[data-type = 'update']")
  );
  if (target.closest("[data-type = 'update']") !== controlLine) {
    removeSelected();
  }
}

function removeSelected(): void {
  const selectedEls: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".selected"
  );
  if (selectedEls.length > 0) {
    Array.from(selectedEls).forEach((el) => el.classList.remove("selected"));
    removeParam(LSParam.carId);
  }
}

function loadWinnerPage() {
  console.log(`loadWinnerPage()`);
  const items = { ...localStorage };
  for (const key in items) {
    console.log("key in localStorage", key);
    console.log("key in localStorage", localStorage.getItem(key));
  }
  checkLSParam("loadWinnerPage()");
}

async function updateCar() {
  const carId = getParam(LSParam.carId, "updateCar()");
  if (!carId) showMessage("Please, select a car!");
  const [name, color] = getCarInputData(InputType.update);
  await updateCarOnServer(carId, name, color);
  const carData = await getCurrentCar(carId);
  updateCarPageData(carData);
  removeSelected();
  clearInputData(InputType.update);
}

async function createNewCar() {
  const [name = "", color] = getCarInputData(InputType.create);
  const carData: CarData = { name, color };
  await createCarOnServer(carData);
  const amount = await getAllCarAmount();
  updateAmountOnPage(amount);
  const page = getParam(LSParam.page, "createNewCar()");
  getDataForPage(page);
}

async function removeCar(carId: string) {
  await removeCarOnServer(carId);
  const amount = await getAllCarAmount();
  updateAmountOnPage(amount);
  const page = checkPage();
  getDataForPage(page);
  updateCountPage(page);
}

async function generateCar() {
  const amountCarName = carsName.length - 1;
  const amountColor = color.length - 1;
  const amountGenerate = Number(Base.amountGenerate);
  const arrCar = [];
  for (let i = 1; i <= amountGenerate; i += 1) {
    const randomName = carsName[randomNumber(amountCarName)];
    const randomColor = color[randomNumber(amountColor)];
    const carData = { name: randomName, color: randomColor };
    arrCar.push(carData);
  }
  generateCarOnServer(arrCar);
  const amount = await getAllCarAmount();
  updateAmountOnPage(amount);
  const page = getParam(LSParam.page, "createNewCar()");
  getDataForPage(page);
}

function randomNumber(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}

// async function startCar(carId: string): Promise<void> {
//   const startBtn = <HTMLElement>(
//     document.querySelector(`[data-id="${carId}"] [data-btn="start"]`)
//   );
//   if (startBtn.hasAttribute("data-start")) {
//     showMessage(ServerMessage.tooManyRequest, carId);
//   } else {
//     startBtn.dataset.start = "true";
//     const engineData: EngineData = await startEngine(carId);
//     animationCar(carId, engineData);
//     try {
//       const serverStatus = await goCar(carId);
//       switch (serverStatus) {
//         case ServerStatus.ok:
//           break;
//         case ServerStatus.tooManyRequest:
//           showMessage(ServerMessage.tooManyRequest, carId);
//           break;
//         case ServerStatus.carStop:
//           showMessage(ServerMessage.carStop, carId);
//           stopAnimation();
//           stopCar(carId);
//           break;
//       }
//       console.log("serverStatus", serverStatus);
//     } catch (err) {
//       console.log(`I catch err =  ${err}`);
//     }
//   }
// }
async function startCar(carId: string): Promise<void> {
  const carBlock = <HTMLElement>document.querySelector(`[data-id="${carId}"]`);
  const startBtn = <HTMLElement>carBlock.querySelector(`[data-btn="start"]`);
  if (startBtn.hasAttribute("data-start")) {
    showMessage(ServerMessage.tooManyRequest, carId);
  } else {
    startBtn.dataset.start = "true";
    const resetBtn = <HTMLElement>document.querySelector(`[data-btn="reset"]`);
    const stopBtn = <HTMLElement>carBlock.querySelector(`[data-btn="stop"]`);
    const engineData: EngineData = await startEngine(carId);
    const animationCar = new AnimationCar(carId, engineData);
    stopBtn.addEventListener("click", () => stopCar(animationCar, carId));
    resetBtn.addEventListener("click", () => {
      stopCar(animationCar, carId);
      allCarsToStart();
    });
    animationCar.startAnimationCar();
    const serverStatus = await goCar(carId);

    switch (serverStatus) {
      case ServerStatus.ok:
        startBtn.removeAttribute("data-start");
        break;
      case ServerStatus.tooManyRequest:
        showMessage(ServerMessage.tooManyRequest, carId);
        break;
      case ServerStatus.carStop:
        showMessage(ServerMessage.carStop, carId);
        stopCar(animationCar, carId);
        fireCar(carId);
        break;
    }
  }
}
function stopCar(animationCar: AnimationCar, carId: string): void {
  const carBlock = <HTMLElement>document.querySelector(`[data-id="${carId}"]`);
  const startBtn = <HTMLElement>carBlock.querySelector(`[data-btn="start"]`);
  console.log("stoooop");
  animationCar.stopAnimation();
  startBtn.removeAttribute("data-start");
  abortConnect();
}

function allCarsToStart(): void {
  const carMoveEls: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".car-move"
  );
  Array.from(carMoveEls).forEach((car) => {
    car.classList.remove("fire");
    car.style.removeProperty("transform");
  });
}

function fireCar(carId: string): void {
  const carMove = <HTMLElement>(
    document.querySelector(`[data-id="${carId}"] .car-move`)
  );
  carMove.classList.add("fire");
}
export default listenPage;
