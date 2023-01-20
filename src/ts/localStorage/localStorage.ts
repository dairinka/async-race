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

export function checkPage(): string {
  const allCarAmount: string = JSON.parse(getParam(LSParam.allCarAmount));
  const currentPage: string = getParam(LSParam.page)
    ? JSON.parse(getParam(LSParam.page))
    : "1";
  const amount = Number(allCarAmount);
  const allPage = Math.ceil(amount / 7);
  const page = Number(currentPage);
  const result: string = page <= allPage ? `${page}` : "1";
  saveParam(LSParam.page, result);
  // console.log(" page <= amount", page <= allPage);
  // console.log("amount", amount);
  // console.log("page", result);
  // console.log("saveParam(LSParam.page)", result);
  return result;
}

// export async function fulCheckPage(): Promise<string> {
//   const allCarAmount = await getAllCarAmount();
//   let result;
//   if (getParam(LSParam.page)) {
//     result = "1";
//   } else {
//     const lsParam = JSON.parse(getParam(LSParam.page));
//     result = lsParam <= allCarAmount ? lsParam : "1";
//   }
//   return result;
// }
