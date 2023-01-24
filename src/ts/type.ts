export enum Path {
  garage = "/garage",
  engine = "/engine",
  winners = "/winners",
}

export enum ServerStatus {
  ok = 200,
  badRequest = 400,
  notFound = 404,
  tooManyRequest = 429,
  carStop = 500,
}

export enum ServerMessage {
  tooManyRequest = "Drive already in progress.",
  carStop = "Engine was broken down.",
}

export enum EngineStatus {
  start = "started",
  stop = "stopped",
  drive = "drive",
}
export enum Base {
  limitCars = "7",
  limitWinners = "10",
  amountGenerate = "100",
  baseUrl = "http://localhost:3000",
}

export enum WinnersSort {
  id = "id",
  wins = "wins",
  time = "time",
}

export enum SortOrder {
  up = "ASC",
  down = "DESC",
}

export enum LSParam {
  page = "page",
  allCarAmount = "amount",
  carId = "id",
  winPage = "winPage",
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

export interface EngineData {
  velocity: number;
  distance: number;
}

export interface Winner {
  carId: string;
  time: string;
  status: ServerStatus;
}

export interface WinnersData {
  id?: number;
  wins: number;
  time: number;
}
