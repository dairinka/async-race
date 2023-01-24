import { drawWinnersPage, drawWinnersTable } from "../pages/drawWinners";
import { LSParam, SortOrder, WinnersData, WinnersSort } from "../type";
import Winners from "../winners/winners";
import { getStartNumber, listenWinners } from "../pages/listenWinners";
import { hiddenMainPage } from "../pages/drawPage";
import { getParam, saveParam } from "../localStorage/localStorage";
const winners = new Winners();

export async function loadWinnerPage() {
  if (!getParam(LSParam.winPage)) {
    saveParam(LSParam.winPage, "1");
  }
  const page: number = JSON.parse(getParam(LSParam.winPage));
  const winData: WinnersData[] = await getWinners(page);
  const amountWins: string = await getAmountWinners();
  const startNumber = getStartNumber(page);
  drawWinnersPage();
  loadWinnersData(amountWins, page);
  drawWinnersTable(winData, startNumber);
  listenWinners();
  hiddenMainPage();
}
export async function getWinners(
  page: number,
  sort = WinnersSort.time,
  order = SortOrder.up
): Promise<WinnersData[]> {
  return await winners.getWinners(page, sort, order);
}
export async function getAmountWinners(): Promise<string> {
  return await winners.allAmountWinners();
}
export async function createWinner(winnerData: WinnersData) {
  await winners.createWinner(winnerData);
}

export async function getWinner(carId: string): Promise<WinnersData> {
  const winData: WinnersData = await winners.getWinner(carId);
  return winData;
}

export async function updateWinner(
  carId: string,
  winnerData: WinnersData
): Promise<void> {
  await winners.updateWinner(carId, winnerData);
}

export async function deleteWinner(carId: string): Promise<void> {
  await winners.deleteWinner(carId);
}

export async function allWinAmount(): Promise<string> {
  return await winners.allAmountWinners();
}

export function loadWinnersData(amount: string, page: number): void {
  const namePage = <HTMLElement>document.querySelector(".name-page");
  namePage.textContent = "Winners";
  updateAmountOnPage(amount);
  updateCountPage(page);
}

export function updateCountPage(page: number): void {
  const currentPage = <HTMLElement>document.querySelector(".current-page");
  currentPage.textContent = page.toString();
}

export function updateAmountOnPage(amount: string): void {
  const allAmount = <HTMLElement>document.querySelector(".all-amount-win");
  allAmount.textContent = amount;
}
