export enum Path {
  garage = "/garage",
  engine = "/engine",
  winners = "/winners",
}
export type ServerTuple = [limit: number, baseUrl: string];

export interface PageQueryParams {
  [key: string]: number;
}
export interface CarData {
  name: string;
  color: string;
  id?: number;
}
