export function loadGarageData(amount: string, page: string): void {
  const namePage = <HTMLElement>document.querySelector(".name-page");
  namePage.textContent = "Garage";
  updateAmountOnPage(amount);
  updateCountPage(page);
}

export function updateCountPage(page: string): void {
  const currentPage = <HTMLElement>document.querySelector(".current-page");
  currentPage.textContent = page;
}

export function updateAmountOnPage(amount: string): void {
  const allAmount = <HTMLElement>document.querySelector(".all-amount");
  allAmount.textContent = amount;
}
