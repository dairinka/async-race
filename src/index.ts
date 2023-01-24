import "./asset/scss/zero.scss";
import "./asset/scss/error.scss";
import "./asset/scss/style.scss";
import "./asset/scss/message.scss";
import "./asset/scss/winners.scss";
import "./asset/scss/footer.scss";
import "./asset/scss/common.scss";
import "./index.html";
import ServerData from "./ts/load/serverData";
import { drawMainPage } from "./ts/pages/drawPage";
import listenPage from "./ts/pages/listenPage";
import { Base, LSParam, PageQueryParams, CarData } from "./ts/type";
import { clearError, showError } from "./ts/error/showError";
import { loadDataToCarBlocks } from "./ts/load/loadCarBlocks";
import { loadGarageData, checkActivePageBtn } from "./ts/load/loadDataPage";
import { saveParam, checkPage } from "./ts/localStorage/localStorage";
// //////////////////////////////////////////////////////
const startPageParams: PageQueryParams[] = [
  { _page: "1" },
  { _limit: Base.limitCars },
];

const serverData = new ServerData(Base.baseUrl);

load();
// /////////////////////////////////////////////////////
async function load(): Promise<void> {
  const isConnect = await serverData.isConnect();
  if (isConnect) {
    if (document.querySelector(".error-wrap")) {
      clearError();
    }
    try {
      const allAmountCar = await getAllCarAmount();
      const curPage = checkPage();
      const pageParams: PageQueryParams[] = [
        { _page: curPage },
        { _limit: Base.limitCars },
      ];
      const carsArray: CarData[] = await serverData.getCars(pageParams);
      saveParam(LSParam.allCarAmount, allAmountCar);
      drawMainPage();
      loadDataToCarBlocks(carsArray);
      loadGarageData(allAmountCar, curPage);
      listenPage();
      const [page, allPage] = await getPageAndAllPage();
      checkActivePageBtn(page, allPage);
    } catch {}
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
  return amount;
}

export async function getDataForPage(page: string): Promise<void> {
  const pageParams: PageQueryParams[] = [
    { _page: page },
    { _limit: Base.limitCars },
  ];
  try {
    const carsArray: CarData[] = await serverData.getCars(pageParams);
    loadDataToCarBlocks(carsArray);
  } catch {}
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
  try {
    await serverData.updateCar(carId, carName, carColor);
  } catch {}
}

export async function createCarOnServer(carData: CarData): Promise<void> {
  try {
    await serverData.createCar(carData);
  } catch {}
}

export async function removeCarOnServer(carId: string): Promise<void> {
  try {
    await serverData.removeCar(carId);
  } catch {}
}

export function generateCarOnServer(arrData: CarData[]): void {
  try {
    arrData.forEach(async (car) => await serverData.createCar(car));
  } catch {}
}

export async function getPageAndAllPage(): Promise<number[]> {
  const allAmountCar: string = await getAllCarAmount();
  const currentPage: string = checkPage();
  const page = Number(currentPage);
  const allPage: number = Math.ceil(
    Number(allAmountCar) / Number(Base.limitCars)
  );
  return [page, allPage];
}
