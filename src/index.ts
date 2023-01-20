import "./asset/scss/zero.scss";
import "./asset/scss/error.scss";
import "./asset/scss/style.scss";
import "./index.html";
import Garage from "./ts/component/garage";
import ServerData from "./ts/load/serverData";
import { drawMainPage } from "./ts/pages/drawPage";
import listenPage from "./ts/pages/listenPage";
import { Base, PageQueryParams, CarData, AllCarData } from "./ts/type";
import { clearError, showError } from "./ts/error/showError";
import { loadDataToCarBlocks } from "./ts/load/loadCarBlocks";
import { loadGarageData } from "./ts/load/loadDataPage";
const params = {
  baseUrl: "http://localhost:3000",
};
const newCar: CarData = {
  name: "Mersedes",
  color: "black",
};

const serverData = new ServerData(params.baseUrl);

async function load(): Promise<void> {
  const isConnect = await serverData.isConnect();
  if (isConnect) {
    if (document.querySelector(".error-wrap")) {
      clearError();
    }
    const page = String(1);
    const pageParams: PageQueryParams[] = [
      { _page: page },
      { _limit: Base.limitCars },
    ];
    const allCarData: AllCarData = await serverData.getCars(pageParams);
    const allAmountCar = allCarData.allAmountCar;
    const carsArray: CarData[] = allCarData.carArr;
    //console.log("allAmountCar", allAmountCar);
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
load();
