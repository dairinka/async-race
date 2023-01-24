import { LSParam } from "../type";
//import { getAllCarAmount } from "../..";
export function saveParam(paramName: string, newData: string | number): void {
  const data = JSON.stringify(newData);
  localStorage.setItem(paramName, data);
}

export function getParam(paramName: string): string {
  const data = localStorage.getItem(paramName) || "";
  return data;
}

export function removeParam(paramName: string): void {
  localStorage.removeItem(paramName);
}

export function checkPage(): string {
  const allCarAmount: string = JSON.parse(getParam(LSParam.allCarAmount));
  const currentPage: string = getParam(LSParam.page)
    ? JSON.parse(getParam(LSParam.page))
    : "1";
  const amount = Number(allCarAmount);
  const allPage = Math.ceil(amount / 7);
  const page = Number(currentPage);
  const result: string = page <= allPage ? `${page}` : `${allPage}`;
  saveParam(LSParam.page, result);
  return result;
}
