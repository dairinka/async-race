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
}

export enum LSParam {
  page = "page",
  allCarAmount = "amount",
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
