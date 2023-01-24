import {
  checkPage,
  removeParam,
  saveParam,
  getParam,
} from "../localStorage/localStorage";
import {
  LSParam,
  Base,
  InputType,
  CarData,
  EngineData,
  ServerStatus,
  ServerMessage,
  Winner,
  WinnersData,
} from "../type";
import {
  updateCountPage,
  updateAmountOnPage,
  checkActivePageBtn,
} from "../load/loadDataPage";
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
  getPageAndAllPage,
} from "../..";
import { showMessage, showWinner } from "../message/message";
import carsName from "../../asset/data/carsName";
import color from "../../asset/data/color";
import { stopCar, toStart } from "../animation/animate";
import AnimationCar from "../animation/animateCar";
import Engine from "../engine/engine";
import {
  loadWinnerPage,
  getWinner,
  createWinner,
  updateWinner,
  deleteWinner,
} from "../load/loadWinners";

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
        loadWinnerPage();
        break;
      case "create":
        createNewCar();
        break;
      case "update":
        updateCar();
        break;
      case "race":
        raceCars();
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
}

async function nextPage(): Promise<void> {
  const [page, allPage] = await getPageAndAllPage();
  if (page + 1 <= allPage) {
    const nextPage = String(page + 1);
    newPage(nextPage);
  } else {
    showMessage(`${page} page is the last`);
  }
  checkActivePageBtn(page + 1, allPage);
}

async function prevPage(): Promise<void> {
  const [page, allPage] = await getPageAndAllPage();
  if (page - 1 > 0) {
    const prevPage = String(page - 1);
    newPage(prevPage);
  } else {
    showMessage(`${page} page is the first`);
  }
  checkActivePageBtn(page - 1, allPage);
}

function newPage(page: string) {
  updateCountPage(page);
  getDataForPage(page);
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
  const carBlock = <HTMLElement>(
    document.querySelector(`[data-id = '${carId}']`)
  );
  const carImg = <HTMLElement>carBlock?.querySelector(".car__img");
  inputName.value = name;
  inputColor.value = color;
  controlLine.classList.add("selected");
  carImg?.classList.add("selected");
  saveParam(LSParam.carId, carId);
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

async function updateCar() {
  const carId = getParam(LSParam.carId);
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
  const page = getParam(LSParam.page);
  getDataForPage(page);
}

async function removeCar(carId: string) {
  await removeCarOnServer(carId);
  const amount = await getAllCarAmount();
  updateAmountOnPage(amount);
  const page = checkPage();
  getDataForPage(page);
  updateCountPage(page);
  await deleteWinner(carId);
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
  const page = getParam(LSParam.page);
  getDataForPage(page);
}

function randomNumber(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}

async function startCar(carId: string): Promise<void> {
  const carBlock = <HTMLElement>document.querySelector(`[data-id="${carId}"]`);
  const startBtn = <HTMLElement>carBlock.querySelector(`[data-btn="start"]`);
  const stopBtn = <HTMLElement>carBlock.querySelector(`[data-btn="stop"]`);
  if (startBtn.hasAttribute("data-start")) {
    showMessage(ServerMessage.tooManyRequest);
  } else {
    startBtn.dataset.start = "true";
    const resetBtn = <HTMLElement>document.querySelector(`[data-btn="reset"]`);
    const engine = new Engine(Base.baseUrl, carId);
    const engineData: EngineData = await engine.start();
    const animationCar = new AnimationCar(carId, engineData);
    stopBtn.addEventListener("click", () => {
      stopCar(animationCar, carId);
      toStart(carId);
      stopBtn.setAttribute("data-stop", "true");
      engine.abortConnect();
    });
    resetBtn.addEventListener("click", () => {
      stopCar(animationCar, carId);
      engine.abortConnect();
      allCarsToStart();
    });
    animationCar.startAnimationCar();
    try {
      const serverStatus = await engine.go(animationCar);

      switch (serverStatus) {
        case ServerStatus.ok:
          startBtn.removeAttribute("data-start");
          break;
        case ServerStatus.tooManyRequest:
          break;
        case ServerStatus.carStop:
          break;
      }
    } catch {}
  }
}

async function raceCars(): Promise<void> {
  const carsOnPage: NodeListOf<HTMLElement> = document.querySelectorAll(".car");
  const carsArr: HTMLElement[] = Array.from(carsOnPage);
  // ///////////Engine
  const engineArr: Engine[] = carsArr.map((car) => {
    const carId = <string>car.dataset.id;
    return new Engine(Base.baseUrl, carId);
  });

  const enginePromiseArr = carsArr.map((car, ind) => {
    const f: Promise<EngineData> = engineArr[ind].start();
    return f;
  });

  const engineDataArr: EngineData[] = await Promise.all(enginePromiseArr);
  // /////////Start animation
  const animationArr: AnimationCar[] = carsArr.map((car, ind) => {
    const carId = <string>car.dataset.id;
    return new AnimationCar(carId, engineDataArr[ind]);
  });

  const animationPromiseArr = carsArr.map((car, ind) => {
    const animationCar: AnimationCar = animationArr[ind];
    return animationCar.startAnimationCar();
  });
  await Promise.all(animationPromiseArr);
  // /////////Listen server
  const driveArr: Promise<ServerStatus | Winner>[] = carsArr.map((car, ind) => {
    const animationCar: AnimationCar = animationArr[ind];
    return engineArr[ind].goRace(animationCar);
  });
  try {
    const first = await Promise.any<ServerStatus | Winner>(driveArr);
    const { carId, time } = first as Winner;
    showWinner(carId, time);
    addWinner(carId, time);
  } catch {
    showMessage("No winners");
  }
  // ///////////////Reset btn
  const resetBtn = <HTMLElement>document.querySelector(`[data-btn="reset"]`);
  resetBtn.addEventListener("click", () => {
    animationArr.forEach((animationCar) => {
      animationCar.stopAnimation();
    });

    const startBtnEls: NodeListOf<HTMLElement> = document.querySelectorAll(
      `[data-btn="start"]`
    );
    Array.from(startBtnEls).forEach((startBtn) => {
      startBtn.removeAttribute("data-start");
    });
    allCarsToStart();
  });
}

async function addWinner(carId: string, currentTime: string): Promise<void> {
  const response: WinnersData = await getWinner(carId);
  if (Object.keys(response).length > 0) {
    let { wins, time } = response;
    wins += 1;
    const bestTimeNum = Number(time);
    const newTime = Number(currentTime);
    time = [bestTimeNum, newTime].sort((a, b) => a - b)[0];
    const newWinnerData: WinnersData = {
      wins: wins,
      time: time,
    };
    await updateWinner(carId, newWinnerData);
  } else {
    const winData: WinnersData = {
      id: Number(carId),
      wins: 1,
      time: Number(currentTime),
    };
    await createWinner(winData);
  }
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

export default listenPage;
