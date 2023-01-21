import { LSParam } from "../type";
//import { getAllCarAmount } from "../..";
export function saveParam(
  paramName: string,
  newData: string | number,
  targetFunction: string
): void {
  const data = JSON.stringify(newData);
  console.log("targetFunction", targetFunction);
  console.log("data", data);
  console.log("paramName", paramName);
  localStorage.setItem(paramName, data);
  // console.log(
  //   "getparam after save param",
  //   getParam(paramName, "проверка в ф-ции saveParam")
  // );
  checkLSParam("saveParam()");
}

export function getParam(paramName: string, targetFunction: string): string {
  // console.log(
  //   `what function ivoke get param width param = ${paramName}  - ${targetFunction}`
  // );
  const data = localStorage.getItem(paramName) || "";
  checkLSParam("getParam()");
  return data;
}

export function removeParam(paramName: string): void {
  console.log(`delete ${paramName}`);
  localStorage.removeItem(paramName);
  checkLSParam("removeParam()");
}

export function checkPage(): string {
  const allCarAmount: string = JSON.parse(
    getParam(LSParam.allCarAmount, "checkPage()")
  );
  const currentPage: string = getParam(LSParam.page, "checkPage()")
    ? JSON.parse(getParam(LSParam.page, "checkPage()"))
    : "1";
  const amount = Number(allCarAmount);
  const allPage = Math.ceil(amount / 7);
  const page = Number(currentPage);
  const result: string = page <= allPage ? `${page}` : "1";
  saveParam(LSParam.page, result, "function checkPage()");
  checkLSParam("checkPage()");
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

export function checkLSParam(targetFunction: string) {
  // console.log("******************Проверка LSParam*********************");
  // console.log(`checkLSParam(), target function -  ${targetFunction}`);
  // const items = { ...localStorage };
  // for (const key in items) {
  //   console.log("key in localStorage", key);
  //   console.log("key in localStorage", localStorage.getItem(key));
  // }
  // console.log("******************Finish*********************");
}
