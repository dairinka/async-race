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
const params = {
  baseUrl: "http://localhost:3000",
};
const startPageParams: PageQueryParams[] = [
  { _page: "1" },
  { _limit: Base.limitCars },
];

const serverData = new ServerData(params.baseUrl);

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
  checkLSParam("load()");
}
export async function getAllCarAmount(): Promise<string> {
  console.log("getAllCarAmount()");
  const amount = await serverData.getCarsAmount(startPageParams);
  saveParam(LSParam.allCarAmount, amount, "getAllCarAmount()");
  checkLSParam("getAllCarAmount()");
  return amount;
}

export async function getDataForNewPage(page: string): Promise<void> {
  console.log(`getDataForNewPage(page = ${page}: string)`);
  const pageParams: PageQueryParams[] = [
    { _page: page },
    { _limit: Base.limitCars },
  ];
  const carsArray: CarData[] = await serverData.getCars(pageParams);
  loadDataToCarBlocks(carsArray);
  checkLSParam("getDataForNewPage()");
}

export async function getCurrentCar(carId: string): Promise<CarData> {
  console.log(`getCurrentCar(carId = ${carId}: string)`);
  const currentCar: CarData = await serverData.getCar(carId);
  console.log("car data from server", currentCar);
  checkLSParam("getCurrentCar()");
  return currentCar;
}

export async function updateCarOnServer(
  carId: string,
  carName: string,
  carColor: string
): Promise<void> {
  await serverData.updateCar(carId, carName, carColor);
}
