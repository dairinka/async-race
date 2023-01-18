import "./asset/scss/zero.scss";
import "./asset/scss/style.scss";
import "./index.html";
import Garage from "./ts/component/garage";
import ServerData from "./ts/load/serverData";
import { drawMainPage } from "./ts/pages/drawPage";
import listenPage from "./ts/pages/listenPage";
import { PageQueryParams, CarData } from "./ts/type";
const params = {
  baseUrl: "http://localhost:3000",
};
const pageParams: PageQueryParams[] = [{ _page: 1 }, { _limit: 7 }];
const newCar: CarData = {
  name: "Mersedes",
  color: "black",
};

const serverData = new ServerData(params.baseUrl);
serverData.getCars(pageParams);
serverData.getCar(1);
serverData.createCar(newCar);
drawMainPage();
listenPage();
