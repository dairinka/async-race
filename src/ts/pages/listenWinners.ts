import {
  getAmountWinners,
  getWinners,
  updateCountPage,
} from "../load/loadWinners";
import { getParam, saveParam } from "../localStorage/localStorage";
import { LSParam, SortOrder, WinnersData, WinnersSort, Base } from "../type";
import { drawWinnersTable } from "./drawWinners";

export function listenWinners() {
  const winWrap = <HTMLElement>document.querySelector(".winners-wrapper");
  winWrap.addEventListener("click", (event: MouseEvent) => {
    const target = <HTMLElement>event.target;
    const targetData = <string>target.dataset.btn;
    const page: number = JSON.parse(getParam(LSParam.winPage, "listenWinners"));
    console.log("target", target);
    switch (targetData) {
      case "garage":
        showGarage();
        break;
      case "Win":
        sortOfWin(page);
        break;
      case "Bes":
        sortOfTime(page);
        break;
      case "next":
        nextPage();
        break;
      case "prev":
        prevPage();
        break;
    }
  });
}

async function sortOfWin(page: number) {
  const winCell = <HTMLElement>document.querySelector("[data-btn='Win']");
  if (winCell.dataset.order !== "true") {
    winCell.setAttribute("data-order", "true");
    await sortWinners(page, WinnersSort.wins, SortOrder.up);
  } else {
    winCell.setAttribute("data-order", "false");
    await sortWinners(page, WinnersSort.wins, SortOrder.down);
  }
}

async function sortOfTime(page: number) {
  const timeCell = <HTMLElement>document.querySelector("[data-btn='Bes']");
  if (timeCell.dataset.order !== "true") {
    timeCell.setAttribute("data-order", "true");
    await sortWinners(page, WinnersSort.time, SortOrder.up);
  } else {
    timeCell.setAttribute("data-order", "false");
    await sortWinners(page, WinnersSort.time, SortOrder.down);
  }
}
async function sortWinners(
  page: number,
  sort: WinnersSort,
  order: SortOrder
): Promise<void> {
  const winData: WinnersData[] = await getWinners(page, sort, order);
  const startNumber: number = getStartNumber(page);
  drawWinnersTable(winData, startNumber);
}

function showGarage() {
  const winWrapper = <HTMLElement>document.querySelector(".winners-wrapper");
  const allWrapper = <HTMLElement>document.querySelector(".all-wrapper");
  winWrapper.remove();
  allWrapper.classList.remove("hidden");
}
async function nextPage() {
  const page = Number(JSON.parse(getParam(LSParam.winPage, "nextPageWin")));
  const allAmountWin: string = await getAmountWinners();
  const allPage = Math.ceil(Number(allAmountWin) / Number(Base.limitWinners));
  console.log("/////////////nextPage");
  console.log("allAmountWin", allAmountWin);
  console.log("page", page);
  console.log("allPage", allPage);
  if (page < allPage) {
    const nextPage = page + 1;
    console.log("nextPage", nextPage);
    const winDataArr: WinnersData[] = await getWinners(nextPage);
    const startNumber: number = getStartNumber(nextPage);
    drawWinnersTable(winDataArr, startNumber);
    saveParam(LSParam.winPage, nextPage, "nextPage");
    updateCountPage(nextPage);
  }
}
async function prevPage() {
  const page = Number(JSON.parse(getParam(LSParam.winPage, "nextPageWin")));
  // const allAmountWin: string = await getAmountWinners();
  // const allPage = Math.ceil(Number(allAmountWin) / page);
  console.log("/////////////prevPage");
  //console.log("allAmountWin", allAmountWin);
  console.log("page", page);
  console.log("nextPage", nextPage);
  if (page > 1) {
    const prevPage = page - 1;
    const winDataArr: WinnersData[] = await getWinners(prevPage);
    const startNumber: number = getStartNumber(prevPage);
    drawWinnersTable(winDataArr, startNumber);
    saveParam(LSParam.winPage, prevPage, "prevPage");
    updateCountPage(prevPage);
  }
}

export function getStartNumber(page: number): number {
  return page * Number(Base.limitWinners) - 9;
}
