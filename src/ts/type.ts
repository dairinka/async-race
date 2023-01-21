import carsName from "../asset/data/carsName";

export enum Path {
  garage = "/garage",
  engine = "/engine",
  winners = "/winners",
}

export enum Status {
  ok = 200,
}

export enum Base {
  limitCars = "7",
  limitWinners = "10",
  amountGenerate = "100",
}

export enum LSParam {
  page = "page",
  allCarAmount = "amount",
  carId = "id",
}

export enum InputType {
  update = "update",
  create = "create",
}

export type ServerTuple = [limit: number, baseUrl: string];

export interface PageQueryParams {
  [key: string]: string;
}
export interface CarData {
  name: string;
  color: string;
  id?: number;
}

// export interface AllCarData {
//   carArr: CarData[];
//   allAmountCar: string;
// }
