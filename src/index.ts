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
import { saveParam, getParam, checkPage } from "./ts/localStorage/localStorage";
// //////////////////////////////////////////////////////
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
  const isConnect = await serverData.isConnect();
  if (isConnect) {
    if (document.querySelector(".error-wrap")) {
      clearError();
    }
    const allAmountCar = await getAllCarAmount();
    const page = await checkPage();
    const pageParams: PageQueryParams[] = [
      { _page: page },
      { _limit: Base.limitCars },
    ];
    const carsArray: CarData[] = await serverData.getCars(pageParams);
    // saveParam(LSParam.allCarAmount, allAmountCar);
    // const carsArray: CarData[] = allCarData.carArr;
    console.log("allAmountCar", allAmountCar);
    console.log("page", page);
    //console.log("typeof carsArrayJSON", typeof carsArray);
    //const carsArray: CarData[] = JSON.parse(carsArrayJSON);
    // console.log("carsArray", carsArray);
    //serverData.getCar(1);
    //serverData.createCar(newCar);
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
  saveParam(LSParam.allCarAmount, amount);
  console.log("amount", amount);
  return amount;
}
export async function getDataForNewPage(page: string) {
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
