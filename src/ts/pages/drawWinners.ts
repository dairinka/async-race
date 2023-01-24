import { getCurrentCar } from "../..";
import { CarData, WinnersData } from "../type";
import { getCarSVG, drawMenu } from "./drawPage";

export function drawWinnersPage(): void {
  const allWrapper = <HTMLDivElement>document.querySelector(".all-wrapper");
  const mainPageFragment = <DocumentFragment>document.createDocumentFragment();
  const allWrapperEl = <HTMLDivElement>document.createElement("div");
  const menuLineEl = <HTMLDivElement>document.createElement("div");
  const mainEl = <HTMLElement>document.createElement("div");
  allWrapperEl.className = "winners-wrapper";
  mainEl.className = "main-winners";
  drawMenu(menuLineEl);
  drawMainBlock(mainEl);
  allWrapperEl.append(menuLineEl, mainEl);
  mainPageFragment.append(allWrapperEl);
  allWrapper.before(mainPageFragment);
}

function drawMainBlock(parentElement: HTMLElement) {
  const h2El = <HTMLHeadingElement>document.createElement("h2");
  const namePage = <HTMLSpanElement>document.createElement("span");
  const allAmountWin = <HTMLSpanElement>document.createElement("span");
  const pageNumberLine = <HTMLParagraphElement>document.createElement("p");
  const pageName = <HTMLSpanElement>document.createElement("span");
  const pageNumeric = <HTMLSpanElement>document.createElement("span");
  const winBlocksWrapper = <HTMLDivElement>document.createElement("div");
  const paginationLine = <HTMLDivElement>document.createElement("div");
  const prevBtn = <HTMLButtonElement>document.createElement("button");
  const currentPage = <HTMLSpanElement>document.createElement("span");
  const nextBtn = <HTMLButtonElement>document.createElement("button");
  h2El.className = "h2";
  namePage.className = "name-page";
  allAmountWin.className = "all-amount-win";
  currentPage.className = "current-page";
  prevBtn.className = nextBtn.className = "btn";
  winBlocksWrapper.className = "win-blocks-wrapper";
  paginationLine.className = "pagination-line";
  prevBtn.textContent = "Prev";
  nextBtn.textContent = "Next";
  prevBtn.dataset.btn = "prev";
  nextBtn.dataset.btn = "next";
  h2El.append(namePage, allAmountWin);
  pageNumberLine.append(pageName, pageNumeric);
  paginationLine.append(prevBtn, currentPage, nextBtn);
  drawWinnersBlocks(winBlocksWrapper);
  parentElement.append(h2El, pageNumberLine, winBlocksWrapper, paginationLine);
}

function drawWinnersBlocks(parentElement: HTMLElement) {
  const tableWinners = <HTMLTableElement>document.createElement("table");
  const tableHeader = <HTMLTableSectionElement>document.createElement("thead");
  const trHeader = <HTMLTableRowElement>document.createElement("tr");
  const headerColumns = ["Number", "Car", "Name", "Wins", "Best Time(sec)"];
  headerColumns.forEach((el: string) => {
    const th = <HTMLTableCellElement>document.createElement("th");
    th.className = "column-header";
    th.textContent = el;
    trHeader.appendChild(th);
    th.dataset.btn = el.slice(0, 3);
  });
  trHeader.className = "table-header";
  tableWinners.className = "table-win";
  tableHeader.append(trHeader);
  tableWinners.append(tableHeader);
  parentElement.append(tableWinners);
}

export async function drawWinnersTable(
  winnersData: WinnersData[],
  startNumber = 1
) {
  const tableHeader = <HTMLTableSectionElement>document.querySelector("thead");
  if (document.querySelector("tbody")) {
    document.querySelector("tbody")?.remove();
  }
  const tableFragment = <DocumentFragment>document.createDocumentFragment();
  const tableBody = <HTMLTableSectionElement>document.createElement("tbody");
  winnersData.forEach(async ({ id, wins, time }, ind) => {
    console.log("id", id, "wins", wins, "time", time);
    const carId = (<number>id).toString();
    const carData: CarData = await getCurrentCar(carId);
    const { name, color } = carData;
    const tr = <HTMLTableRowElement>document.createElement("tr");
    const th1 = <HTMLTableCellElement>document.createElement("th");
    const th2 = <HTMLTableCellElement>document.createElement("th");
    const th3 = <HTMLTableCellElement>document.createElement("th");
    const th4 = <HTMLTableCellElement>document.createElement("th");
    const th5 = <HTMLTableCellElement>document.createElement("th");
    tr.className = "win-row";
    th1.textContent = String(ind + startNumber);
    getCarSVG(th2, color, 50, 25);
    th3.textContent = name;
    th4.textContent = wins.toString();
    th5.textContent = time.toString();
    tr.append(th1, th2, th3, th4, th5);
    tableBody.append(tr);
  });
  tableFragment.append(tableBody);
  tableHeader.after(tableFragment);
}
