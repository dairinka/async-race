import "./asset/scss/zero.scss";
import "./asset/scss/error.scss";
import "./asset/scss/style.scss";
import "./asset/scss/message.scss";
import "./index.html";
import Garage from "./ts/component/garage";
import ServerData from "./ts/load/serverData";
import { drawMainPage } from "./ts/pages/drawPage";
import listenPage from "./ts/pages/listenPage";
import { Base, LSParam, PageQueryParams, CarData } from "./ts/type";
import { clearError, showError } from "./ts/error/showError";
import { loadDataToCarBlocks } from "./ts/load/loadCarBlocks";
import { loadGarageData } from "./ts/load/loadDataPage";
import {
  saveParam,
  getParam,
  checkPage,
  checkLSParam,
} from "./ts/localStorage/localStorage";
// //////////////////////////////////////////////////////
checkLSParam("START");
const startPageParams: PageQueryParams[] = [
  { _page: "1" },
  { _limit: Base.limitCars },
];

const serverData = new ServerData(Base.baseUrl);

load();
// /////////////////////////////////////////////////////
async function load(): Promise<void> {
  console.log("Load()");
  const isConnect = await serverData.isConnect();
  if (isConnect) {
    if (document.querySelector(".error-wrap")) {
      clearError();
    }
    const allAmountCar = await getAllCarAmount();
    const page = checkPage();
    const pageParams: PageQueryParams[] = [
      { _page: page },
      { _limit: Base.limitCars },
    ];
    const carsArray: CarData[] = await serverData.getCars(pageParams);
    saveParam(LSParam.allCarAmount, allAmountCar, "function load()");
    drawMainPage();
    loadDataToCarBlocks(carsArray);
    loadGarageData(allAmountCar, page);
    listenPage();
  } else {
    if (!document.querySelector(".error-wrap")) {
      showError("Error: connect to server");
    }
    setTimeout(load, 1000);
  }
}
export async function getAllCarAmount(): Promise<string> {
  const amount = await serverData.getCarsAmount(startPageParams);
  saveParam(LSParam.allCarAmount, amount, "getAllCarAmount()");
  return amount;
}

export async function getDataForPage(page: string): Promise<void> {
  console.log("!!!!getDataForPage page =", page);
  const pageParams: PageQueryParams[] = [
    { _page: page },
    { _limit: Base.limitCars },
  ];
  const carsArray: CarData[] = await serverData.getCars(pageParams);
  loadDataToCarBlocks(carsArray);
}

export async function getCurrentCar(carId: string): Promise<CarData> {
  const currentCar: CarData = await serverData.getCar(carId);
  return currentCar;
}

export async function updateCarOnServer(
  carId: string,
  carName: string,
  carColor: string
): Promise<void> {
  await serverData.updateCar(carId, carName, carColor);
}

export async function createCarOnServer(carData: CarData): Promise<void> {
  await serverData.createCar(carData);
}

export async function removeCarOnServer(carId: string): Promise<void> {
  await serverData.removeCar(carId);
}

export function generateCarOnServer(arrData: CarData[]): void {
  arrData.forEach(async (car) => await serverData.createCar(car));
}
