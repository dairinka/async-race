import "./index.html";
import Garage from "./ts/component/garage";
import ServerData from "./ts/load/serverData";
import { PageQueryParams, CarData } from "./ts/type";
const params = {
  baseUrl: "http://localhost:3000",
};
const pageParams: PageQueryParams[] = [{ _page: 1 }, { _limit: 7 }];
const newCar: CarData = {
  name: "Mersedes",
  color: "black",
};

const h1 = document.createElement("h1");
document.body.append(h1);
h1.textContent = "Hello world";
const serverData = new ServerData(params.baseUrl);
serverData.getCars(pageParams);
serverData.getCar(1);
serverData.createCar(newCar);
